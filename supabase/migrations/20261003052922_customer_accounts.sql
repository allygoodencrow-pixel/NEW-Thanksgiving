-- Private account storage and single-use purchase codes. No customer can grant access.
create schema if not exists customer_private;
revoke all on schema customer_private from public, anon;
grant usage on schema customer_private to authenticated, service_role;

alter table public.event_state_snapshots add column if not exists version bigint not null default 0;
alter table public.event_state_snapshots enable row level security;
alter table public.subscriptions enable row level security;
revoke all on public.subscriptions from anon, authenticated;
grant select on public.subscriptions to authenticated;
revoke all on public.event_state_snapshots from anon, authenticated;
grant select on public.event_state_snapshots to authenticated;

create or replace function public.customer_has_access()
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists(select 1 from public.subscriptions
    where user_id = (select auth.uid()) and product_key = 'crow_crown_thanksgiving'
      and status = 'active' and (current_period_end is null or current_period_end > now()));
$$;
revoke all on function public.customer_has_access() from public, anon;
grant execute on function public.customer_has_access() to authenticated;

create policy customer_purchase_required on public.event_state_snapshots
as restrictive for select to authenticated
using ((select public.customer_has_access()));

create table customer_private.access_codes (
  code_hash text primary key,
  order_reference text not null unique,
  created_at timestamptz not null default now(),
  redeem_before timestamptz,
  access_until timestamptz,
  redeemed_by uuid references auth.users(id) on delete set null,
  redeemed_at timestamptz,
  revoked_at timestamptz
);
alter table customer_private.access_codes enable row level security;
revoke all on customer_private.access_codes from public, anon, authenticated;

-- Runs with owner privileges solely to write the caller's row after authoritative checks.
create function customer_private.save_plan(plan_state jsonb, expected_version bigint)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare account_id uuid := auth.uid(); result public.event_state_snapshots;
begin
  if account_id is null or not exists(select 1 from auth.users where id=account_id and email_confirmed_at is not null) then
    raise sqlstate 'PT401' using message='Sign in with a verified email address.';
  end if;
  if not exists(select 1 from public.subscriptions where user_id=account_id and product_key='crow_crown_thanksgiving' and status='active' and (current_period_end is null or current_period_end>now())) then
    raise sqlstate 'PT403' using message='App access is required.';
  end if;
  if plan_state is null or jsonb_typeof(plan_state)<>'object' or octet_length(plan_state::text)>524288
    or plan_state->>'schemaVersion' is distinct from '5' or expected_version is null or expected_version<0 then
    raise sqlstate 'PT400' using message='Invalid plan or version.';
  end if;
  insert into public.event_state_snapshots(user_id,state,version,updated_at)
    select account_id,plan_state,1,now() where expected_version=0
    on conflict(user_id) do nothing returning * into result;
  if result.user_id is null then
    update public.event_state_snapshots set state=plan_state,version=version+1,updated_at=now()
      where user_id=account_id and version=expected_version returning * into result;
  end if;
  if result.user_id is null then raise sqlstate 'PT409' using message='Your plan changed on another device. Reload before saving.'; end if;
  return jsonb_build_object('version',result.version,'updated_at',result.updated_at);
end $$;

create function public.customer_save_plan(plan_state jsonb, expected_version bigint)
returns jsonb language sql security invoker set search_path = '' as $$
  select customer_private.save_plan(plan_state,expected_version);
$$;
revoke all on function customer_private.save_plan(jsonb,bigint),public.customer_save_plan(jsonb,bigint) from public,anon;
grant execute on function customer_private.save_plan(jsonb,bigint),public.customer_save_plan(jsonb,bigint) to authenticated;

create function customer_private.redeem_access(access_code text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare account_id uuid := auth.uid(); code_row customer_private.access_codes;
begin
  if account_id is null or not exists(select 1 from auth.users where id=account_id and email_confirmed_at is not null) then
    raise sqlstate 'PT401' using message='Verify your email before activating access.';
  end if;
  if access_code is null or length(access_code)>100 then raise sqlstate 'PT400' using message='Invalid access code.'; end if;
  select * into code_row from customer_private.access_codes
    where code_hash=encode(sha256(convert_to(upper(regexp_replace(trim(access_code),'[ -]','','g')),'UTF8')),'hex') for update;
  if code_row.code_hash is null or code_row.revoked_at is not null
    or (code_row.redeem_before is not null and code_row.redeem_before<now())
    or (code_row.access_until is not null and code_row.access_until<now())
    or (code_row.redeemed_at is not null and code_row.redeemed_by is distinct from account_id) then
    raise sqlstate 'PT400' using message='This code is invalid, expired, or already used.';
  end if;
  update customer_private.access_codes set redeemed_by=account_id,redeemed_at=coalesce(redeemed_at,now()) where code_hash=code_row.code_hash;
  insert into public.subscriptions(user_id,product_key,provider,provider_subscription_id,status,current_period_end)
    values(account_id,'crow_crown_thanksgiving','purchase_code',code_row.order_reference,'active',code_row.access_until)
    on conflict(user_id) do update set status='active',provider='purchase_code',provider_subscription_id=excluded.provider_subscription_id,
      product_key=excluded.product_key,current_period_end=excluded.current_period_end,updated_at=now();
  return true;
end $$;
create function public.customer_redeem_access(access_code text)
returns boolean language sql security invoker set search_path = '' as $$ select customer_private.redeem_access(access_code); $$;
revoke all on function customer_private.redeem_access(text),public.customer_redeem_access(text) from public,anon;
grant execute on function customer_private.redeem_access(text),public.customer_redeem_access(text) to authenticated;

-- Seller-only fulfillment. The raw code is returned once and never stored.
create function customer_private.issue_access_code(order_id text, access_until timestamptz default null)
returns text language plpgsql security definer set search_path = '' as $$
declare raw_code text := upper(replace(gen_random_uuid()::text,'-',''));
begin
  if nullif(trim(order_id),'') is null then raise exception 'An order reference is required'; end if;
  insert into customer_private.access_codes(code_hash,order_reference,access_until)
    values(encode(sha256(convert_to(raw_code,'UTF8')),'hex'),order_id,access_until);
  return raw_code;
end $$;
create function customer_private.revoke_access_code(order_id text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update customer_private.access_codes set revoked_at=now() where order_reference=order_id;
  update public.subscriptions set status='revoked',updated_at=now() where provider='purchase_code' and provider_subscription_id=order_id;
end $$;
revoke all on function customer_private.issue_access_code(text,timestamptz),customer_private.revoke_access_code(text) from public,anon,authenticated;
grant execute on function customer_private.issue_access_code(text,timestamptz),customer_private.revoke_access_code(text) to service_role;

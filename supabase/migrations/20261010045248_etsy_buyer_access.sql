create table public.cc_access_grants (
 source text not null check(source in ('owner','etsy','shopify')),
 source_id text not null,
 user_id uuid not null references auth.users(id) on delete cascade,
 active boolean not null default true,
 created_at timestamptz not null default now(),
 primary key(source,source_id)
);
create index cc_access_grants_user_active on public.cc_access_grants(user_id) where active;
alter table public.cc_access_grants enable row level security;
revoke all on public.cc_access_grants from public,anon,authenticated;
grant select on public.cc_access_grants to authenticated;
grant all on public.cc_access_grants to service_role;
create policy access_read_own on public.cc_access_grants for select to authenticated using ((select auth.uid())=user_id);
insert into public.cc_access_grants(source,source_id,user_id) select 'owner','store-owner',id from auth.users where lower(email)='allygoodencrow@gmail.com';
create policy party_paid_access on public.cc_party_plans as restrictive for all to authenticated
 using (exists(select 1 from public.cc_access_grants g where g.user_id=(select auth.uid()) and g.active))
 with check (exists(select 1 from public.cc_access_grants g where g.user_id=(select auth.uid()) and g.active));
create table public.cc_etsy_orders (
 receipt_id text primary key check(receipt_id ~ '^[1-9][0-9]{0,19}$'),
 email text not null,
 status text not null default 'pending' check(status in ('pending','processing','failed','complete','revoked')),
 user_id uuid references auth.users(id) on delete set null,
 attempts integer not null default 0,
 lease_token uuid,
 lease_until timestamptz,
 email_sent_at timestamptz,
 last_error_code text,
 updated_at timestamptz not null default now()
);
alter table public.cc_etsy_orders enable row level security;
revoke all on public.cc_etsy_orders from public,anon,authenticated;
grant all on public.cc_etsy_orders to service_role;
create function public.cc_claim_etsy(p_receipt text,p_token uuid) returns setof public.cc_etsy_orders
 language sql security invoker set search_path='' as $$
 update public.cc_etsy_orders set status='processing',lease_token=p_token,lease_until=now()+interval '5 minutes',attempts=attempts+1,updated_at=now()
 where receipt_id=p_receipt and status in ('pending','failed','processing') and (lease_until is null or lease_until<now()) returning *;
$$;
revoke all on function public.cc_claim_etsy(text,uuid) from public,anon,authenticated;
grant execute on function public.cc_claim_etsy(text,uuid) to service_role;
create table public.cc_automation_keys (name text primary key,key_hash text not null,enabled boolean not null default true);
alter table public.cc_automation_keys enable row level security;
revoke all on public.cc_automation_keys from public,anon,authenticated;
grant select on public.cc_automation_keys to service_role;
create function public.cc_mirror_shopify_access() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.status='complete' and new.user_id is not null and '10788940677414'=any(new.product_ids) then
 insert into public.cc_access_grants(source,source_id,user_id) values('shopify',new.shop_domain||':'||new.order_id,new.user_id)
 on conflict(source,source_id) do update set user_id=excluded.user_id,active=true;
 end if;
 return new;
end;
$$;
revoke all on function public.cc_mirror_shopify_access() from public,anon,authenticated;
create trigger cc_shopify_paid_access after insert or update on public.cc_purchase_fulfillments for each row execute function public.cc_mirror_shopify_access();
insert into storage.buckets(id,name,public,allowed_mime_types) values('thanksgiving-printables','thanksgiving-printables',false,array['application/pdf','image/png']);
create policy paid_printable_read on storage.objects for select to authenticated
 using(bucket_id='thanksgiving-printables' and exists(select 1 from public.cc_access_grants g where g.user_id=(select auth.uid()) and g.active));

create function public.cc_finish_etsy(p_receipt text,p_token uuid,p_user uuid) returns boolean language plpgsql security invoker set search_path='' as $$
begin
 update public.cc_etsy_orders set status='complete',user_id=p_user,email_sent_at=now(),last_error_code=null,lease_token=null,lease_until=null,updated_at=now()
 where receipt_id=p_receipt and lease_token=p_token and status='processing';
 if not found then return false; end if;
 insert into public.cc_access_grants(source,source_id,user_id,active) values('etsy',p_receipt,p_user,true)
 on conflict(source,source_id) do update set user_id=excluded.user_id,active=true;
 return true;
end;
$$;
create function public.cc_revoke_etsy(p_receipt text) returns void language plpgsql security invoker set search_path='' as $$
begin
 update public.cc_etsy_orders set status='revoked',lease_token=null,lease_until=null,updated_at=now() where receipt_id=p_receipt;
 update public.cc_access_grants set active=false where source='etsy' and source_id=p_receipt;
end;
$$;
revoke all on function public.cc_finish_etsy(text,uuid,uuid),public.cc_revoke_etsy(text) from public,anon,authenticated;
grant execute on function public.cc_finish_etsy(text,uuid,uuid),public.cc_revoke_etsy(text) to service_role;
alter policy paid_printable_read on storage.objects using(false);


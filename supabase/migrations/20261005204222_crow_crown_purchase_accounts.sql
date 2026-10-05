-- Additive migration. Existing cc_party_plans, its RLS and revision trigger remain intact.
create table public.cc_purchase_fulfillments (
  shop_domain text not null,
  order_id text not null check (order_id ~ '^[1-9][0-9]{0,19}$'),
  email text not null check (char_length(email) between 3 and 320),
  product_ids text[] not null check (cardinality(product_ids) > 0),
  status text not null default 'pending' check (status in ('pending','processing','failed','complete')),
  user_id uuid references auth.users(id) on delete set null,
  attempts integer not null default 0,
  lease_token uuid,
  lease_until timestamptz,
  email_sent_at timestamptz,
  last_error_code text,
  created_at timestamptz not null default now(),
  primary key (shop_domain, order_id)
);
alter table public.cc_purchase_fulfillments enable row level security;
revoke all on public.cc_purchase_fulfillments from public, anon, authenticated;
grant select, insert, update on public.cc_purchase_fulfillments to service_role;

create function public.cc_claim_purchase(p_shop text, p_order text, p_token uuid)
returns setof public.cc_purchase_fulfillments language sql security invoker set search_path = '' as $$
  update public.cc_purchase_fulfillments
  set status = 'processing', lease_token = p_token,
      lease_until = now() + interval '5 minutes', attempts = attempts + 1
  where shop_domain = p_shop and order_id = p_order and status <> 'complete'
    and (lease_until is null or lease_until < now())
  returning *;
$$;
revoke all on function public.cc_claim_purchase(text, text, uuid) from public, anon, authenticated;
grant execute on function public.cc_claim_purchase(text, text, uuid) to service_role;

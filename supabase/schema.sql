-- Applied to the existing thanksgiving Supabase project. No recipe/guest tables are replaced.
create table public.cc_party_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  state jsonb not null check (jsonb_typeof(state) = 'object'),
  revision bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index cc_party_plans_user_updated_idx on public.cc_party_plans (user_id, updated_at desc);
alter table public.cc_party_plans enable row level security;
revoke all on public.cc_party_plans from anon, authenticated;
grant select, insert, delete on public.cc_party_plans to authenticated;
grant update (name, state) on public.cc_party_plans to authenticated;
create policy party_owner_select on public.cc_party_plans for select to authenticated using ((select auth.uid()) = user_id);
create policy party_owner_insert on public.cc_party_plans for insert to authenticated with check ((select auth.uid()) = user_id);
create policy party_owner_update on public.cc_party_plans for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy party_owner_delete on public.cc_party_plans for delete to authenticated using ((select auth.uid()) = user_id);
create function public.cc_party_revision() returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.revision := old.revision + 1;
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.cc_party_revision() from public, anon, authenticated;
create trigger cc_party_revision before update on public.cc_party_plans for each row execute function public.cc_party_revision();

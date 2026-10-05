-- Run as project administrator. Test identities and records are rolled back.
begin;
select set_config('cc.qa_owner', gen_random_uuid()::text, true), set_config('cc.qa_other', gen_random_uuid()::text, true);
insert into auth.users(id) values (current_setting('cc.qa_owner')::uuid), (current_setting('cc.qa_other')::uuid);
insert into public.cc_party_plans(user_id,name,state) values (current_setting('cc.qa_owner')::uuid,'RLS verification','{"schemaVersion":4}');
set local role authenticated;
select set_config('request.jwt.claims',json_build_object('sub',current_setting('cc.qa_owner'),'role','authenticated')::text,true);
do $$
declare n integer; r bigint;
begin
  select count(*) into n from public.cc_party_plans where name='RLS verification';
  if n <> 1 then raise exception 'Owner read failed'; end if;
  update public.cc_party_plans set state='{"schemaVersion":4,"notes":"tested"}' where name='RLS verification' and revision=1;
  select revision into r from public.cc_party_plans where name='RLS verification';
  if r <> 2 then raise exception 'Revision trigger failed'; end if;
  update public.cc_party_plans set state='{"notes":"stale"}' where name='RLS verification' and revision=1;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'Stale update succeeded'; end if;
  begin
    update public.cc_party_plans set user_id=current_setting('cc.qa_other')::uuid where name='RLS verification';
    raise exception 'Owner identity was mutable';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.cc_party_plans(user_id,name,state) values(current_setting('cc.qa_other')::uuid,'Forged owner','{}');
    raise exception 'Forged owner insert succeeded';
  exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claims',json_build_object('sub',current_setting('cc.qa_other'),'role','authenticated')::text,true);
do $$
declare n integer;
begin
  select count(*) into n from public.cc_party_plans where name='RLS verification';
  if n <> 0 then raise exception 'Other user read private party'; end if;
  update public.cc_party_plans set state='{}' where name='RLS verification'; get diagnostics n = row_count;
  if n <> 0 then raise exception 'Other user changed private party'; end if;
  delete from public.cc_party_plans where name='RLS verification'; get diagnostics n = row_count;
  if n <> 0 then raise exception 'Other user deleted private party'; end if;
end $$;
set local role anon;
do $$ begin
  begin
    perform 1 from public.cc_party_plans;
    raise exception 'Anonymous access succeeded';
  exception when insufficient_privilege then null; end;
end $$;
rollback;
select 'Owner access, revision conflicts, ownership immutability, forged inserts, cross-account access and anonymous denial passed; test data rolled back.' as validation;

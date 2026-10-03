-- Integration assertions against Supabase. All fixtures roll back, including on error.
begin;
insert into auth.users(id,email,email_confirmed_at) values
('00000000-0000-4000-8000-0000000000a1','customer-a-test@example.invalid',now()),
('00000000-0000-4000-8000-0000000000b2','customer-b-test@example.invalid',now()),
('00000000-0000-4000-8000-0000000000c3','customer-c-test@example.invalid',null);
select set_config('test.access_code',customer_private.issue_access_code('transaction-test-order'),true);
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-0000000000a1',true);
do $$ begin
  if public.customer_has_access() then raise exception 'Unpaid account has access'; end if;
  begin perform public.customer_save_plan('{"schemaVersion":5}',0); raise exception 'Unpaid write accepted'; exception when sqlstate 'PT403' then null; end;
  perform public.customer_redeem_access(current_setting('test.access_code'));
  if not public.customer_has_access() then raise exception 'Activation did not grant access'; end if;
  if (public.customer_save_plan('{"schemaVersion":5,"event":{"name":"A private plan"}}',0)->>'version')::int<>1 then raise exception 'First save wrong version'; end if;
  begin perform public.customer_save_plan('{"schemaVersion":5}',0); raise exception 'Stale save accepted'; exception when sqlstate 'PT409' then null; end;
  perform public.customer_save_plan('{"schemaVersion":5,"event":{"name":"A newer plan"}}',1);
  if (select count(*) from public.event_state_snapshots)<>1 then raise exception 'Own plan hidden'; end if;
  begin update public.subscriptions set status='active'; raise exception 'Customer changed entitlement'; exception when insufficient_privilege then null; end;
  begin update public.event_state_snapshots set version=100; raise exception 'Direct write accepted'; exception when insufficient_privilege then null; end;
  begin perform customer_private.issue_access_code('forged'); raise exception 'Customer issued code'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-0000000000b2',true);
do $$ begin
  if (select count(*) from public.event_state_snapshots)<>0 then raise exception 'Other customer read A plan'; end if;
  begin perform public.customer_redeem_access(current_setting('test.access_code')); raise exception 'Code reused by B'; exception when sqlstate 'PT400' then null; end;
  begin perform public.customer_save_plan('{"schemaVersion":5}',2); raise exception 'Other customer wrote A plan'; exception when sqlstate 'PT403' then null; end;
end $$;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-0000000000c3',true);
do $$ begin
  begin perform public.customer_redeem_access(current_setting('test.access_code')); raise exception 'Unverified account activated'; exception when sqlstate 'PT401' then null; end;
end $$;
reset role;
select customer_private.revoke_access_code('transaction-test-order');
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-4000-8000-0000000000a1',true);
do $$ begin
  if public.customer_has_access() then raise exception 'Refund retained access'; end if;
  if (select count(*) from public.event_state_snapshots)<>0 then raise exception 'Revoked customer can read'; end if;
  begin perform public.customer_save_plan('{"schemaVersion":5}',2); raise exception 'Revoked write accepted'; exception when sqlstate 'PT403' then null; end;
  begin perform public.customer_redeem_access(current_setting('test.access_code')); raise exception 'Revoked code reused'; exception when sqlstate 'PT400' then null; end;
end $$;
set local role anon;
do $$ begin
  begin perform public.customer_save_plan('{"schemaVersion":5}',0); raise exception 'Anonymous write accepted'; exception when insufficient_privilege then null; end;
end $$;
rollback;
select 'PASS: ownership, purchase gate, verified email, single-use code, CAS conflict, direct-write denial, refund revocation, anonymous denial; fixtures rolled back' as result;

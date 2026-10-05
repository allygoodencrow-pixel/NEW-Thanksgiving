import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import App, { initial, freshPlan, type State } from './App';
import { cacheKey, createParty, listParties, PartySaver, recoveryKey, retainRecovery, supabase, type Party, type SaveStatus } from './cloud';

// Suggested menu/setup is retained, but example guests must not become customer data.
const newPartyState: State = freshPlan('suggested');

function downloadBackup(state: State) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'}));
  const link = document.createElement('a'); link.href = url; link.download = 'crow-crown-party-backup.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function CloudApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [parties, setParties] = useState<Party[]>([]);
  const [active, setActive] = useState<Party | null>(null);
  const [epoch, setEpoch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const [inviteSetup, setInviteSetup] = useState(false);
  const [mode, setMode] = useState<'signin' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('Thanksgiving at home');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('Saved to account');
  const [hasBackup, setHasBackup] = useState(false);
  const saver = useRef<PartySaver | null>(null);
  const latest = useRef<State>(initial);
  const generation = useRef(0);
  const accountDialog = useRef<HTMLElement>(null);
  const userId = session?.user.id;
  const passwordSetup = recovery || inviteSetup;

  const activate = useCallback((party: Party) => {
    saver.current?.stop();
    const next = new PartySaver(party, setSaveStatus);
    saver.current = next;
    latest.current = party.state;
    setSaveStatus('Saved to account');
    try {setHasBackup(retainRecovery(party));} catch {setHasBackup(false);}
    setActive(party); setEpoch(v => v + 1);
  }, []);

  useEffect(() => {
    const {data: {subscription}} = supabase.auth.onAuthStateChange((event, next) => {
      // Keep this callback synchronous; Supabase API work happens in effects.
      if (event === 'PASSWORD_RECOVERY') {setRecovery(true); setAccountOpen(true);}
      if (next && new URL(window.location.href).searchParams.get('setup') === '1') {setInviteSetup(true); setAccountOpen(true);}
      setSession(next);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY') setPassword('');
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const token = ++generation.current;
    saver.current?.stop(); saver.current = null;
    setActive(null); setParties([]); setError(''); setHasBackup(false);
    if (!userId) {setLoading(false); return;}
    setLoading(true);
    void listParties(userId).then(rows => {
      if (generation.current !== token) return;
      setParties(rows);
      if (rows[0]) activate(rows[0]);
      else setAccountOpen(true);
    }).catch(() => {
      if (generation.current === token) {setError('Your saved parties could not be loaded. Retry before editing.'); setAccountOpen(true);}
    }).finally(() => {if (generation.current === token) setLoading(false);});
    return () => {generation.current++; saver.current?.stop();};
  }, [userId, activate]);

  useEffect(() => {
    if (!userId || !active) return;
    const refresh = async () => {
      const current = saver.current;
      if (!current || current.dirty) return;
      const token = generation.current;
      try {
        const rows = await listParties(userId);
        if (generation.current !== token || saver.current !== current || current.dirty) return;
        setParties(rows);
        const newer = rows.find(p => p.id === current.party.id);
        if (newer && newer.revision !== current.party.revision) activate(newer);
      } catch { /* Existing plan stays available; saves report any network failure. */ }
    };
    window.addEventListener('focus', refresh);
    const onOnline = () => {void saver.current?.flush();};
    window.addEventListener('online', onOnline);
    const preventLoss = (event: BeforeUnloadEvent) => {
      if (saver.current?.dirty) {event.preventDefault(); event.returnValue = '';}
    };
    window.addEventListener('beforeunload', preventLoss);
    return () => {window.removeEventListener('focus', refresh); window.removeEventListener('online', onOnline); window.removeEventListener('beforeunload', preventLoss);};
  }, [userId, active?.id, activate]);

  const onPlanChange = useCallback((state: State) => {
    latest.current = state;
    // A signed-out/device render must never enter the previous account's queue.
    if (userId && saver.current?.party.user_id === userId && saver.current.party.id === active?.id) saver.current.enqueue(state);
  }, [userId, active?.id]);
  const showAccount = useCallback(() => {setAccountOpen(true);}, []);
  const mustChooseParty = Boolean(session && !active);
  const showDialog = accountOpen || mustChooseParty || session === undefined;

  useEffect(() => {
    if (!showDialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    accountDialog.current?.querySelector<HTMLElement>('input,button')?.focus();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !mustChooseParty && !passwordSetup && session !== undefined) setAccountOpen(false);
      if (event.key !== 'Tab') return;
      const controls = accountDialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),a');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
    };
    window.addEventListener('keydown', handleKeys);
    return () => {document.body.style.overflow = overflow; window.removeEventListener('keydown', handleKeys); if (previous?.isConnected) previous.focus();};
  }, [showDialog, mustChooseParty, passwordSetup, session === undefined]);

  async function run(action: () => Promise<void>) {
    setBusy(true); setError(''); setMessage('');
    try {await action();} catch (failure) {setError(failure instanceof Error ? failure.message : 'Could not complete this action. Please try again.');}
    finally {setBusy(false);}
  }
  async function authenticate(event: FormEvent) {
    event.preventDefault();
    await run(async () => {
      if (passwordSetup) {
        const {error: failure} = await supabase.auth.updateUser({password}); if (failure) throw failure;
        const url = new URL(window.location.href); url.searchParams.delete('setup');
        window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
        setRecovery(false); setInviteSetup(false); setPassword(''); setMessage('Password saved.'); return;
      }
      const redirectTo = `${window.location.origin}/`;
      if (mode === 'reset') {
        const {error: failure} = await supabase.auth.resetPasswordForEmail(email.trim(), {redirectTo}); if (failure) throw failure;
        setMessage('If an account exists for this email, a password reset link has been sent.'); return;
      }
      const result = await supabase.auth.signInWithPassword({email: email.trim(), password});
      if (result.error) throw result.error;
      setPassword('');
      setMessage(result.data.session ? 'Signed in.' : 'Check your email to confirm your account, then sign in.');
    });
  }
  async function addParty(state: State) {
    if (!userId) return;
    const token = generation.current;
    if (saver.current && !await saver.current.flush()) throw new Error('Save or download your current changes before switching parties.');
    const party = await createParty(userId, name.trim() || 'Thanksgiving at home', state);
    if (generation.current !== token) return;
    setParties(rows => [party, ...rows]); activate(party); setAccountOpen(false);
  }
  async function switchParty(id: string) {
    if (!userId) return;
    const token = generation.current;
    if (saver.current && !await saver.current.flush()) throw new Error('Save or download your current changes before switching parties.');
    const rows = await listParties(userId);
    if (generation.current !== token) return;
    const party = rows.find(p => p.id === id); if (!party) throw new Error('This party is no longer available.');
    setParties(rows); activate(party); setAccountOpen(false);
  }
  async function signOut(backup = false) {
    if (backup) downloadBackup(latest.current);
    else if (saver.current && !await saver.current.flush()) throw new Error('Your changes have not reached your account. Retry saving, or use Download & sign out.');
    const {error: failure} = await supabase.auth.signOut({scope: 'local'}); if (failure) throw failure;
    setAccountOpen(false); setRecovery(false); setInviteSetup(false); setMessage('');
  }

  return <>
    <div inert={showDialog}>
      {session === null && <App key="device" onPlanChange={onPlanChange} onAccount={showAccount} />}
      {session && active && !loading && active.user_id === userId && <App key={`${userId}:${active.id}:${epoch}`} seed={active.state}
        storageKey={cacheKey(userId!, active.id)} onPlanChange={onPlanChange} onAccount={showAccount} saveStatus={saveStatus} />}
    </div>
    {session && active && !loading && saveStatus !== 'Saved to account' && <button className="cloud-status" onClick={showAccount} aria-live="polite">{saveStatus}</button>}
    {showDialog && <div className="account-overlay"><section ref={accountDialog} className="account-sheet" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <header><span className="account-kicker">CROW & CROWN · AT HOME</span>{session !== undefined && !mustChooseParty && !passwordSetup && <button aria-label="Close account" onClick={() => setAccountOpen(false)}>CLOSE ×</button>}</header>
      <h2 id="account-title">{session === undefined ? 'Opening your account' : recovery ? 'A new password' : inviteSetup ? 'Set your password' : session ? 'Your parties' : 'Make yourself at home'}</h2>
      {session === undefined || loading ? <p role="status">Loading saved parties…</p> : <>
        {error && <p role="alert" className="account-message">{error}</p>}
        {message && <p role="status" className="account-message">{message}</p>}
        {(!session || passwordSetup) && <>
          <p>{inviteSetup ? 'Your purchase created your account. Choose a password to continue on your phone and computer.' : 'Your account setup link is emailed after purchase. Sign in with the email you used at checkout to open your saved parties.'}</p>
          <form onSubmit={authenticate}>
            {!passwordSetup && <label>EMAIL<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>}
            {(passwordSetup || mode !== 'reset') && <label>{passwordSetup ? 'NEW PASSWORD' : 'PASSWORD'}<input type="password" autoComplete={passwordSetup ? 'new-password' : 'current-password'} minLength={passwordSetup ? 8 : 1} required value={password} onChange={e => setPassword(e.target.value)} /></label>}
            <button type="submit" disabled={busy}>{busy ? 'PLEASE WAIT…' : passwordSetup ? 'SAVE PASSWORD' : mode === 'reset' ? 'SEND RESET LINK' : 'SIGN IN'}</button>
          </form>
          {!passwordSetup && <button className="account-text-action" onClick={() => {setMode(mode === 'reset' ? 'signin' : 'reset'); setError(''); setMessage('');}}>{mode === 'reset' ? 'BACK TO SIGN IN' : 'FORGOT PASSWORD?'}</button>}
          {!session && !passwordSetup && <button className="account-text-action" onClick={() => setAccountOpen(false)}>CONTINUE ON THIS DEVICE</button>}
        </>}
        {session && !passwordSetup && <>
          <p>{session.user.email}</p><p className="account-save-status" role="status">{active ? saveStatus : 'Choose a saved party or start a new one.'}</p>
          {active && saveStatus !== 'Saved to account' && <div className="account-actions"><button disabled={busy} onClick={() => void run(async () => {if (!await saver.current?.flush()) throw new Error('Save failed. Download a backup before reloading the saved party.');})}>RETRY SAVE</button><button onClick={() => downloadBackup(latest.current)}>DOWNLOAD BACKUP</button></div>}
          {active && (hasBackup || saveStatus === 'Changed on another device — review') && <div className="account-recovery"><p>A local backup or newer device version needs review. Download your current changes before replacing this view.</p><div className="account-actions"><button onClick={() => downloadBackup(latest.current)}>DOWNLOAD THIS VIEW</button>{hasBackup && <button onClick={() => {try {const raw = localStorage.getItem(recoveryKey(active.user_id, active.id)); if (raw) downloadBackup(JSON.parse(raw));} catch {setError('The local backup could not be read.');}}}>DOWNLOAD LOCAL BACKUP</button>}<button disabled={busy} onClick={() => void run(async () => {
            const rows = await listParties(userId!); const party = rows.find(p => p.id === active.id); if (!party) throw new Error('Saved party unavailable.');
            activate(party); setMessage('Saved account version loaded. Import the downloaded backup in Plan settings if needed.');
          })}>LOAD ACCOUNT VERSION</button></div></div>}
          <div className="account-party-list">{parties.map(p => <button disabled={busy} key={p.id} aria-current={p.id === active?.id ? 'true' : undefined} onClick={() => void run(() => switchParty(p.id))}><span>{p.name}</span><small>{p.id === active?.id ? 'CURRENT PARTY' : 'OPEN PARTY'} →</small></button>)}</div>
          <form onSubmit={e => {e.preventDefault(); void run(() => addParty(newPartyState));}}><label>NEW PARTY NAME<input required maxLength={160} value={name} onChange={e => setName(e.target.value)} /></label><button disabled={busy || loading}>START A NEW PARTY</button></form>
          <div className="account-actions"><button disabled={busy} onClick={() => void run(async () => {
            const raw = localStorage.getItem('cc-thanksgiving-v4') || localStorage.getItem('cc-thanksgiving-v3') || localStorage.getItem('cc-thanksgiving-v1');
            if (!raw) throw new Error('No device plan found here. Export your old plan, then import it through Plan settings.');
            await addParty(JSON.parse(raw));
          })}>SAVE DEVICE PLAN AS A PARTY</button><button disabled={busy} onClick={() => void run(async () => {setParties(await listParties(userId!));})}>REFRESH PARTIES</button></div>
          <footer><button disabled={busy} onClick={() => void run(() => signOut())}>SIGN OUT</button>{saver.current?.dirty && <button disabled={busy} onClick={() => void run(() => signOut(true))}>DOWNLOAD & SIGN OUT</button>}</footer>
        </>}
      </>}
    </section></div>}
  </>;
}

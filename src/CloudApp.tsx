import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import App, { initial, type State } from './App';
import { cacheKey, createParty, hasPaidAccess, loadPrintable, initialAuthSetupIntent, listParties, PartySaver, readAuthSetupIntent, recoveryKey, retainRecovery, supabase, type AuthSetupIntent, type Party, type SaveStatus } from './cloud';

// Suggested menu/setup is retained, but example guests must not become customer data.
const newPartyState: State = {...initial, guests: [], seating: {}, menuPlan: {}, menuOwners: {}, planningMode: 'Estimated'};

function downloadBackup(state: State) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'}));
  const link = document.createElement('a'); link.href = url; link.download = 'crow-crown-party-backup.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function CloudApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [access,setAccess]=useState<{user:string;paid:boolean}|null>(null);
  const [accessError,setAccessError]=useState('');
  const [accessRefresh,setAccessRefresh]=useState(0);
  const [parties, setParties] = useState<Party[]>([]);
  const [active, setActive] = useState<Party | null>(null);
  const [epoch, setEpoch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [setupIntent, setSetupIntent] = useState<AuthSetupIntent>(() => initialAuthSetupIntent || readAuthSetupIntent(window.location.href));
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
  const paid=Boolean(userId&&access?.user===userId&&access.paid);
  const checkingAccess=Boolean(userId&&(!access||access.user!==userId)&&!accessError);
  const recovery = setupIntent === 'recovery';
  const inviteSetup = setupIntent === 'invite';
  const passwordSetup = Boolean(session && setupIntent);
  const needsSetupLink = session === null && Boolean(setupIntent);

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
      if (event === 'PASSWORD_RECOVERY') {setSetupIntent('recovery'); setAccountOpen(true);}
      if (next && new URL(window.location.href).searchParams.get('setup') === '1' && event !== 'PASSWORD_RECOVERY') {setSetupIntent(intent => intent || 'invite'); setAccountOpen(true);}
      setSession(next);
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY') setPassword('');
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || !setupIntent) return;
    // Keep the screen available if the buyer reloads before saving a password.
    const url = new URL(window.location.href);
    url.searchParams.set('setup', '1');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [session?.user.id, setupIntent]);

  useEffect(()=>{
    let current=true;
    setAccess(null);setAccessError('');
    if(!userId)return;
    const check=async()=>{
      try{const allowed=await hasPaidAccess(userId);if(current){setAccess({user:userId,paid:allowed});setAccessError('');}}
      catch{if(current){setAccess(null);setAccessError('Your purchase access could not be checked. Please retry.');}}
    };
    void check();window.addEventListener('focus',check);
    const interval=window.setInterval(check,60000);
    return ()=>{current=false;window.removeEventListener('focus',check);window.clearInterval(interval);};
  },[userId,accessRefresh]);

  useEffect(() => {
    const token = ++generation.current;
    saver.current?.stop(); saver.current = null;
    setActive(null); setParties([]); setError(''); setHasBackup(false);
    if (!userId || !paid) {setLoading(false); return;}
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
  }, [userId, paid, activate]);

  useEffect(() => {
    if (!userId || !paid || !active) return;
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
  }, [userId, paid, active?.id, activate]);

  const onPlanChange = useCallback((state: State) => {
    latest.current = state;
    // A signed-out/device render must never enter the previous account's queue.
    if (paid && userId && saver.current?.party.user_id === userId && saver.current.party.id === active?.id) saver.current.enqueue(state);
  }, [userId, paid, active?.id]);
  const showAccount = useCallback(() => {setAccountOpen(true);}, []);
  const mustChooseParty = Boolean(session && !active);
  const showDialog = !paid || accountOpen || mustChooseParty || session === undefined || Boolean(setupIntent);

  useEffect(() => {
    if (!showDialog) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    accountDialog.current?.querySelector<HTMLElement>('input,button')?.focus();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && paid && !mustChooseParty && !setupIntent && session !== undefined) setAccountOpen(false);
      if (event.key !== 'Tab') return;
      const controls = accountDialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),a');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
    };
    window.addEventListener('keydown', handleKeys);
    return () => {document.body.style.overflow = overflow; window.removeEventListener('keydown', handleKeys); if (previous?.isConnected) previous.focus();};
  }, [showDialog, mustChooseParty, setupIntent, passwordSetup, session === undefined]);

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
        setSetupIntent(null); setPassword(''); setMessage('Password saved.'); return;
      }
      const redirectTo = `${window.location.origin}/${needsSetupLink ? '?setup=1' : ''}`;
      if (needsSetupLink || mode === 'reset') {
        const {error: failure} = await supabase.auth.resetPasswordForEmail(email.trim(), {redirectTo}); if (failure) throw failure;
        setMessage(needsSetupLink ? 'If an account exists for this email, a fresh password setup link has been sent. Check your inbox and spam.' : 'If an account exists for this email, a password reset link has been sent.'); return;
      }
      const result = await supabase.auth.signInWithPassword({email: email.trim(), password});
      if (result.error) throw result.error;
      setPassword('');
      setMessage(result.data.session ? 'Signed in.' : 'Check your email to confirm your account, then sign in.');
    });
  }
  async function addParty(state: State) {
    if (!userId || !paid) return;
    const token = generation.current;
    if (saver.current && !await saver.current.flush()) throw new Error('Save or download your current changes before switching parties.');
    const party = await createParty(userId, name.trim() || 'Thanksgiving at home', state);
    if (generation.current !== token) return;
    setParties(rows => [party, ...rows]); activate(party); setAccountOpen(false);
  }
  async function switchParty(id: string) {
    if (!userId || !paid) return;
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
    setAccountOpen(false); setSetupIntent(null); setMessage('');
  }

  return <>
    <div inert={showDialog}>
      {paid && session && active && !loading && active.user_id === userId && <App key={`${userId}:${active.id}:${epoch}`} seed={active.state}
        storageKey={cacheKey(userId!, active.id)} onPlanChange={onPlanChange} onAccount={showAccount} saveStatus={saveStatus} loadPrintable={loadPrintable} />}
    </div>
    {paid && session && active && !loading && saveStatus !== 'Saved to account' && <button className="cloud-status" onClick={showAccount} aria-live="polite">{saveStatus}</button>}
    {showDialog && <div className="account-overlay"><section ref={accountDialog} className="account-sheet" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <header><span className="account-kicker">CROW & CROWN · AT HOME</span>{paid && session !== undefined && !mustChooseParty && !setupIntent && <button aria-label="Close account" onClick={() => setAccountOpen(false)}>CLOSE ×</button>}</header>
      <h2 id="account-title">{session === undefined ? 'Opening your account' : needsSetupLink ? 'Finish account setup' : recovery ? 'A new password' : inviteSetup ? 'Set your password' : checkingAccess ? 'Checking your purchase' : session && !paid ? 'Your private app access' : session ? 'Your parties' : 'Make yourself at home'}</h2>
      {session === undefined || ((loading || checkingAccess) && !passwordSetup) ? <p role="status">Loading saved parties…</p> : <>
        {error && <p role="alert" className="account-message">{error}</p>}
        {message && <p role="status" className="account-message">{message}</p>}
        {(!session || passwordSetup) && <>
          <p>{needsSetupLink ? 'Open the setup email in this browser to choose your password. If your link expired or opened elsewhere, request a fresh link below.' : passwordSetup ? 'Choose a password to continue on your phone and computer.' : 'Your account setup link is emailed after purchase. Sign in with the email you used at checkout to open your saved parties.'}</p>
          <form onSubmit={authenticate}>
            {!passwordSetup && <label>EMAIL<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>}
            {(passwordSetup || (!needsSetupLink && mode !== 'reset')) && <label>{passwordSetup ? 'NEW PASSWORD' : 'PASSWORD'}<input type="password" autoComplete={passwordSetup ? 'new-password' : 'current-password'} minLength={passwordSetup ? 8 : 1} required value={password} onChange={e => setPassword(e.target.value)} /></label>}
            <button type="submit" disabled={busy}>{busy ? 'PLEASE WAIT…' : passwordSetup ? 'SAVE PASSWORD' : needsSetupLink ? 'SEND SETUP LINK' : mode === 'reset' ? 'SEND RESET LINK' : 'SIGN IN'}</button>
          </form>
          {!passwordSetup && <button className="account-text-action" onClick={() => {
            if (needsSetupLink) {
              setSetupIntent(null); setMode('signin'); setAccountOpen(true);
              const url = new URL(window.location.href); url.searchParams.delete('setup');
              window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
            } else setMode(mode === 'reset' ? 'signin' : 'reset');
            setError(''); setMessage('');
          }}>{needsSetupLink || mode === 'reset' ? 'BACK TO SIGN IN' : 'FORGOT PASSWORD?'}</button>}

        </>}
        {session && !paid && !passwordSetup && <>
          <p>{session.user.email}</p>
          <p role="status">{accessError || 'This account does not yet have paid app access. After your Etsy purchase, check the email associated with your order for your personal setup link.'}</p>
          <p>Check spam and promotions too. If you need help, message TheCrowandCrown on Etsy with your order number.</p>
          <div className="account-actions"><button onClick={()=>setAccessRefresh(v=>v+1)}>CHECK ACCESS AGAIN</button><button disabled={busy} onClick={()=>void run(()=>signOut())}>SIGN OUT</button></div>
        </>}
        {session && paid && !passwordSetup && <>
          <p>{session.user.email}</p><p className="account-save-status" role="status">{active ? saveStatus : 'Choose a saved party or start a new one.'}</p>
          <button className="account-text-action" onClick={() => {setSetupIntent('invite'); setPassword(''); setError(''); setMessage('');}}>SET OR CHANGE PASSWORD</button>
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

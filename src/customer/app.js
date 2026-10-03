import { createClient } from '@supabase/supabase-js';
import { customerConfig } from './config.js';
import { createPlanStorage } from './plan-storage.js';

export function startCustomerApp({ client = createClient(customerConfig.url, customerConfig.key), loadPlanner = () => import('../selected-interface.js') } = {}) {
  const root = document.getElementById('root'), account = document.getElementById('account');
  const status = document.getElementById('save-status'), toolbar = document.getElementById('account-toolbar');
  const recovery = document.getElementById('save-recovery');
  let identity = null, generation = 0, storage = null, unmount = null, mode = 'login';
  function clearPlan() {
    generation++;
    storage?.dispose(); storage = null; unmount?.(); unmount = null;
    root.replaceChildren(); root.inert = false; recovery.hidden = true; toolbar.hidden = true; status.textContent = '';
  }
  function message(text) { account.querySelector('[role="status"]').textContent = text; }
  function showForm(nextMode = mode) {
    mode = nextMode; account.hidden = false;
    const signup = mode === 'signup', reset = mode === 'reset', update = mode === 'update';
    account.innerHTML = `<section class="account-photo"><span>CROW & CROWN</span><p>YOUR SHORTCUT<br>TO CHIC.</p></section><section class="account-sheet"><p class="account-kicker">THE THANKSGIVING EDIT</p><h1>${signup ? 'Make it yours.' : reset ? 'Forgot your password?' : update ? 'Choose a new password.' : 'Welcome back.'}</h1><p>${signup ? 'Create your own account. Your guests, menu, and plans stay private.' : reset ? 'We’ll send a link to reset your password.' : update ? 'Use at least 12 characters to protect your account.' : 'Your gathering. Your details. All in one place.'}</p><form id="customer-form">${update ? '' : '<label>Email<input name="email" type="email" autocomplete="email" required maxlength="254"></label>'}${reset ? '' : `<label>Password<input name="password" type="password" autocomplete="${signup || update ? 'new-password' : 'current-password'}" minlength="${signup || update ? 12 : 1}" maxlength="128" required></label>`}<button type="submit">${signup ? 'Create account' : reset ? 'Send reset link' : update ? 'Save password' : 'Sign in'}</button></form><p role="status" aria-live="polite"></p><div class="account-links">${update ? '' : `<button data-mode="${signup || reset ? 'login' : 'signup'}">${signup || reset ? 'Back to sign in' : 'Create an account'}</button>${!signup && !reset ? '<button data-mode="reset">Forgot password?</button>' : ''}`}</div><p class="account-note">App access is activated with the code supplied with your purchase.</p></section>`;
    account.querySelectorAll('[data-mode]').forEach(button => button.onclick = () => showForm(button.dataset.mode));
    account.querySelector('form').onsubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget, button = form.querySelector('button');
      const values = new FormData(form), email = String(values.get('email') || '').trim(), password = String(values.get('password') || '');
      const submittedMode = mode;
      button.disabled = true; message('Please wait…');
      try {
        let response;
        const redirectTo = new URL('/', location.origin).href;
        if (submittedMode === 'signup') response = await client.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
        else if (submittedMode === 'reset') response = await client.auth.resetPasswordForEmail(email, { redirectTo });
        else if (submittedMode === 'update') response = await client.auth.updateUser({ password });
        else response = await client.auth.signInWithPassword({ email, password });
        if (response.error) throw response.error;
        if (submittedMode === 'signup') { message('Check your email to confirm your account, then sign in.'); form.reset(); }
        else if (submittedMode === 'reset') message('If an account exists for that email, a reset link is on its way.');
        else { mode = 'login'; await refresh(true); }
      } catch (error) { if (form.isConnected) message(error.message || 'Unable to sign in. Please try again.'); }
      finally { button.disabled = false; }
    };
  }
  function showActivation() {
    account.hidden = false;
    account.innerHTML = `<section class="activation-sheet"><p class="account-kicker">CROW & CROWN / YOUR ACCOUNT</p><h1>Your plan is waiting.</h1><p>Enter the access code included with your app purchase. Each code belongs to one account.</p><p id="signed-email"></p><form><label>Access code<input name="code" autocomplete="off" required minlength="16" maxlength="100" spellcheck="false"></label><button type="submit">Activate my app</button></form><p role="status" aria-live="polite"></p><button id="activation-signout" class="text-button">Sign out</button></section>`;
    account.querySelector('#signed-email').textContent = identity.email;
    account.querySelector('#activation-signout').onclick = signOut;
    account.querySelector('form').onsubmit = async event => {
      event.preventDefault(); const button = event.currentTarget.querySelector('button'); button.disabled = true;
      try {
        const { error } = await client.rpc('customer_redeem_access', { access_code: new FormData(event.currentTarget).get('code') });
        if (error) throw error;
        await refresh(true);
      } catch (error) { message(error.message || 'Unable to activate. Please try again.'); }
      finally { button.disabled = false; }
    };
  }
  function saveFailed(error) {
    root.inert = true; recovery.hidden = false;
    recovery.querySelector('p').textContent = error.code === 'PT409'
      ? 'A newer version was saved on another device. Download your unsaved changes before reloading.'
      : 'Your changes have not reached your account. Keep this page open, or download a backup before reloading.';
  }
  async function refresh(force = false) {
    const current = generation;
    const { data, error } = await client.auth.getUser();
    if (current !== generation) return;
    if (error && storage && error.status !== 401 && error.status !== 403) { saveFailed(error); return; }
    if (error || !data?.user) { identity = null; clearPlan(); showForm('login'); return; }
    if (mode === 'update') return;
    if (identity?.id === data.user.id && unmount && !force) return;
    clearPlan(); identity = data.user;
    const ticket = generation, accountId = identity.id;
    account.hidden = false;
    account.innerHTML = '<section class="activation-sheet"><h1>Opening your plan…</h1><p role="status"></p></section>';
    try {
      const access = await client.rpc('customer_has_access');
      if (ticket !== generation) return;
      if (access.error) throw access.error;
      if (!access.data) { showActivation(); return; }
      const result = await client.from('event_state_snapshots').select('state,version').eq('user_id', accountId).maybeSingle();
      if (result.error) throw result.error;
      const planner = await loadPlanner();
      if (ticket !== generation) return;
      storage = createPlanStorage({ initial: result.data?.state, version: result.data?.version || 0,
        save: async (state, version) => {
          if (ticket !== generation || identity?.id !== accountId) throw new Error('Your account changed.');
          const result = await client.rpc('customer_save_plan', { plan_state: state, expected_version: version });
          if (result.error) throw result.error;
          return result.data;
        },
        onStatus: text => { if (ticket === generation) status.textContent = text; },
        onError: error => { if (ticket === generation) saveFailed(error); },
      });
      account.hidden = true; toolbar.hidden = false;
      toolbar.querySelector('[data-email]').textContent = identity.email; status.textContent = 'Private account';
      unmount = planner.mountPlanner(root, storage);
    } catch (error) {
      if (ticket !== generation) return;
      account.innerHTML = '<section class="activation-sheet"><h1>We couldn’t open your plan.</h1><p role="status"></p><button id="retry-account">Try again</button><button id="error-signout" class="text-button">Sign out</button></section>';
      message(error.message || 'Please check your connection.');
      account.querySelector('#retry-account').onclick = () => refresh(true);
      account.querySelector('#error-signout').onclick = signOut;
    }
  }
  async function signOut() {
    try {
      await storage?.flush();
      const result = await client.auth.signOut(); if (result.error) throw result.error;
      identity = null; clearPlan(); showForm('login');
    } catch (error) { if (storage) saveFailed(error); else message(error.message); }
  }
  document.getElementById('sign-out').onclick = signOut;
  document.getElementById('reload-plan').onclick = () => refresh(true);
  document.getElementById('download-unsaved').onclick = () => {
    if (!storage?.snapshot) return;
    const blob = new Blob([JSON.stringify({ format: 'crow-crown-thanksgiving-backup', schemaVersion: 5, state: JSON.parse(storage.snapshot) }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), link = document.createElement('a');
    link.href = url; link.download = 'crow-crown-unsaved-plan.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const beforeUnload = event => { if (storage?.dirty) { event.preventDefault(); event.returnValue = ''; } };
  window.addEventListener('beforeunload', beforeUnload);
  const { data: subscription } = client.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') { clearPlan(); showForm('update'); return; }
    if (identity && session?.user?.id !== identity.id) { identity = null; clearPlan(); }
    // Supabase holds a lock during this callback; defer calls back into the SDK.
    if (mode !== 'update') setTimeout(() => refresh(), 0);
  });
  showForm(); void refresh();
  return () => { subscription.subscription.unsubscribe(); window.removeEventListener('beforeunload', beforeUnload); clearPlan(); };
}

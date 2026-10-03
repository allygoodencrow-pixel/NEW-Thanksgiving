import { migrateState } from '../domain/persistence.js';

/** Memory belongs to one account. Database versions are independent of UI revisions. */
export function createPlanStorage({ initial, version = 0, save, onStatus = () => {}, onError = () => {} }) {
  let text = initial ? JSON.stringify(migrateState(initial)) : null;
  let pending = null, running = null, failure = null, disposed = false;
  const listeners = new Set();
  function notify() { for (const done of listeners) done(); listeners.clear(); }
  async function drain() {
    while (pending && !disposed && !failure) {
      const snapshot = pending;
      pending = null;
      try {
        const result = await save(JSON.parse(snapshot), version);
        if (disposed) break;
        version = result.version;
        if (!pending) onStatus('Saved to your account');
      } catch (error) {
        if (disposed) break;
        failure = error; pending ??= snapshot;
        onStatus('Not saved'); onError(error);
      }
    }
    running = null; notify();
  }
  return {
    getItem: () => text,
    setItem(_key, value) {
      if (disposed || failure) throw new Error('Saving is paused. Reload your plan before editing.');
      const parsed = JSON.parse(value);
      if (parsed.schemaVersion !== 5 || new TextEncoder().encode(value).length > 450000) throw new Error('This plan is not supported or is too large.');
      text = JSON.stringify(migrateState(parsed)); pending = text; onStatus('Saving…');
      running ??= Promise.resolve().then(drain);
    },
    get dirty() { return Boolean(pending || running || failure); },
    get snapshot() { return text; },
    async flush() { if (running) await new Promise(resolve => listeners.add(resolve)); if (failure) throw failure; },
    dispose() { disposed = true; pending = null; text = null; notify(); },
  };
}

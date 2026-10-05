import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { State } from './App';
import { supabaseUrl, supabasePublishableKey } from './supabase-config';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
export type Party = {id: string; user_id: string; name: string; state: State; revision: number; updated_at: string};
export const pendingKey = (user: string, party: string) => `cc-cloud-pending:${user}:${party}`;
export const recoveryKey = (user: string, party: string) => `cc-cloud-recovery:${user}:${party}`;
export const cacheKey = (user: string, party: string) => `cc-cloud-plan:${user}:${party}`;

export function retainRecovery(party: Party, storage: Storage = localStorage) {
  const pending = storage.getItem(pendingKey(party.user_id, party.id));
  const key = recoveryKey(party.user_id, party.id);
  if (pending && pending !== JSON.stringify(party.state) && !storage.getItem(key)) storage.setItem(key, pending);
  return Boolean(storage.getItem(key));
}

export async function listParties(user: string, client: SupabaseClient = supabase): Promise<Party[]> {
  const {data, error} = await client.from('cc_party_plans').select('*').eq('user_id', user).order('updated_at', {ascending: false});
  if (error) throw error;
  return data as Party[];
}
export async function createParty(user: string, name: string, state: State, client: SupabaseClient = supabase): Promise<Party> {
  const {data, error} = await client.from('cc_party_plans').insert({user_id: user, name: name.trim(), state}).select().single();
  if (error) throw error;
  return data as Party;
}

export type SaveStatus = 'Saved to account' | 'Saving…' | 'Not saved to account — retry' | 'Changed on another device — review';
export type SaveWriter = (party: Party, state: State) => Promise<Party | null>;
export async function writeParty(party: Party, state: State): Promise<Party | null> {
  // The server increments revision. A stale device cannot overwrite a newer version.
  const {data, error} = await supabase.from('cc_party_plans').update({state})
    .eq('id', party.id).eq('user_id', party.user_id).eq('revision', party.revision).select().maybeSingle();
  if (error) throw error;
  return data as Party | null;
}

/** One writer per loaded party. Edits made while a save runs are saved next. */
export class PartySaver {
  private pending: State | null = null;
  private acknowledged: string;
  private running: Promise<boolean> | null = null;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private stopped = false;
  private failed = false;
  status: SaveStatus = 'Saved to account';
  constructor(public party: Party, private notify: (status: SaveStatus) => void,
    private writer: SaveWriter = writeParty, private storage: Pick<Storage, 'setItem' | 'removeItem'> = localStorage) {
    this.acknowledged = JSON.stringify(party.state);
  }
  get dirty() {return Boolean(this.pending || this.running);}
  private report(status: SaveStatus) {this.status = status; if (!this.stopped) this.notify(status);}
  enqueue(state: State) {
    if (this.stopped) return;
    const serialized = JSON.stringify(state);
    if (serialized === this.acknowledged && !this.running) {
      this.pending = null;
      try {this.storage.removeItem(pendingKey(this.party.user_id, this.party.id));} catch { /* Cloud remains usable without local storage. */ }
      if (!this.failed) this.report('Saved to account');
      return;
    }
    this.pending = state;
    try {this.storage.setItem(pendingKey(this.party.user_id, this.party.id), serialized);} catch { /* Surface cloud failures through status. */ }
    clearTimeout(this.timer);
    if (!this.failed) {
      this.report('Saving…');
      this.timer = setTimeout(() => {void this.flush();}, 600);
    }
  }
  async flush(): Promise<boolean> {
    clearTimeout(this.timer);
    if (this.running) return this.running;
    if (this.stopped) return !this.pending;
    this.failed = false;
    this.running = this.drain();
    try {return await this.running;} finally {this.running = null;}
  }
  private async drain(): Promise<boolean> {
    while (this.pending && !this.stopped) {
      const next = this.pending;
      this.report('Saving…');
      try {
        const saved = await this.writer(this.party, next);
        if (!saved) {this.failed = true; this.report('Changed on another device — review'); return false;}
        this.party = saved;
        this.acknowledged = JSON.stringify(next);
        if (JSON.stringify(this.pending) === this.acknowledged) {
          this.pending = null;
          try {this.storage.removeItem(pendingKey(saved.user_id, saved.id));} catch { /* No local storage. */ }
        }
      } catch {this.failed = true; this.report('Not saved to account — retry'); return false;}
    }
    this.report('Saved to account');
    return true;
  }
  stop() {this.stopped = true; clearTimeout(this.timer);}
}

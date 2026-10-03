// Public configuration. Database policies protect customer data.
export const customerConfig = {
  url: import.meta.env?.VITE_SUPABASE_URL || 'https://yqlomzvhtesstezyjair.supabase.co',
  key: import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_r39kgjXfogBahrEDk4MGuw_qoQjRHUd',
};

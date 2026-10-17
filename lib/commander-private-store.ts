import { createClient } from '@supabase/supabase-js';

export function createCommanderPrivateStore() {
  const url = process.env.VENOM_OS_PRIVATE_SUPABASE_URL;
  const key = process.env.VENOM_OS_PRIVATE_SUPABASE_SERVICE_ROLE_KEY;
  const crmUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !key || (crmUrl && url.replace(/\/$/, '') === crmUrl.replace(/\/$/, ''))) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

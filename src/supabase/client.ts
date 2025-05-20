import { redirect } from '@tanstack/react-router';
import { createClient } from '@supabase/supabase-js';

import type { Database } from './db-types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function validateSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw redirect({ to: '/not-found' });
  }

  return true;
}
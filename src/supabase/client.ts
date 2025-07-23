import { createClient } from '@supabase/supabase-js';
import { redirect } from '@tanstack/react-router';

import { ROUTE_HREF } from '@/lib/constants';
import type { Database } from './db-types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function validateSession() {
  const { data } = await supabase.auth.getClaims();

  if (!data) {
    throw redirect({ to: ROUTE_HREF.NOT_FOUND });
  }

  return true;
}

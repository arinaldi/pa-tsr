import { createContext, use, useEffect, useState } from 'react';
import { type Session } from '@supabase/supabase-js';

import { type Children } from '@/lib/types';
import { supabase } from '@/supabase/client';

interface Context {
  session: Session | null;
}

const SessionContext = createContext<Context>({ session: null });

export function useSession() {
  const context = use(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context.session;
}

export function SessionProvider({ children }: Children) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <SessionContext value={{ session }}>{children}</SessionContext>;
}

import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { supabase } from '@/supabase/client';

export const Route = createFileRoute('/signout')({
  component: Signout,
  loader: () => ({ title: 'Sign out' }),
})

function Signout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      navigate({ to: '/' });
    }

    signOut();
  }, [navigate]);

  return null;
}

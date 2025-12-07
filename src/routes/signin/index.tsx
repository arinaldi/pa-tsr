import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';

import { ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import OtpForm from './-otp-form';
import PasswordForm from './-password-form';

export const Route = createFileRoute('/signin/')({
  component: Signin,
  loader: async () => {
    const { data } = await supabase.auth.getClaims();

    if (data) {
      throw redirect({ to: ROUTES_ADMIN.base.href });
    }

    return { title: 'Sign in' };
  },
});

type View = 'password' | 'otp';

function Signin() {
  const [view, setView] = useState<View>('password');

  if (view === 'password') {
    return <PasswordForm setViewOtp={() => setView('otp')} />;
  }

  if (view === 'otp') {
    return <OtpForm onCancel={() => setView('password')} />;
  }

  return null;
}

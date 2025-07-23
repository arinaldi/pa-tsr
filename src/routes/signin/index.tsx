import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';

import { ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import EmailForm from './-email-form';
import OtpForm from './-otp-form';
import PasswordForm from './-password-form';
import { emailSchema } from './-schema';

export const Route = createFileRoute('/signin/')({
  component: Signin,
  loader: async () => {
    const { data } = await supabase.auth.getClaims();

    if (data) {
      return redirect({ to: ROUTES_ADMIN.base.href });
    }

    return { title: 'Sign in' };
  },
});

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type View = 'email' | 'password' | 'otp';

function Signin() {
  const [view, setView] = useState<View>('email');
  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  });
  const email = form.watch('email');

  function onCancel() {
    setView('email');
  }

  if (view === 'email') {
    return (
      <EmailForm
        form={form}
        setViewOtp={() => setView('otp')}
        setViewPassword={() => setView('password')}
      />
    );
  }

  if (view === 'password') {
    return <PasswordForm email={email} onCancel={onCancel} />;
  }

  if (view === 'otp') {
    return <OtpForm email={email} onCancel={onCancel} />;
  }

  return null;
}

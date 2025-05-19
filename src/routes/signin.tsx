import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'

import { ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import EmailForm from './signin/-email-form';
import OtpForm from './signin/-otp-form';
import PasswordForm from './signin/-password-form';
import { emailSchema } from './signin/-schema';

export const Route = createFileRoute('/signin')({
  component: Signin,
  loader: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (session) {
      return redirect({ to: ROUTES_ADMIN.base.href });
    }
  
    return { title: 'Sign in' };
  },
})

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


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


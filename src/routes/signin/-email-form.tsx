import { type UseFormReturn } from 'react-hook-form';
import { Lock, SendHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/submit-button';
import { useMobile } from '@/hooks/use-mobile';
import { useSubmit } from '@/hooks/use-submit';
import { EMAIL, MESSAGES } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import type { EmailInput } from './-schema';

interface Props {
  form: UseFormReturn<EmailInput>;
  setViewOtp: () => void;
  setViewPassword: () => void;
}

export default function EmailForm({
  form,
  setViewOtp,
  setViewPassword,
}: Props) {
  const mobile = useMobile();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => setViewOtp()],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ email }: EmailInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGES.ERROR);
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: 'Check your email for the code',
  });

  return (
    <div className="max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(setViewPassword)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    autoFocus
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-6 w-full"
            size={mobile ? 'lg' : 'default'}
            type="submit"
          >
            <Lock className="mr-2 size-4" />
            Sign in with password
          </Button>
        </form>
      </Form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs tracking-wider uppercase">
          <span className="bg-background text-muted-foreground px-2">
            or continue with
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <SubmitButton
            className="w-full"
            submitting={submitting}
            variant="outline"
          >
            <SendHorizontal className="size-4" />
            Send one-time password
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}

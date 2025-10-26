import { Lock, SendHorizontal } from 'lucide-react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
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
      <form onSubmit={form.handleSubmit(setViewPassword)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoCapitalize="off"
                  autoComplete="email"
                  autoCorrect="off"
                  autoFocus
                  id={field.name}
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          className="mt-6 w-full"
          size={mobile ? 'lg' : 'default'}
          type="submit"
        >
          <Lock className="mr-2 size-4" />
          Sign in with password
        </Button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-background px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
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
    </div>
  );
}

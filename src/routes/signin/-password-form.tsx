import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';

import PasswordInput from '@/components/password-input';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useMobile } from '@/hooks/use-mobile';
import { useSubmit } from '@/hooks/use-submit';
import { EMAIL, MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { type SignInInput, signInSchema } from './-schema';

interface Props {
  email: string;
  onCancel: () => void;
}

export default function PasswordForm({ email, onCancel }: Props) {
  const navigate = useNavigate();
  const mobile = useMobile();
  const form = useForm({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTES_ADMIN.base.href })],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ password }: SignInInput) => {
      if (email !== EMAIL) {
        throw new Error(MESSAGES.INVALID_DATA);
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  });

  return (
    <div className="max-w-sm">
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <PasswordInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoFocus
                  id={field.name}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <SubmitButton className="mt-6 w-full" submitting={submitting}>
          Submit
        </SubmitButton>
      </form>
      <Button
        className="mt-2 w-full"
        onClick={onCancel}
        size={mobile ? 'lg' : 'default'}
        variant="outline"
      >
        Cancel
      </Button>
    </div>
  );
}

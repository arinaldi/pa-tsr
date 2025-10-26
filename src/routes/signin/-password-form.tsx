import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';

import PasswordInput from '@/components/password-input';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useMobile } from '@/hooks/mobile';
import { useSubmit } from '@/hooks/submit';
import { EMAIL, MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { type SignInInput, signInSchema } from './-schema';

interface Props {
  setViewOtp: () => void;
}

export default function PasswordForm({ setViewOtp }: Props) {
  const navigate = useNavigate();
  const mobile = useMobile();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTES_ADMIN.base.href })],
    submitFn: async ({ email, password }: SignInInput) => {
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
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onSubmit: signInSchema,
    },
  });

  return (
    <div className="max-w-sm">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    aria-invalid={invalid}
                    autoCapitalize="off"
                    autoComplete="email"
                    autoCorrect="off"
                    autoFocus
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    type="email"
                    value={field.state.value}
                  />
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <PasswordInput
                    aria-invalid={invalid}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    value={field.state.value}
                  />
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <SubmitButton className="mt-6 w-full" submitting={submitting}>
          Submit
        </SubmitButton>
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
      <Button
        className="mt-2 w-full"
        onClick={setViewOtp}
        size={mobile ? 'lg' : 'default'}
        variant="outline"
      >
        One-time password
      </Button>
    </div>
  );
}

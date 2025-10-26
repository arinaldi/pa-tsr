import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { SendHorizontal } from 'lucide-react';

import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import { useMobile } from '@/hooks/mobile';
import { useSubmit } from '@/hooks/submit';
import { EMAIL, MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import {
  type EmailInput,
  emailSchema,
  type VerifyOtpInput,
  verifyOtpSchema,
} from './-schema';

interface Props {
  onCancel: () => void;
}

export default function OtpForm({ onCancel }: Props) {
  const navigate = useNavigate();
  const mobile = useMobile();
  const { onSubmit: onSend, submitting: sending } = useSubmit({
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
  const emailForm = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      onSend(value);
    },
    validators: {
      onSubmit: emailSchema,
    },
  });
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTES_ADMIN.base.href })],
    submitFn: async ({ code }: VerifyOtpInput) => {
      const email = emailForm.getFieldValue('email');

      if (email !== EMAIL) {
        throw new Error(MESSAGES.INVALID_DATA);
      }

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  });
  const otpForm = useForm({
    defaultValues: {
      code: '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onSubmit: verifyOtpSchema,
    },
  });

  return (
    <div className="max-w-sm">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          emailForm.handleSubmit();
        }}
      >
        <FieldGroup>
          <emailForm.Field name="email">
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
          </emailForm.Field>
        </FieldGroup>
        <SubmitButton
          className="mt-6 w-full"
          submitting={sending}
          variant="outline"
        >
          <SendHorizontal />
          Send one-time password
        </SubmitButton>
      </form>
      <Separator className="my-8" />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          otpForm.handleSubmit();
        }}
      >
        <FieldGroup>
          <otpForm.Field name="code">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>
                    One-time password
                  </FieldLabel>
                  <InputOTP
                    aria-invalid={invalid}
                    id={field.name}
                    maxLength={6}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    value={field.state.value}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </otpForm.Field>
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

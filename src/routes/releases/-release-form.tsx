import type { FormEvent } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import SubmitButton from '@/components/submit-button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ReleaseInput } from './-schema';

interface Props {
  className?: string;
  form: UseFormReturn<ReleaseInput>;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
  submitting: boolean;
}

export default function ReleaseForm({
  className,
  form,
  onSubmit,
  submitting,
}: Props) {
  return (
    <form className={cn('space-y-6', className)} onSubmit={onSubmit}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="artist"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Artist</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                autoFocus
                id={field.name}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="date"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Date</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                type="date"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
        Save
      </SubmitButton>
    </form>
  );
}

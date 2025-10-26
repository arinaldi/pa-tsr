import { useForm } from '@tanstack/react-form';

import SubmitButton from '@/components/submit-button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type ReleaseInput, releaseSchema } from './-schema';

interface Props {
  className?: string;
  defaultValues?: ReleaseInput;
  onSubmit: (data: ReleaseInput) => Promise<void>;
  submitting: boolean;
}

export default function ReleaseForm({
  className,
  defaultValues,
  onSubmit,
  submitting,
}: Props) {
  const form = useForm({
    defaultValues: defaultValues ?? {
      artist: '',
      title: '',
      date: '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onSubmit: releaseSchema,
    },
  });

  return (
    <form
      className={cn('space-y-6', className)}
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="artist">
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.name}>Artist</FieldLabel>
                <Input
                  aria-invalid={invalid}
                  autoFocus
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
        <form.Field name="title">
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
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
        <form.Field name="date">
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.name}>Date</FieldLabel>
                <Input
                  aria-invalid={invalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  type="date"
                  value={field.state.value}
                />
                {invalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      </FieldGroup>
      <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
        Save
      </SubmitButton>
    </form>
  );
}

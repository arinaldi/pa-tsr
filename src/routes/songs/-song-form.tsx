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
import { type SongInput, songSchema } from './-schema';

interface Props {
  className?: string;
  defaultValues?: SongInput;
  onSubmit: (data: SongInput) => Promise<void>;
  submitting: boolean;
}

export default function SongForm({
  className,
  defaultValues,
  onSubmit,
  submitting,
}: Props) {
  const form = useForm({
    defaultValues: defaultValues ?? {
      artist: '',
      title: '',
      link: '',
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onSubmit: songSchema,
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
        <form.Field name="link">
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.name}>Link</FieldLabel>
                <Input
                  aria-invalid={invalid}
                  id={field.name}
                  inputMode="url"
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
      <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
        Save
      </SubmitButton>
    </form>
  );
}

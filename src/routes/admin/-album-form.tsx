import { useForm } from '@tanstack/react-form';

import SubmitButton from '@/components/submit-button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { type AlbumInput, albumSchema } from './-schema';

interface Props {
  defaultValues?: AlbumInput;
  onSubmit: (data: AlbumInput) => Promise<void>;
  submitting: boolean;
}

export default function AlbumForm({
  defaultValues,
  onSubmit,
  submitting,
}: Props) {
  const form = useForm({
    defaultValues: defaultValues ?? {
      artist: '',
      title: '',
      year: new Date().getFullYear(),
      studio: false,
      cd: false,
      wishlist: false,
      favorite: false,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
    validators: {
      onSubmit: albumSchema,
    },
  });

  return (
    <form
      className="space-y-6"
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
        <form.Field name="year">
          {(field) => {
            const invalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={invalid}>
                <FieldLabel htmlFor={field.name}>Year</FieldLabel>
                <Input
                  aria-invalid={invalid}
                  id={field.name}
                  inputMode="numeric"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(+event.target.value)}
                  type="number"
                  value={field.state.value}
                />
                {invalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="studio">
          {(field) => {
            return (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.state.value}
                  id={field.name}
                  name={field.name}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Studio</FieldLabel>
                  <FieldDescription>Is this a studio album?</FieldDescription>
                </FieldContent>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="cd">
          {(field) => {
            return (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.state.value}
                  id={field.name}
                  name={field.name}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>CD</FieldLabel>
                  <FieldDescription>Do you own this CD?</FieldDescription>
                </FieldContent>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="wishlist">
          {(field) => {
            return (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.state.value}
                  id={field.name}
                  name={field.name}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Wishlist</FieldLabel>
                  <FieldDescription>
                    Is this CD on your wishlist?
                  </FieldDescription>
                </FieldContent>
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="favorite">
          {(field) => {
            return (
              <Field orientation="horizontal">
                <Checkbox
                  checked={field.state.value}
                  id={field.name}
                  name={field.name}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked === true)
                  }
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Favorite</FieldLabel>
                  <FieldDescription>Is this a top album?</FieldDescription>
                </FieldContent>
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

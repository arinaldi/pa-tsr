import type { FormEvent } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

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

interface Props {
  form: UseFormReturn<any>;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
  submitting: boolean;
}

export default function AlbumForm({ form, onSubmit, submitting }: Props) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
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
          name="year"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Year</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                inputMode="numeric"
                onChange={(event) => field.onChange(+event.target.value)}
                type="number"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="studio"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id={field.name}
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Studio</FieldLabel>
                <FieldDescription>Is this a studio album?</FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="cd"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id={field.name}
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor={field.name}>CD</FieldLabel>
                <FieldDescription>Do you own this CD?</FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="wishlist"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id={field.name}
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Wishlist</FieldLabel>
                <FieldDescription>
                  Is this CD on your wishlist?
                </FieldDescription>
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="favorite"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id={field.name}
                name={field.name}
                onCheckedChange={field.onChange}
              />
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Favorite</FieldLabel>
                <FieldDescription>Is this a top album?</FieldDescription>
              </FieldContent>
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

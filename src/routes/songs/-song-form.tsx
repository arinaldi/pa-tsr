import type { FormEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import SubmitButton from '@/components/submit-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { SongInput } from './-schema';

interface Props {
  className?: string;
  form: UseFormReturn<SongInput>;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
  submitting: boolean;
}

export default function SongForm({
  className,
  form,
  onSubmit,
  submitting,
}: Props) {
  return (
    <Form {...form}>
      <form className={cn('space-y-6', className)} onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input inputMode="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
          Save
        </SubmitButton>
      </form>
    </Form>
  );
}

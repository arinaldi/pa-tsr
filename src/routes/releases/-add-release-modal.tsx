import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSession } from '@/components/session-provider';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import ReleaseForm from './-release-form';
import { type ReleaseInput, releaseSchema } from './-schema';

const defaultValues = {
  artist: '',
  title: '',
  date: '',
};

export default function AddReleaseModal() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues,
    resolver: zodResolver(releaseSchema),
  });
  const session = useSession();

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: ReleaseInput) => {
      const { error } = await supabase.from('releases').insert({
        ...data,
        date: data.date || null,
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} added`,
  });

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Add release</Button>} />
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Add release</DialogTitle>
          <DialogDescription>What&apos;s the newest release?</DialogDescription>
        </DialogHeader>
        <ReleaseForm form={form} onSubmit={onSubmit} submitting={submitting} />
      </DialogContent>
    </Dialog>
  );
}

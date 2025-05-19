import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSession } from '@/components/session-provider';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import { songSchema, type SongInput } from './-schema';
import SongForm from './-song-form';

const defaultValues = {
  artist: '',
  title: '',
  link: '',
};

export default function AddSongModal() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues,
    resolver: zodResolver(songSchema),
  });
  const session = useSession();

  function onClose() {
    setOpen(false);
    form.reset(defaultValues);
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
    submitFn: async (data: SongInput) => {
      const { error } = await supabase.from('songs').insert(data);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} added`,
  });

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add song</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Add song</DialogTitle>
          <DialogDescription>
            What&apos;s the next featured song?
          </DialogDescription>
        </DialogHeader>
        <SongForm form={form} onSubmit={onSubmit} submitting={submitting} />
      </DialogContent>
    </Dialog>
  );
}

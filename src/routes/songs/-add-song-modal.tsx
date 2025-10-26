import { useState } from 'react';

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
import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from '@/lib/constants';
import { supabase } from '@/supabase/client';
import type { SongInput } from './-schema';
import SongForm from './-song-form';

export default function AddSongModal() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (data: SongInput) => {
      const { error } = await supabase.from('songs').insert(data);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} edited`,
  });

  if (!session) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Add song</Button>} />
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Add song</DialogTitle>
          <DialogDescription>
            What&apos;s the next featured song?
          </DialogDescription>
        </DialogHeader>
        <SongForm onSubmit={onSubmit} submitting={submitting} />
      </DialogContent>
    </Dialog>
  );
}

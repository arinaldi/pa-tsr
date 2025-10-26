import SubmitButton from '@/components/submit-button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAction } from '@/hooks/action';
import { MESSAGES } from '@/lib/constants';
import type { Song } from '@/lib/types';
import { supabase } from '@/supabase/client';

interface Props {
  onClose: () => void;
  song: Song;
}

export default function DeleteSongModal({ onClose, song }: Props) {
  const [, action, pending] = useAction({
    callbacks: [onClose],
    initialState: undefined,
    submitFn: async () => {
      const { error } = await supabase.from('songs').delete().eq('id', song.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} deleted`,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          {song.artist} &ndash; {song.title}
        </DialogDescription>
      </DialogHeader>
      <form action={action}>
        <DialogFooter>
          <SubmitButton submitting={pending} variant="destructive">
            Delete
          </SubmitButton>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from '@/lib/constants';
import type { Song } from '@/lib/types';
import { supabase } from '@/supabase/client';
import type { SongInput } from './-schema';
import SongForm from './-song-form';

interface Props {
  onClose: () => void;
  song: Song;
}

export default function EditSongModal({ onClose, song }: Props) {
  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    submitFn: async (data: SongInput) => {
      const { error } = await supabase
        .from('songs')
        .update(data)
        .eq('id', song.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.SONG_PREFIX} edited`,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit song</DialogTitle>
        <DialogDescription>Update data for featured song</DialogDescription>
      </DialogHeader>
      <SongForm
        defaultValues={song}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </DialogContent>
  );
}

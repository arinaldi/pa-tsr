import SubmitButton from '@/components/submit-button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAction } from '@/hooks/use-action';
import { MESSAGES } from '@/lib/constants';
import type { Release } from '@/lib/types';
import { supabase } from '@/supabase/client';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function DeleteReleaseModal({ onClose, release }: Props) {
  const [, action, pending] = useAction({
    callbacks: [onClose],
    initialState: undefined,
    submitFn: async () => {
      const { error } = await supabase
        .from('releases')
        .delete()
        .eq('id', release.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} deleted`,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          {release.artist} &ndash; {release.title}
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

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubmit } from '@/hooks/submit';
import { MESSAGES } from '@/lib/constants';
import { formatDate } from '@/lib/formatters';
import type { Release } from '@/lib/types';
import { supabase } from '@/supabase/client';
import ReleaseForm from './-release-form';
import type { ReleaseInput } from './-schema';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function EditReleaseModal({ onClose, release }: Props) {
  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    submitFn: async (data: ReleaseInput) => {
      const { error } = await supabase
        .from('releases')
        .update({
          ...data,
          date: data.date || null,
        })
        .eq('id', release.id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.RELEASE_PREFIX} edited`,
  });

  return (
    <DialogContent>
      <DialogHeader className="text-left">
        <DialogTitle>Edit release</DialogTitle>
        <DialogDescription>Update data for new release</DialogDescription>
      </DialogHeader>
      <ReleaseForm
        defaultValues={{
          ...release,
          date: release.date ? formatDate(release.date) : '',
        }}
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </DialogContent>
  );
}

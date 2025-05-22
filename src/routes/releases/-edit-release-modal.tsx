import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES } from '@/lib/constants';
import { formatDate } from '@/lib/formatters';
import type { Release } from '@/lib/types';
import { supabase } from '@/supabase/client';
import ReleaseForm from './-release-form';
import { type ReleaseInput, releaseSchema } from './-schema';

interface Props {
  onClose: () => void;
  release: Release;
}

export default function EditReleaseModal({ onClose, release }: Props) {
  const form = useForm({
    defaultValues: {
      artist: release.artist,
      title: release.title,
      date: release.date ? formatDate(release.date) : '',
    },
    resolver: zodResolver(releaseSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [onClose],
    handleSubmit: form.handleSubmit,
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
      <ReleaseForm form={form} onSubmit={onSubmit} submitting={submitting} />
    </DialogContent>
  );
}

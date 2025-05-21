import { type FormEvent, useState } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SubmitButton from '@/components/submit-button';
import { useSubmit } from '@/hooks/use-submit';
import { type AllTimeListItem } from '@/lib/formatters';
import { supabase } from '@/supabase/client';

interface Props {
  item: AllTimeListItem;
  removeItem: (id: number) => void;
}

export default function RemoveAllTimeRankingModal({ item, removeItem }: Props) {
  const [open, setOpen] = useState(false);
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => setOpen(false)],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const { error } = await supabase
        .from('rankings')
        .update({
          all_time_position: null,
        })
        .eq('id', item.rankingId);

      if (error) {
        throw new Error(error.message);
      }

      removeItem(item.id);
    },
    successMessage: 'All-time ranking removed',
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="size-6" size="icon" type="button" variant="ghost">
          <X className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to remove this all-time ranking?
          </DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <DialogFooter>
            <SubmitButton submitting={submitting} variant="destructive">
              Delete
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

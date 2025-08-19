import { X } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import SubmitButton from '@/components/submit-button';
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
import { useSubmit } from '@/hooks/use-submit';
import type { AllTimeListItem } from '@/lib/formatters';
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
      <DialogTrigger
        render={
          <Button className="size-6" size="icon" type="button" variant="ghost">
            <X className="size-4" />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            {item.artist} &ndash; {item.title}
          </DialogDescription>
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

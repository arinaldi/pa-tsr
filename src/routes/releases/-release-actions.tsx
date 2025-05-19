import { useState } from 'react';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';

import type { Release } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from '@/components/session-provider';
import DeleteReleaseModal from './-delete-release-modal';
import EditReleaseModal from './-edit-release-modal';

interface Props {
  release: Release;
}

interface ModalState {
  open: boolean;
  type: 'delete' | 'edit';
}

export default function ReleaseActions({ release }: Props) {
  const session = useSession();
  const [modal, setModal] = useState<ModalState>({
    open: false,
    type: 'edit',
  });

  function onClose() {
    setModal((m) => ({ ...m, open: false }));
  }

  if (!session) return null;

  return (
    <Dialog
      open={modal.open}
      onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="-mt-1.5 -mr-1 size-8 shrink-0 p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger
            asChild
            onClick={() => setModal((m) => ({ ...m, type: 'edit' }))}
          >
            <DropdownMenuItem className="flex items-center gap-2">
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger
            asChild
            onClick={() => setModal((m) => ({ ...m, type: 'delete' }))}
          >
            <DropdownMenuItem className="flex items-center gap-2">
              <Trash className="size-4" />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {modal.type === 'edit' && (
        <EditReleaseModal onClose={onClose} release={release} />
      )}
      {modal.type === 'delete' && (
        <DeleteReleaseModal onClose={onClose} release={release} />
      )}
    </Dialog>
  );
}

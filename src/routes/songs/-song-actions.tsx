import { useState } from 'react';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';

import type { Song } from '@/lib/types';
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
import DeleteSongModal from './-delete-song-modal';
import EditSongModal from './-edit-song-modal';

interface Props {
  song: Song;
}

interface ModalState {
  open: boolean;
  type: 'delete' | 'edit';
}

export default function SongActions({ song }: Props) {
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
          <Button className="-mt-1 size-8 shrink-0 p-0" variant="ghost">
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
      {modal.type === 'edit' && <EditSongModal onClose={onClose} song={song} />}
      {modal.type === 'delete' && (
        <DeleteSongModal onClose={onClose} song={song} />
      )}
    </Dialog>
  );
}

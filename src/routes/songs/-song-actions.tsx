import { EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

import { useSession } from '@/components/session-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Song } from '@/lib/types';
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
        <DropdownMenuTrigger
          render={
            <Button className="size-6 shrink-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="size-4" />
            </Button>
          }
        />
        <DropdownMenuPositioner align="end">
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger
                onClick={() => setModal((m) => ({ ...m, type: 'edit' }))}
                nativeButton={false}
                render={
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                }
              />
              <DialogTrigger
                onClick={() => setModal((m) => ({ ...m, type: 'delete' }))}
                nativeButton={false}
                render={
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Trash className="size-4" />
                    Delete
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenuPositioner>
      </DropdownMenu>
      {modal.type === 'edit' && <EditSongModal onClose={onClose} song={song} />}
      {modal.type === 'delete' && (
        <DeleteSongModal onClose={onClose} song={song} />
      )}
    </Dialog>
  );
}

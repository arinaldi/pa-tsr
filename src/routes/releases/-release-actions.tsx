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
import type { Release } from '@/lib/types';
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
      {modal.type === 'edit' && (
        <EditReleaseModal onClose={onClose} release={release} />
      )}
      {modal.type === 'delete' && (
        <DeleteReleaseModal onClose={onClose} release={release} />
      )}
    </Dialog>
  );
}

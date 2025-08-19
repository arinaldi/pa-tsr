import { useRouter } from '@tanstack/react-router';
import { EllipsisVertical } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Album } from '@/lib/types';
import { wait } from '@/lib/utils';
import { supabase } from '@/supabase/client';

interface Props {
  album: Album;
}

type Key = 'cd' | 'favorite' | 'studio' | 'wishlist';

const AlbumKeys: Record<Key, string> = {
  cd: 'CD',
  favorite: 'Favorite',
  studio: 'Studio',
  wishlist: 'Wishlist',
};

export default function AlbumActions({ album }: Props) {
  const router = useRouter();

  async function onChange(key: Key, checked: boolean) {
    const { error } = await supabase
      .from('albums')
      .update({
        [key]: checked,
      })
      .eq('id', album.id);

    if (error) {
      toast.error(error.message);
    }

    await wait(100);
    router.invalidate();
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button className="-mt-1.5 -mr-1 size-8 shrink-0 p-0" variant="ghost">
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
            {Object.entries(AlbumKeys).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                checked={album[key as Key]}
                key={key}
                onCheckedChange={(checked) => onChange(key as Key, checked)}
                onSelect={(event) => event.preventDefault()}
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  );
}

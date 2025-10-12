import type { ColumnDef } from '@tanstack/react-table';
import { Check, Disc, HeartPlus } from 'lucide-react';

import type { Album } from '@/lib/types';
import { cn } from '@/lib/utils';
import DataTableColumnHeader from './-data-table-column-header';

export const columns: ColumnDef<Album>[] = [
  {
    accessorKey: 'artist',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artist" />
    ),
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const album = row.original;

      return (
        <div>
          {album.cd && (
            <Disc className="mr-1 mb-0.5 inline size-4 text-muted-foreground" />
          )}
          {album.wishlist && (
            <HeartPlus className="mr-1 mb-0.5 inline size-4 text-muted-foreground" />
          )}
          <span
            className={cn(
              album.studio ? 'font-medium' : 'font-light',
              album.favorite && 'italic',
            )}
          >
            {album.title}
          </span>
          {album.favorite && (
            <Check className="mb-0.5 ml-1 inline size-4 text-muted-foreground" />
          )}
        </div>
      );
    },
  },
];

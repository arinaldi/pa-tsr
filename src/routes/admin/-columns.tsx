import type { ColumnDef } from '@tanstack/react-table';
import { Check, Disc } from 'lucide-react';

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
        <>
          {album.cd && (
            <Disc className="mr-1 mb-0.5 inline size-4 text-muted-foreground" />
          )}
          <span className={cn(album.studio ? 'font-medium' : 'font-light')}>
            {album.title}
          </span>
        </>
      );
    },
  },
  {
    accessorKey: 'cd',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CD" />
    ),
    cell: ({ row }) => {
      const rowValue = row.getValue('cd') as boolean;

      if (!rowValue) return null;

      return <Check className="size-4" />;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as boolean;

      return value.includes(rowValue.toString());
    },
  },
  {
    accessorKey: 'favorite',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Favorite" />
    ),
    cell: ({ row }) => {
      const rowValue = row.getValue('favorite') as boolean;

      if (!rowValue) return null;

      return <Check className="size-4" />;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as boolean;

      return value.includes(rowValue.toString());
    },
  },
  {
    accessorKey: 'studio',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Studio" />
    ),
    cell: ({ row }) => {
      const rowValue = row.getValue('studio') as boolean;

      if (!rowValue) return null;

      return <Check className="size-4" />;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as boolean;

      return value.includes(rowValue.toString());
    },
  },
  {
    accessorKey: 'wishlist',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wishlist" />
    ),
    cell: ({ row }) => {
      const rowValue = row.getValue('wishlist') as boolean;

      if (!rowValue) return null;

      return <Check className="size-4" />;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as boolean;

      return value.includes(rowValue.toString());
    },
  },
];

import type { ColumnDef } from '@tanstack/react-table';
import { Check } from 'lucide-react';

import type { Album } from '@/lib/types';
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
    cell: ({ row }) => row.getValue('title'),
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

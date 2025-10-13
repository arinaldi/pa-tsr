import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableFacetedFilter } from './-data-table-faceted-filter';
import { DataTableViewOptions } from './-data-table-view-options';

interface Props<TData> {
  table: Table<TData>;
}

const options = [
  { label: 'CD', value: 'cd' },
  { label: 'Favorite', value: 'favorite' },
  { label: 'Studio', value: 'studio' },
  { label: 'Wishlist', value: 'wishlist' },
];

export function DataTableToolbar<TData>({ table }: Props<TData>) {
  const filtered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          autoFocus
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(event) =>
            table.setGlobalFilter(String(event.target.value))
          }
          placeholder="Search"
          value={table.getState().globalFilter}
        />
        {table.getColumn('artist') && (
          <DataTableFacetedFilter
            column={table.getColumn('artist')}
            title="Status"
            options={options}
          />
        )}
        {filtered && (
          <Button
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
            variant="ghost"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

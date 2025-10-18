import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useRef } from 'react';

import InputClearButton from '@/components/input-clear-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { options } from './-data';
import { DataTableFacetedFilter } from './-data-table-faceted-filter';
import { DataTableViewOptions } from './-data-table-view-options';

interface Props<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: Props<TData>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filtered = table.getState().columnFilters.length > 0;
  const value = table.getState().globalFilter ?? '';

  function onClear() {
    table.setGlobalFilter('');

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="relative">
        <Input
          autoFocus
          name="search"
          onChange={(event) =>
            table.setGlobalFilter(String(event.target.value))
          }
          placeholder="Search"
          ref={inputRef}
          value={value}
        />
        {value && <InputClearButton onClick={onClear} />}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {table.getColumn('cd') && (
          <DataTableFacetedFilter
            column={table.getColumn('cd')}
            options={options}
            title="CD"
          />
        )}
        {table.getColumn('favorite') && (
          <DataTableFacetedFilter
            column={table.getColumn('favorite')}
            options={options}
            title="Favorite"
          />
        )}
        {table.getColumn('studio') && (
          <DataTableFacetedFilter
            column={table.getColumn('studio')}
            options={options}
            title="Studio"
          />
        )}
        {table.getColumn('wishlist') && (
          <DataTableFacetedFilter
            column={table.getColumn('wishlist')}
            options={options}
            title="Wishlist"
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
      <div className="md:ml-auto">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

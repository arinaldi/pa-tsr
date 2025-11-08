import type { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
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

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { sorting } = table.getState();
    const [sortedCol] = sorting;
    const shouldSort =
      !sortedCol ||
      sortedCol?.id !== 'year' ||
      (sortedCol?.id === 'year' && sortedCol?.desc);

    if (shouldSort) {
      table.setSorting([{ id: 'year', desc: false }]);
    }

    table.setGlobalFilter(String(event.target.value));
  }

  function onClear() {
    table.setGlobalFilter('');

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <InputGroup className="md:w-56">
        <InputGroupInput
          autoFocus
          name="search"
          onChange={onSearch}
          placeholder="Search"
          ref={inputRef}
          value={value}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        {value && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Clear search"
              onClick={onClear}
              size="icon-sm"
              title="Clear search"
            >
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
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

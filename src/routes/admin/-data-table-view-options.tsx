import type { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';

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
import { cn } from '@/lib/utils';

interface Props<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: Props<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="flex h-8 text-xs" size="sm" variant="outline">
            <Settings2 />
            View
          </Button>
        }
      />
      <DropdownMenuPositioner align="end">
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className={cn(
                    column.id === 'cd' ? 'uppercase' : 'capitalize',
                  )}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenuPositioner>
    </DropdownMenu>
  );
}

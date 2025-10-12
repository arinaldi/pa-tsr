import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, X } from 'lucide-react';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Props<TData, TValue> extends ComponentProps<'div'> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Props<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              className="-ml-3 h-8 data-[state=open]:bg-accent"
              size="sm"
              variant="ghost"
            >
              <span>{title}</span>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDown />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp />
              ) : (
                <ChevronsUpDown />
              )}
            </Button>
          }
        />
        <DropdownMenuPositioner align="start">
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowUp />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDown />
              Desc
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => column.toggleSorting(undefined)}>
              <X />
              Clear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPositioner>
      </DropdownMenu>
    </div>
  );
}

import type { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import PerPage from './-per-page';

interface Props<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: Props<TData>) {
  return (
    <>
      {/* Desktop version */}
      <Pagination className="mt-4 hidden sm:flex sm:items-center sm:justify-end">
        <div className="flex items-center gap-10">
          <PerPage table={table} />
          <p className="font-medium text-sm">
            Page {(table.getState().pagination.pageIndex + 1).toLocaleString()}{' '}
            of {table.getPageCount().toLocaleString()}
          </p>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
      {/* Mobile version */}
      <Pagination className="mt-4 flex flex-col gap-4 sm:hidden">
        <div className="flex items-center gap-4">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
          <p className="font-medium text-sm">
            Page {(table.getState().pagination.pageIndex + 1).toLocaleString()}{' '}
            of {table.getPageCount().toLocaleString()}
          </p>
        </div>
      </Pagination>
    </>
  );
}

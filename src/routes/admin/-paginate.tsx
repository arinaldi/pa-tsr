import { startTransition, useOptimistic } from 'react';
import { useNavigate } from '@tanstack/react-router';
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
import { PER_PAGE } from '@/lib/constants';
import { Route } from './route';
import PerPage from './-per-page';

interface Props {
  total: number;
}

export default function Paginate({ total }: Props) {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();
  const page = searchParams.page ?? 1;
  const perPage = searchParams.perPage ?? PER_PAGE.SMALL;
  const [optimisticPage, setOptimisticPage] = useOptimistic(page);
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = optimisticPage === 1;
  const isLastPage = optimisticPage === lastPage;

  function goToPage(value: number) {
    startTransition(() => {
      setOptimisticPage(value);
      navigate({
        search: (prev) => ({
          ...prev,
          page: value,
        })
      });
    });
  }

  return (
    <>
      {/* Desktop version */}
      <Pagination className="mt-4 hidden sm:flex sm:items-center sm:justify-end">
        <div className="flex items-center gap-10">
          <PerPage />
          <p className="text-sm font-medium">
            Page {optimisticPage.toLocaleString()} of{' '}
            {lastPage.toLocaleString()}
          </p>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => goToPage(1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isFirstPage}
                onClick={() => goToPage(optimisticPage - 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isLastPage}
                onClick={() => goToPage(optimisticPage + 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isLastPage}
                onClick={() => goToPage(lastPage)}
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
                disabled={isFirstPage}
                onClick={() => goToPage(optimisticPage - 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="size-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={isLastPage}
                onClick={() => goToPage(optimisticPage + 1)}
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="size-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
          <p className="text-sm font-medium">
            Page {optimisticPage.toLocaleString()} of{' '}
            {lastPage.toLocaleString()}
          </p>
        </div>
      </Pagination>
    </>
  );
}

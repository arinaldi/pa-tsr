import { useNavigate } from '@tanstack/react-router';
import { ArrowDown } from 'lucide-react';
import { startTransition } from 'react';

import { TableHead } from '@/components/ui/table';
import type { Children } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Route } from '.';

interface Props extends Children {
  prop: string;
  wrapperClassName?: string;
}

export default function SortableColumn({
  children,
  prop,
  wrapperClassName = '',
}: Props) {
  const navigate = useNavigate({ from: Route.fullPath });
  const { sort } = Route.useSearch();
  const [sortProp, desc] = sort?.split(':') ?? [];
  let newSort: string | null = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  function onClick() {
    startTransition(() => {
      navigate({
        search: (prev) => ({
          ...prev,
          sort: newSort ?? undefined,
        }),
      });
    });
  }

  return (
    <TableHead
      className={cn('cursor-pointer', wrapperClassName)}
      onClick={onClick}
      scope="col"
    >
      {children}
      <span
        className={cn('ml-1 flex-none', sortProp === prop ? '' : 'invisible')}
      >
        <ArrowDown
          aria-hidden="true"
          className={cn('inline size-4', desc ? 'rotate-180' : '')}
        />
      </span>
    </TableHead>
  );
}

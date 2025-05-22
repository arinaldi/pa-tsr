import { useNavigate } from '@tanstack/react-router';
import { startTransition, useOptimistic } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PER_PAGE } from '@/lib/constants';
import { Route } from '.';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();
  const perPage = searchParams.perPage ?? PER_PAGE.SMALL;
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    perPage.toString(),
  );

  function onValueChange(value: string) {
    startTransition(() => {
      setOptimisticValue(value);
      navigate({
        search: (prev) => ({
          ...prev,
          page: 1,
          perPage: Number.parseInt(value, 10),
        }),
      });
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <p className="font-medium text-sm">Rows per page</p>
      <Select onValueChange={onValueChange} value={optimisticValue}>
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem value={SMALL.toString()}>{SMALL}</SelectItem>
          <SelectItem value={MEDIUM.toString()}>{MEDIUM}</SelectItem>
          <SelectItem value={LARGE.toString()}>{LARGE}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

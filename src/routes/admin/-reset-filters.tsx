import { startTransition } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Route } from '.';
import type { AdminSearch } from './-schema';

interface Props {
  queryKeys: string[];
}

export default function ResetFilters({ queryKeys }: Props) {
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = Route.useSearch();
  const show = queryKeys.some((qk) => qk in searchParams);

  if (!show) return null;

  return (
    <Button
      className="h-8 w-fit px-2 lg:px-3"
      onClick={() => {
        startTransition(() => {
          navigate({
            search: (prev) => {
              queryKeys.forEach((qk) => {
                prev[qk as keyof AdminSearch] = undefined;
              });
              
              return {
                ...prev,
                page: 1,
              };
            },
          });
        });
      }}
      variant="ghost"
    >
      Reset <X />
    </Button>
  );
}

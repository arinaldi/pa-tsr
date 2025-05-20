import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

import { ROUTES_ADMIN } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface Props {
  id: number;
}

export default function TableLink({ id }: Props) {
  return (
    <Button asChild className="size-8 p-0" variant="ghost">
      <Link
        search={(prev) => prev}
        to={`${ROUTES_ADMIN.edit.href.replace(':id', id.toString())}`}
      >
        <ChevronRight className="size-4" />
      </Link>
    </Button>
  );
}

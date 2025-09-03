import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ROUTES_ADMIN } from '@/lib/constants';

interface Props {
  id: number;
}

export default function TableLink({ id }: Props) {
  return (
    <Link
      search={(prev) => prev}
      to={`${ROUTES_ADMIN.edit.href.replace(':id', id.toString())}`}
    >
      <Button className="size-8 p-0" variant="ghost">
        <ChevronRight className="size-4" />
      </Button>
    </Link>
  );
}

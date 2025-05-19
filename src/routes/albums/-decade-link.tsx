import { Fragment } from 'react';
import { Link, useLocation } from '@tanstack/react-router';

import { DECADES } from '@/lib/constants';

export default function DecadeLink() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-wrap gap-1.5">
      {DECADES.map((d, index) => (
        <Fragment key={d.id}>
          <Link
            className="hover:text-muted-foreground underline underline-offset-4"
            hash={d.id}
            to={pathname}
          >
            {d.label}
          </Link>
          {index < DECADES.length - 1 && <span>&middot;</span>}
        </Fragment>
      ))}
    </div>
  );
}

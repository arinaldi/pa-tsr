import { Link, useLocation } from '@tanstack/react-router';
import { Fragment } from 'react';

import { HEADER_LETTERS } from '@/lib/formatters';

export default function LetterLink() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-wrap gap-1.5">
      {HEADER_LETTERS.map((l, index) => (
        <Fragment key={l}>
          <Link
            className="underline underline-offset-4 hover:text-muted-foreground"
            key={l}
            hash={`letter-${l}`}
            to={pathname}
          >
            {l}
          </Link>
          {index < HEADER_LETTERS.length - 1 && <span>&middot;</span>}
        </Fragment>
      ))}
    </div>
  );
}

import { Link, useLocation } from '@tanstack/react-router';
import { ArrowUp } from 'lucide-react';

export default function TopLink() {
  const location = useLocation();

  return (
    <Link
      className="fixed right-0 bottom-0 p-5 text-muted-foreground text-sm"
      hash="top"
      to={location.pathname}
    >
      <ArrowUp className="mr-1 inline size-4" />
      <span>Top</span>
    </Link>
  );
}

import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export default function Spinner({ className = '' }: Props) {
  return (
    <LoaderCircle
      className={cn('inline-block size-6 animate-spin duration-500', className)}
    />
  );
}

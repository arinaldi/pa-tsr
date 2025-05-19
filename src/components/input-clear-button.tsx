import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
}

export default function InputClearButton({ onClick }: Props) {
  return (
    <div className="absolute top-0 right-0.5 flex h-full items-center">
      <Button className="size-8" onClick={onClick} size="icon" variant="ghost">
        <X className="size-4" />
      </Button>
    </div>
  );
}

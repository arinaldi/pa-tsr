import { createFileRoute, Link } from '@tanstack/react-router';
import { Disc } from 'lucide-react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia
          className="bg-sidebar-primary text-sidebar-primary-foreground"
          variant="icon"
        >
          <Disc />
        </EmptyMedia>
        <EmptyTitle>Perfect Albums</EmptyTitle>
        <EmptyDescription>The best music on the net</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link
          className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
          to="/albums"
        >
          Get started
        </Link>
      </EmptyContent>
    </Empty>
  );
}

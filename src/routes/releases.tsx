import { createFileRoute } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge';
import { sortReleases } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { getReleases } from '@/supabase/data';
import AddReleaseModal from './releases/-add-release-modal';
import ReleaseActions from './releases/-release-actions';

export const Route = createFileRoute('/releases')({
  component: NewReleases,
  loader: async () => {
    const data = await getReleases();

    return {
      ...data,
      title: 'New releases',
    };
  },
})

function NewReleases() {
  const { releases } = Route.useLoaderData();

  return (
    <div className="space-y-4">
      <AddReleaseModal />
      <div className="space-y-8">
        {Object.entries(releases)
          .sort(sortReleases)
          .map(([date, data]) => (
            <div key={date}>
              <h2 className="bg-accent flex items-center gap-2 rounded-md px-3 py-2 text-xl font-semibold tracking-tight">
                {date}
                <Badge className="bg-background" variant="outline">
                  {data.length.toLocaleString()}
                </Badge>
              </h2>
              <ul className="mt-2 space-y-2 text-sm">
                {data.map((r, i) => (
                  <li
                    key={r.id}
                    className={cn(
                      'grid grid-cols-2 gap-2 px-3 py-1 sm:grid-cols-[1fr_2fr]',
                      i < data.length - 1 && 'border-b',
                    )}
                  >
                    <span className="text-muted-foreground">{r.artist}</span>
                    <span className="flex items-start gap-2">
                      {r.title}
                      <ReleaseActions release={r} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

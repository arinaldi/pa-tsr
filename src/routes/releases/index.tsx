import { createFileRoute } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge';
import { sortReleases } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { getReleases } from '@/supabase/data';
import AddReleaseModal from './-add-release-modal';
import ReleaseActions from './-release-actions';

export const Route = createFileRoute('/releases/')({
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
              <ul className="text-sm">
                {data.map((r, i) => (
                  <li
                    key={r.id}
                    className={cn(
                      'grid grid-cols-2 gap-2 p-3 sm:grid-cols-[1fr_2fr]',
                      i < data.length - 1 && 'border-b',
                    )}
                  >
                    <span className="text-muted-foreground">{r.artist}</span>
                    <span className="flex items-center gap-2">
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

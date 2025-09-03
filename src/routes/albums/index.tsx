import { createFileRoute, Link } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';

import { useSession } from '@/components/session-provider';
import TopLink from '@/components/top-link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTE_HREF, SPOTIFY_URL } from '@/lib/constants';
import { getFavorites } from '@/supabase/data';
import DecadeLink from './-decade-link';

export const Route = createFileRoute('/albums/')({
  component: TopAlbums,
  loader: async () => {
    const data = await getFavorites();

    return {
      ...data,
      title: 'Top albums',
    };
  },
});

function TopAlbums() {
  const { favorites } = Route.useLoaderData();
  const session = useSession();

  return (
    // biome-ignore lint: /correctness/useUniqueElementIds
    <div className="space-y-4" id="top">
      <DecadeLink />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 2xl:grid-cols-4">
        {Object.entries(favorites)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([year, favorites]) => (
            <Card key={year}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2" id={year}>
                    {year}
                    <Badge variant="secondary">
                      {favorites.length.toLocaleString()}
                    </Badge>
                  </CardTitle>
                  {session && (
                    <Link to={ROUTE_HREF.EDIT_RANKINGS.replace(':year', year)}>
                      <Button size="icon" variant="outline">
                        <Pencil className="size-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ol className="ml-4 list-decimal space-y-1">
                  {favorites
                    .sort((a, b) => {
                      if (a.ranking > b.ranking) return 1;
                      if (a.ranking < b.ranking) return -1;
                      return 0;
                    })
                    .map((f) => {
                      const query = encodeURI(`${f.artist} ${f.title}`);
                      const url = `${SPOTIFY_URL}/${query}`;

                      return (
                        <li
                          key={f.id}
                          className="text-muted-foreground text-sm"
                        >
                          <span>{f.artist} &ndash;</span>{' '}
                          <a
                            className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
                            href={url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {f.title}
                          </a>
                        </li>
                      );
                    })}
                </ol>
              </CardContent>
            </Card>
          ))}
      </div>
      <TopLink />
    </div>
  );
}

import { type FormEvent, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Reorder } from 'framer-motion';

import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/submit-button';
import { useSubmit } from '@/hooks/use-submit';
import { ROUTE_HREF } from '@/lib/constants';
import DataEmptyPlaceholder from '@/routes/admin/-data-empty-placeholder';
import { adminSearchSchema } from '@/routes/admin/-schema';
import { supabase, validateSession } from '@/supabase/client';
import { getAllTimeData } from '@/supabase/data';
import AlbumCard from '../-album-card';
import Search from './-search';

export const Route = createFileRoute('/albums/all-time/edit')({
  component: EditAllTimeRankings,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps }) => {
    await validateSession();

    const data = await getAllTimeData(deps.search);

    return {
      ...data,
      parents: [
        {
          href: ROUTE_HREF.TOP_ALBUMS,
          title: 'Top albums',
        },
        {
          href: ROUTE_HREF.ALL_TIME,
          title: 'All-time',
        },
      ],
      title: 'Edit all-time',
    };
  },
  validateSearch: adminSearchSchema,
})

function EditAllTimeRankings() {
  const { candidates, favorites } = Route.useLoaderData();
  const searchParams = Route.useSearch();
  const navigate = useNavigate();
  const search = searchParams.search ?? '';
  const [items, setItems] = useState(favorites);

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTE_HREF.ALL_TIME })],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const rankings = items.map((item, index) => ({
        album_id: item.id,
        all_time_position: index + 1,
        position: item.ranking,
        year: item.year,
      }));
      const { error } = await supabase
        .from('rankings')
        .upsert(rankings, { onConflict: 'album_id' });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: 'Rankings successfully edited',
  });

  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
        <div>
          <Search autoFocus />
          {candidates.length === 0 && search && (
            <div className="mt-4 flex justify-center">
              <DataEmptyPlaceholder />
            </div>
          )}
          {candidates.length > 0 && (
            <div className="mt-4 space-y-3 rounded-md border p-4">
              {candidates.map((c) => (
                <div
                  className="flex items-start justify-between gap-2"
                  key={c.id}
                >
                  <div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-muted-foreground text-sm">{c.artist}</p>
                    <p className="text-muted-foreground text-xs">{c.year}</p>
                  </div>
                  <Button
                    disabled={items.some((i) => i.id === c.id)}
                    onClick={() => {
                      setItems((prev) => [...prev, c]);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Reorder.Group axis="y" onReorder={setItems} values={items}>
            <div className="space-y-2">
              {items.map((item, index) => (
                <AlbumCard
                  key={item.id}
                  item={item}
                  position={index + 1}
                  removeItem={removeItem}
                />
              ))}
            </div>
          </Reorder.Group>
          <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
            Save
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}


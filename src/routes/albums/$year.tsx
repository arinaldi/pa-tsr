import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Reorder } from 'framer-motion';
import { type FormEvent, useState } from 'react';

import SubmitButton from '@/components/submit-button';
import { useSubmit } from '@/hooks/use-submit';
import { ROUTE_HREF } from '@/lib/constants';
import { supabase, validateSession } from '@/supabase/client';
import { getRankingsByYear } from '@/supabase/data';
import AlbumCard from './-album-card';

export const Route = createFileRoute('/albums/$year')({
  component: EditRankings,
  loader: async ({ params: { year } }) => {
    await validateSession();

    const data = await getRankingsByYear(year);

    return {
      ...data,
      parents: [
        {
          href: ROUTE_HREF.TOP_ALBUMS,
          title: 'Top albums',
        },
      ],
      title: `Rankings for ${year}`,
    };
  },
});

function EditRankings() {
  const { favorites } = Route.useLoaderData();
  const { year } = Route.useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState(
    favorites.sort((a, b) => {
      if (a.ranking > b.ranking) return 1;
      if (a.ranking < b.ranking) return -1;
      return 0;
    }),
  );

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTE_HREF.TOP_ALBUMS })],
    submitFn: async (event: FormEvent) => {
      event.preventDefault();

      const rankings = items.map((item, index) => ({
        id: item.id,
        position: index + 1,
      }));
      const positions = rankings.map((r) => r.position);
      const positionsSet = new Set(positions);

      if (positionsSet.size !== favorites.length) {
        throw new Error('Rankings must be unique');
      }

      const input = rankings.map((r) => ({
        album_id: r.id,
        position: r.position,
        year,
      }));
      const { error } = await supabase
        .from('rankings')
        .upsert(input, { onConflict: 'album_id' });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: 'Rankings successfully edited',
  });

  return (
    <form className="max-w-md space-y-4" onSubmit={onSubmit}>
      <Reorder.Group axis="y" onReorder={setItems} values={items}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <AlbumCard key={item.id} item={item} position={index + 1} />
          ))}
        </div>
      </Reorder.Group>
      <SubmitButton className="w-full sm:w-auto" submitting={submitting}>
        Save
      </SubmitButton>
    </form>
  );
}

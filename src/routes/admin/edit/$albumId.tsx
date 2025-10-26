import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase, validateSession } from '@/supabase/client';
import { getAlbum } from '@/supabase/data';
import AlbumForm from '../-album-form';
import DeleteAlbumModal from '../-delete-album-modal';
import type { AlbumInput } from '../-schema';

export const Route = createFileRoute('/admin/edit/$albumId')({
  beforeLoad: validateSession,
  component: EditAlbum,
  loader: async ({ params: { albumId } }) => {
    const data = await getAlbum(albumId);

    return {
      ...data,
      parents: [
        {
          href: ROUTES_ADMIN.base.href,
          title: 'Admin',
        },
      ],
      title: 'Edit album',
    };
  },
  preload: false,
});

function EditAlbum() {
  const { album } = Route.useLoaderData();
  const { albumId } = Route.useParams();
  const navigate = useNavigate();
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTES_ADMIN.base.href })],
    submitFn: async ({ year, ...rest }: AlbumInput) => {
      const id = Number.parseInt(albumId, 10);

      if (album.favorite && !rest.favorite) {
        const { data: ranking, error: rankingError } = await supabase
          .from('rankings')
          .select('*')
          .eq('album_id', id)
          .single();

        if (rankingError) {
          throw new Error(rankingError.message);
        }

        if (ranking) {
          await supabase.from('rankings').delete().eq('id', ranking.id);
        }
      }

      const { error } = await supabase
        .from('albums')
        .update({
          ...rest,
          year: year.toString(),
        })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  });

  return (
    <div className="max-w-sm">
      <AlbumForm
        defaultValues={{ ...album, year: Number(album.year) }}
        onSubmit={onSubmit}
        submitting={submitting}
      />
      <DeleteAlbumModal album={album} className="mt-2 w-full sm:w-auto" />
    </div>
  );
}

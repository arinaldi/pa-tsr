import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { validateSession } from '@/supabase/client';
import { supabase } from '@/supabase/client';
import { getAlbum } from '@/supabase/data';
import AlbumForm from '../-album-form';
import DeleteAlbumModal from '../-delete-album-modal';
import { type AlbumInput, albumSchema } from '../-schema';

export const Route = createFileRoute('/admin/edit/$albumId')({
  component: EditAlbum,
  loader: async ({ params: { albumId } }) => {
    await validateSession();

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
  const form = useForm({
    defaultValues: {
      artist: album.artist,
      title: album.title,
      year: Number(album.year),
      studio: album.studio,
      cd: album.cd,
      wishlist: album.wishlist,
      favorite: album.favorite,
    },
    resolver: zodResolver(albumSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [
      () =>
        navigate({
          search: (prev) => prev,
          to: ROUTES_ADMIN.base.href,
        }),
    ],
    handleSubmit: form.handleSubmit,
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
      <AlbumForm form={form} onSubmit={onSubmit} submitting={submitting} />
      <DeleteAlbumModal album={album} className="mt-2 w-full sm:w-auto" />
    </div>
  );
}

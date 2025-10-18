import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { useSubmit } from '@/hooks/use-submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase, validateSession } from '@/supabase/client';
import AlbumForm from './-album-form';
import { type AlbumInput, albumSchema } from './-schema';

export const Route = createFileRoute('/admin/add')({
  beforeLoad: validateSession,
  component: AddAlbum,
  loader: async () => {
    return {
      parents: [
        {
          href: ROUTES_ADMIN.base.href,
          title: 'Admin',
        },
      ],
      title: 'Add album',
    };
  },
});

function AddAlbum() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      artist: '',
      title: '',
      year: new Date().getFullYear(),
      studio: false,
      cd: false,
      wishlist: false,
      favorite: false,
    },
    resolver: zodResolver(albumSchema),
  });

  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTES_ADMIN.base.href })],
    handleSubmit: form.handleSubmit,
    submitFn: async ({ year, ...rest }: AlbumInput) => {
      const { error } = await supabase.from('albums').insert({
        ...rest,
        year: year.toString(),
      });

      if (error) {
        throw new Error(error.message);
      }
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} added`,
  });

  return (
    <div className="max-w-sm">
      <AlbumForm form={form} onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}

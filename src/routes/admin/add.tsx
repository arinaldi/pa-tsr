import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useSubmit } from '@/hooks/submit';
import { MESSAGES, ROUTES_ADMIN } from '@/lib/constants';
import { supabase, validateSession } from '@/supabase/client';
import AlbumForm from './-album-form';
import type { AlbumInput } from './-schema';

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
  const { onSubmit, submitting } = useSubmit({
    callbacks: [() => navigate({ to: ROUTES_ADMIN.base.href })],
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
      <AlbumForm onSubmit={onSubmit} submitting={submitting} />
    </div>
  );
}

import { createFileRoute, Link } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROUTES_ADMIN } from '@/lib/constants';
import { validateSession } from '@/supabase/client';
import { getAllAlbums } from '@/supabase/data';
import { columns } from './-columns';
import DataEmptyPlaceholder from './-data-empty-placeholder';
import DataTable from './-data-table';

export const Route = createFileRoute('/admin/')({
  beforeLoad: validateSession,
  component: Admin,
  loader: async () => {
    const data = await getAllAlbums();

    return {
      ...data,
      cdCount: 0, // TODO: get from supabase/data
      title: 'Admin',
    };
  },
  // validateSearch: adminSearchSchema,
});

export default function Admin() {
  const { albums, cdCount } = Route.useLoaderData();

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <Link search={(prev) => prev} to={ROUTES_ADMIN.add.href}>
          <Button type="button">Add album</Button>
        </Link>
        <div className="flex items-center gap-4 dark:text-white">
          <code className="text-xs">{__APP_VERSION__}</code>
          <span className="flex items-center gap-0.5">
            <Badge variant="secondary">{cdCount.toLocaleString()}</Badge>
            <span className="text-sm leading-7">
              CD{cdCount === 1 ? '' : 's'}
            </span>
          </span>
        </div>
      </div>
      {albums?.length === 0 ? (
        <div className="mt-4 flex justify-center">
          <DataEmptyPlaceholder />
        </div>
      ) : (
        <div className="mt-4 rounded-md">
          <DataTable columns={columns} data={albums} />
        </div>
      )}
    </>
  );
}

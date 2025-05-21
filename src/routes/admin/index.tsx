import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Disc, HeartPlus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ROUTES_ADMIN } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { validateSession } from '@/supabase/client';
import { getAdminData } from '@/supabase/data';
import { adminSearchSchema } from './-schema';
import AlbumActions from './-album-actions';
import DataEmptyPlaceholder from './-data-empty-placeholder';
import FacetedFilter from './-faceted-filter';
import Paginate from './-paginate';
import ResetFilters from './-reset-filters';
import Search from './-search';
import SortableColumn from './-sortable-column';
import TableLink from './-table-link';

export const Route = createFileRoute('/admin/')({
  validateSearch: adminSearchSchema,
  component: Admin,
  loaderDeps: ({ search }) => ({ search}),
  loader: async (context) => {
    await validateSession();
    
    const data = await getAdminData(context.deps.search);
    
    return {
      ...data,
      title: 'Admin'
    }
  },
})

export default function Admin() {
  const { albums, cdCount, count } = Route.useLoaderData();

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
      <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-center">
        <Search autoFocus />
        <div className="flex flex-wrap items-center gap-2">
          <FacetedFilter queryKey="cd" title="CD" />
          <FacetedFilter queryKey="favorite" title="Favorite" />
          <FacetedFilter queryKey="studio" title="Studio" />
          <FacetedFilter queryKey="wishlist" title="Wishlist" />
          <ResetFilters queryKeys={['cd', 'favorite', 'studio', 'wishlist']} />
        </div>
      </div>

      {albums?.length === 0 ? (
        <div className="mt-4 flex justify-center">
          <DataEmptyPlaceholder />
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <SortableColumn prop="artist">Artist</SortableColumn>
                  <SortableColumn prop="year">Year</SortableColumn>
                  <SortableColumn prop="title">Title</SortableColumn>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {albums.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>{a.artist}</TableCell>
                    <TableCell>{a.year}</TableCell>
                    <TableCell>
                      {a.cd && (
                        <Disc className="text-muted-foreground mr-1 mb-0.5 inline size-4" />
                      )}
                      {a.wishlist && (
                        <HeartPlus className="text-muted-foreground mr-1 mb-0.5 inline size-4" />
                      )}
                      <span
                        className={cn(
                          a.studio ? 'font-medium' : 'font-light',
                          a.favorite && 'italic',
                        )}
                      >
                        {a.title}
                      </span>
                      {a.favorite && (
                        <Check className="text-muted-foreground mb-0.5 ml-1 inline size-4" />
                      )}
                    </TableCell>
                    <TableCell className="flex items-end justify-end gap-2">
                      <AlbumActions album={a} />
                      <TableLink id={a.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Paginate total={count} />
        </>
      )}
    </>
  );
}

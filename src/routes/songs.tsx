import { createFileRoute } from '@tanstack/react-router';

import TopLink from '@/components/top-link';
import { getSongs } from '@/supabase/data';
import AddSongModal from './songs/-add-song-modal';
import LetterLink from './songs/-letter-link';
import SongActions from './songs/-song-actions';

export const Route = createFileRoute('/songs')({
  component: FeaturedSongs,
  loader: async () => {
    const data = await getSongs();

    return {
      ...data,
      title: 'Featured songs',
    };
  },
});

function FeaturedSongs() {
  const { songs } = Route.useLoaderData();

  return (
    <div className="space-y-4" id="top">
      <AddSongModal />
      <LetterLink />
      <div className="mt-4 flex flex-col gap-8">
        {Object.entries(songs).map(([letter, data]) => {
          if (data.length === 0) return null;

          return (
            <div key={letter}>
              <h2
                className="border-b pb-2 text-xl font-semibold tracking-tight"
                id={`letter-${letter}`}
              >
                {letter}
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((s) => (
                  <li key={s.id} className="text-sm">
                    <span className="flex items-start gap-2">
                      <span>
                        <span className="text-muted-foreground">
                          {s.artist} &ndash;
                        </span>{' '}
                        <a
                          className="hover:text-muted-foreground underline underline-offset-4"
                          href={s.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {s.title}
                        </a>
                      </span>
                      {<SongActions song={s} />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <TopLink />
    </div>
  );
}

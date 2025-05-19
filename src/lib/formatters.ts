import { MONTHS } from './constants';
import type { Album, Release, Song } from './types';

function addZeroPrefix(value: number) {
  return value < 10 ? `0${value}` : value;
}

export function formatDate(isoString: string): string {
  if (!isoString) return '';

  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  return `${year}-${addZeroPrefix(month)}-${addZeroPrefix(day)}`;
}

export interface ListItem {
  artist: string;
  id: number;
  ranking: number;
  title: string;
  year: string;
}

export type FavoriteResults = Record<string, ListItem[]>;

export interface AllTimeListItem extends ListItem {
  allTimeRanking: number | null;
  rankingId: number;
}

interface RankedAlbum extends Album {
  ranking: {
    all_time_position?: number | null;
    id?: number;
    position: number;
  } | null;
}

export function formatFavorites(favorites: RankedAlbum[]): FavoriteResults {
  const results: FavoriteResults = {};

  favorites.forEach(({ artist, id, ranking, title, year }) => {
    const data = {
      artist,
      id,
      ranking: ranking?.position ?? 0,
      title,
      year,
    };

    if (results[year]) {
      results[year].push(data);
    } else {
      results[year] = [data];
    }
  });

  return results;
}

function formatReleaseDate(isoString: string) {
  const newDate = new Date(isoString);
  const date = newDate.getUTCDate();
  const month = newDate.getUTCMonth();
  const year = newDate.getUTCFullYear();

  return `${date} ${MONTHS[month]} ${year}`;
}

export type ReleaseResults = Record<string, Release[]>;

export function formatReleases(releases: Release[]): ReleaseResults {
  const results: ReleaseResults = {};

  releases.forEach((r) => {
    const releaseDate = r.date ? formatReleaseDate(r.date) : 'TBD';

    if (results[releaseDate]) {
      results[releaseDate].push(r);
    } else {
      results[releaseDate] = [r];
    }
  });

  return results;
}

const NUMBER_SIGN = '#';
const ALPHABET = Array.from(Array(26)).map((_, i) =>
  String.fromCharCode(i + 65),
);
export const HEADER_LETTERS = [NUMBER_SIGN, ...ALPHABET];

type SongResults = Record<string, Song[]>;

export function formatSongs(songs: Song[]): SongResults {
  const results: SongResults = {};

  HEADER_LETTERS.forEach((letter) => {
    results[letter] = [];
  });

  songs.forEach((song) => {
    let firstLetter = song.artist[0].toUpperCase();

    if (song.artist.startsWith('A ')) {
      firstLetter = song.artist[2].toUpperCase();
    } else if (song.artist.startsWith('An ')) {
      firstLetter = song.artist[3].toUpperCase();
    } else if (
      song.artist.startsWith('The ') ||
      song.artist.startsWith('Tha ')
    ) {
      firstLetter = song.artist[4].toUpperCase();
    }

    if (/\d/.test(firstLetter) || !results[firstLetter]) {
      firstLetter = NUMBER_SIGN;
    }

    results[firstLetter].push(song);
  });

  Object.values(results).forEach((s) => {
    s.sort((a, b) => {
      let artistA = a.artist;
      let artistB = b.artist;

      if (artistA.startsWith('A ')) {
        artistA = artistA.slice(2);
      } else if (artistA.startsWith('An ')) {
        artistA = artistA.slice(3);
      } else if (artistA.startsWith('The ') || artistA.startsWith('Tha ')) {
        artistA = artistA.slice(4);
      }

      if (artistB.startsWith('A ')) {
        artistB = artistB.slice(2);
      } else if (artistB.startsWith('An ')) {
        artistB = artistB.slice(3);
      } else if (artistB.startsWith('The ') || artistB.startsWith('Tha ')) {
        artistB = artistB.slice(4);
      }

      return artistA.localeCompare(artistB);
    });
  });

  return results;
}

interface RankedAlbumByYear {
  artist: string;
  id: number;
  title: string;
  year: string;
  ranking: {
    all_time_position: number | null;
    id: number;
    position: number;
  } | null;
}

export function formatRankingsByYear(
  rankings: RankedAlbumByYear[],
): AllTimeListItem[] {
  return rankings.map((r) => ({
    allTimeRanking: r.ranking?.all_time_position ?? 0,
    artist: r.artist,
    id: r.id,
    ranking: r.ranking?.position ?? 0,
    rankingId: r.ranking?.id ?? 0,
    title: r.title,
    year: r.year,
  }));
}

interface RankedAlbumAllTime {
  all_time_position: number | null;
  id: number;
  position: number;
  album?: Partial<Album>;
}

export function formatRankingsAllTime(
  rankings: RankedAlbumAllTime[],
): AllTimeListItem[] {
  return rankings.map((r) => ({
    allTimeRanking: r.all_time_position,
    artist: r.album?.artist ?? '',
    id: r.album?.id ?? 0,
    ranking: r.position,
    rankingId: r.id,
    title: r.album?.title ?? '',
    year: r.album?.year ?? '',
  }));
}

type ReleaseTuple = [string, Release[]];

export function sortReleases(a: ReleaseTuple, b: ReleaseTuple) {
  const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
  const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
}

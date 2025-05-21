import {
  type AllTimeListItem,
  formatFavorites,
  formatRankingsAllTime,
  formatRankingsByYear,
  formatReleases,
  formatSongs,
} from '@/lib/formatters';
import { supabase } from '@/supabase/client';
import { PER_PAGE, SORT_DIRECTION } from '@/lib/constants';
import type { AdminSearch } from '@/routes/admin/-schema';

const { ASC, DESC } = SORT_DIRECTION;

export async function getAlbum(id: string) {
  const { data: album, error } = await supabase
    .from('albums')
    .select('*')
    .eq('id', parseInt(id, 10))
    .single();

  if (error) throw new Error(error.message);

  return { album };
}

async function getAlbums(searchParams: AdminSearch) {
  const { cd, favorite, sort, studio, wishlist } = searchParams;
  const page = searchParams.page ?? 1;
  const perPage = searchParams.perPage ?? PER_PAGE.SMALL;
  const [sortProp, desc] = sort?.split(':') ?? [];
  const direction = desc ? DESC : ASC;
  const start = (page - 1) * perPage;
  const end = page * perPage - 1;
  const search = searchParams.search ?? '';
  const searchTerm = `%${search}%`;

  let query = supabase
    .from('albums')
    .select('*', { count: 'exact' })
    .or(`artist.ilike.${searchTerm}, title.ilike.${searchTerm}`)
    .range(start, end);

  if (cd !== undefined) {
    query = query.eq('cd', cd);
  }

  if (favorite !== undefined) {
    query = query.eq('favorite', favorite);
  }

  if (studio !== undefined) {
    query = query.eq('studio', studio);
  }

  if (wishlist !== undefined) {
    query = query.eq('wishlist', wishlist);
  }

  if (sortProp) {
    query = query.order(sortProp, { ascending: direction === ASC });
  } else {
    query = query
      .order('artist', { ascending: true })
      .order('title', { ascending: true });
  }

  if (sortProp === 'artist') {
    query = query.order('title', { ascending: true });
  } else {
    query = query.order('artist', { ascending: direction === ASC });
  }

  const { count, data: albums, error } = await query;

  if (error) throw new Error(error.message);

  return {
    albums,
    count: count ?? 0,
  };
}

async function getCdCount(searchParams: AdminSearch) {
  const { cd, favorite, studio, wishlist } = searchParams;
  const search = searchParams.search ?? '';
  const searchTerm = `%${search}%`;

  let query = supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true)
    .or(`artist.ilike.${searchTerm}, title.ilike.${searchTerm}`);

    if (cd !== undefined) {
      query = query.eq('cd', cd);
    }
  
    if (favorite !== undefined) {
      query = query.eq('favorite', favorite);
    }
  
    if (studio !== undefined) {
      query = query.eq('studio', studio);
    }
  
    if (wishlist !== undefined) {
      query = query.eq('wishlist', wishlist);
    }

  const { count, error } = await query;

  if (error) throw new Error(error.message);

  return count ?? 0;
}

export async function getAdminData(searchParams: AdminSearch) {
  const [{ albums, count }, cdCount] = await Promise.all([
    getAlbums(searchParams),
    getCdCount(searchParams),
  ]);

  return {
    albums,
    cdCount,
    count,
  };
}

export async function getAllTimeRankings() {
  const { data, error } = await supabase
    .from('rankings')
    .select(
      `
            all_time_position,
            id,
            position,
            album:albums (
              artist,
              id,
              title,
              year
            )
          `,
    )
    .gte('all_time_position', 1)
    .order('all_time_position', { ascending: true });

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    favorites: formatRankingsAllTime(data),
  };
}

export async function getCandidates(searchParams: AdminSearch) {
  const search = searchParams.search ?? '';
  const searchTerm = `%${search}%`;
  let candidates: AllTimeListItem[] = [];

  if (search) {
    let query = supabase
      .from('albums')
      .select(
        `
          artist,
          id,
          title,
          year,
          ranking:rankings!inner(
            all_time_position,
            id,
            position
          )
        `,
      )
      .gte('rankings.position', 1)
      .or(`artist.ilike.${searchTerm}, title.ilike.${searchTerm}`)
      .range(0, 24)
      .order('artist', { ascending: true });
    
    const { data, error } = await query;

    if (error) throw new Error(error.message);

    candidates = formatRankingsByYear(data);
  }

  return { candidates };
}

export async function getAllTimeData(searchParams: AdminSearch) {
  const [{ favorites }, { candidates }] = await Promise.all([
    getAllTimeRankings(),
    getCandidates(searchParams),
  ]);

  return {
    candidates,
    count: favorites.length,
    favorites,
  };
}

interface Artist {
  artist: string;
}

export async function getArtists() {
  const { data, error } = await supabase.rpc('get_artists');

  if (error) throw new Error(error.message);

  const artists = data as unknown as Artist[];

  return {
    artists: artists.map((a) => a.artist),
    count: artists.length,
  };
}

export async function getFavorites() {
  const { data, error } = await supabase
    .from('albums')
    .select(
      `
        artist,
        artist_title,
        cd,
        created_at,
        favorite,
        id,
        studio,
        title,
        wishlist,
        year,
        ranking:rankings (
          position
      )
      `,
    )
    .eq('favorite', true)
    .order('artist', { ascending: true });

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    favorites: formatFavorites(data),
  };
}

export async function getRankingsByYear(year: string) {
  const { data, error } = await supabase
    .from('albums')
    .select(
      `
      artist,
      id,
      title,
      year,
      ranking:rankings (
        all_time_position,
        id,
        position
      )
    `,
    )
    .match({ favorite: true, year });

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    favorites: formatRankingsByYear(data),
  };
}

export async function getReleases() {
  const { data, error } = await supabase
    .from('releases')
    .select('*')
    .order('artist');

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    releases: formatReleases(data),
  };
}

export async function getSongs() {
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('artist');

  if (error) throw new Error(error.message);

  return {
    count: data.length,
    songs: formatSongs(data),
  };
}

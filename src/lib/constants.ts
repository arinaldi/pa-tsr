import { Calendar, Layers, User, Volume1 } from 'lucide-react';

import type { Route } from '@/lib/types';

/* ENUM */

export enum MESSAGES {
  ALBUM_PREFIX = 'Album successfully',
  SONG_PREFIX = 'Song successfully',
  RELEASE_PREFIX = 'Release successfully',
  ERROR = 'Something went wrong',
  NO_DATA = 'No data',
  NOT_AUTHORIZED = 'Not authorized',
  INVALID_DATA = 'Invalid data',
}

export enum PER_PAGE {
  SMALL = 25,
  MEDIUM = 50,
  LARGE = 100,
}

export enum SORT_DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
  NONE = '',
}

export enum SORT_VALUE {
  ARTIST = 'artist',
  NONE = '',
  TITLE = 'title',
  YEAR = 'year',
}

/* CONST */

export const APP_NAME = 'Perfect Albums';

export const DEBOUNCE_IN_MS = 500;

export const DECADES = [
  { id: '2019', label: '10s' },
  { id: '2009', label: '00s' },
  { id: '1999', label: '90s' },
  { id: '1989', label: '80s' },
  { id: '1977', label: '70s' },
];

export const EMAIL = import.meta.env.VITE_EMAIL;

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const ROUTE_HREF = {
  ALL_TIME: '/albums/all-time',
  ALL_TIME_EDIT: '/albums/all-time/edit',
  ARTISTS: '/artists',
  EDIT_RANKINGS: '/albums/:year',
  FEATURED_SONGS: '/songs',
  NEW_RELEASES: '/releases',
  NOT_FOUND: '/not-found',
  PLAYLIST: '/playlist',
  SANDBOX: '/sandbox',
  SIGNIN: '/signin',
  SIGNOUT: '/signout',
  TOP_ALBUMS: '/albums',
};

export const ROUTES: Route[] = [
  {
    href: ROUTE_HREF.TOP_ALBUMS,
    icon: Layers,
    label: 'Top albums',
    items: [
      {
        href: ROUTE_HREF.ALL_TIME,
        label: 'All-time',
      },
    ],
  },
  {
    href: ROUTE_HREF.FEATURED_SONGS,
    icon: Volume1,
    label: 'Featured songs',
  },
  {
    href: ROUTE_HREF.NEW_RELEASES,
    icon: Calendar,
    label: 'New releases',
  },
  {
    href: ROUTE_HREF.ARTISTS,
    icon: User,
    label: 'Artists',
  },
];

export const ROUTES_ADMIN = {
  add: { href: '/admin/add', label: 'Add album' },
  base: { href: '/admin', label: 'Admin' },
  edit: { href: '/admin/edit/:id', label: 'Edit album' },
};

export const SPOTIFY_URL = 'https://open.spotify.com/search';

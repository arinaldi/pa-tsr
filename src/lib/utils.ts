import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { PER_PAGE } from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(value: string) {
  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}

type QueryValue = string | string[] | undefined | null;

export function parseQuery(value: QueryValue) {
  return typeof value === 'string' ? value : '';
}

export function parsePageQuery(value: QueryValue) {
  return typeof value === 'string' ? parseInt(value) : 1;
}

export function parsePerPageQuery(value: QueryValue) {
  const { SMALL, MEDIUM, LARGE } = PER_PAGE;
  const perPage = typeof value === 'string' ? parseInt(value) : PER_PAGE.SMALL;

  if (perPage === SMALL) return SMALL;
  if (perPage === MEDIUM) return MEDIUM;
  if (perPage === LARGE) return LARGE;
  return SMALL;
}

export function parseAdminQuery(query: Record<string, QueryValue>) {
  return {
    cd: parseQuery(query.cd),
    favorite: parseQuery(query.favorite),
    page: parsePageQuery(query.page),
    perPage: parsePerPageQuery(query.perPage),
    search: parseQuery(query.search),
    sort: parseQuery(query.sort),
    studio: parseQuery(query.studio),
    wishlist: parseQuery(query.wishlist),
  };
}

export async function wait(ms = 0) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function getCookie(name: string) {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

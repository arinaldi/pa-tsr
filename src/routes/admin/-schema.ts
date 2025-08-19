import { z } from 'zod';

import { PER_PAGE } from '@/lib/constants';

export const adminSearchSchema = z.object({
  cd: z.boolean().optional(),
  favorite: z.boolean().optional(),
  page: z.number().catch(1).optional(),
  perPage: z.number().catch(PER_PAGE.SMALL).optional(),
  search: z.string().catch('').optional(),
  sort: z.string().catch('').optional(),
  studio: z.boolean().optional(),
  wishlist: z.boolean().optional(),
});

export type AdminSearch = z.infer<typeof adminSearchSchema>;

export const albumSchema = z.object({
  artist: z.string().min(1).max(128),
  title: z.string().min(1).max(128),
  year: z.number().gte(1900).lte(2100),
  studio: z.boolean(),
  cd: z.boolean(),
  wishlist: z.boolean(),
  favorite: z.boolean(),
});

export type AlbumInput = z.infer<typeof albumSchema>;

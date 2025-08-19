import { z } from 'zod';

export const songSchema = z.object({
  artist: z.string().min(1).max(128),
  title: z.string().min(1).max(128),
  link: z.url({ error: 'Link is invalid' }),
});

export type SongInput = z.infer<typeof songSchema>;

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/playlist/')({
  component: Playlist,
  loader: () => ({ title: 'Playlist' }),
});

function Playlist() {
  return (
    <a
      className="underline underline-offset-4 hover:text-muted-foreground"
      href="https://open.spotify.com/playlist/3NAIQcUEkwKXu2eHaZBQrg"
      rel="noopener noreferrer"
      target="_blank"
    >
      Spotify
    </a>
  );
}

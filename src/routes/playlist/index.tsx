import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playlist/')({
  component: Playlist,
  loader: () => ({ title: 'Playlist' }),
})

function Playlist() {
  return (
    <a
      className="hover:text-muted-foreground underline underline-offset-4"
      href="https://open.spotify.com/playlist/3NAIQcUEkwKXu2eHaZBQrg"
      rel="noopener noreferrer"
      target="_blank"
    >
      Spotify
    </a>
  );
}

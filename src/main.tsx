import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import './styles.css';
import { NotFound } from './routes/not-found';

const THIRTY_SECONDS = 1000 * 30;

const router = createRouter({
  context: {},
  defaultNotFoundComponent: NotFound,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: THIRTY_SECONDS,
  defaultStaleTime: THIRTY_SECONDS,
  defaultStructuralSharing: true,
  routeTree,
  scrollRestoration: true,
  trailingSlash: 'never',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

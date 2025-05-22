import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// import reportWebVitals from './reportWebVitals.ts'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

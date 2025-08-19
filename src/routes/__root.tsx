import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import AppSidebar from '@/components/app-sidebar';
import { SessionProvider } from '@/components/session-provider';
import TailwindIndicator from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
  component: () => (
    <SessionProvider>
      <ThemeProvider>
        <AppSidebar />
        <TailwindIndicator />
        <TanStackRouterDevtools />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </SessionProvider>
  ),
});

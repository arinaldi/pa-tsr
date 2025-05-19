import { Outlet } from '@tanstack/react-router';
import { Disc, Lock } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import MenuLink from '@/components/menu-link';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SIDEBAR_COOKIE_NAME,
} from '@/components/ui/sidebar';
import { APP_NAME, ROUTES, ROUTES_ADMIN } from '@/lib/constants';
import { getCookie } from '@/lib/utils';
import { useSession } from './session-provider';
import PageTitle from './page-title';
import UserMenu from './user-menu';

export default function AppSidebar() {
  const session = useSession();
  const sidebarState = getCookie(SIDEBAR_COOKIE_NAME);
  let defaultOpen = true;

  if (sidebarState) {
    defaultOpen = sidebarState === 'true';
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Disc className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{APP_NAME}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      The best music on the net
                    </span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Links</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ROUTES.map((r) => (
                  <MenuLink key={r.href} route={r} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {session && (
            <SidebarGroup>
              <SidebarGroupLabel>Protected</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <MenuLink
                    route={{
                      href: ROUTES_ADMIN.base.href,
                      icon: Lock,
                      label: ROUTES_ADMIN.base.label,
                    }}
                  />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b-1 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink to="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <PageTitle />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="isolate p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

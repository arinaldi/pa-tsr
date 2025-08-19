import { Link, useLocation } from '@tanstack/react-router';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { Route } from '@/lib/types';
import { cn } from '@/lib/utils';

interface Props {
  route: Route;
}

export default function MenuLink({ route }: Props) {
  const { href, items, label } = route;
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();
  const pathMatch = pathname === href;
  const active = items ? pathMatch : pathname.startsWith(href);
  const parentActive = items ? pathMatch : true;

  function closeMobile() {
    setOpenMobile(false);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        render={
          <Link onClick={closeMobile} to={href}>
            {({ isActive }) => (
              <>
                <route.icon
                  className={cn(
                    isActive && parentActive ? '' : 'text-muted-foreground',
                  )}
                />
                <span
                  className={cn(
                    isActive && parentActive
                      ? 'font-medium'
                      : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
              </>
            )}
          </Link>
        }
      />
      {items && (
        <SidebarMenuSub>
          {items.map((item) => {
            const subActive = pathname.startsWith(item.href);

            return (
              <SidebarMenuSubItem key={item.label}>
                <SidebarMenuSubButton
                  isActive={subActive}
                  render={
                    <Link onClick={closeMobile} to={item.href}>
                      {({ isActive }) => (
                        <span
                          className={cn(
                            isActive ? 'font-medium' : 'text-muted-foreground',
                          )}
                        >
                          {item.label}
                        </span>
                      )}
                    </Link>
                  }
                />
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

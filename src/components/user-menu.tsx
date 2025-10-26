import { useLocation, useNavigate } from '@tanstack/react-router';
import { ChevronsUpDown, LogIn, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

import { useSession } from '@/components/session-provider';
import { type Theme, useTheme } from '@/components/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPositioner,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/lib/constants';
import { supabase } from '@/supabase/client';

export default function UserMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const session = useSession();
  const { isMobile, setOpenMobile } = useSidebar();
  const { setTheme, theme } = useTheme();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (pathname.startsWith(ROUTES_ADMIN.base.href)) {
      navigate({ to: ROUTE_HREF.TOP_ALBUMS });
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {session ? (
                  <>
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage
                        className="bg-gray-300"
                        src="/avatars/03.png"
                      />
                      <AvatarFallback className="rounded-lg">
                        {`${session.user.user_metadata.firstName[0]}${session.user.user_metadata.lastName[0]}`}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {session.user.user_metadata.name}
                      </span>
                      <span className="truncate text-xs">
                        {session.user.email}
                      </span>
                    </div>
                  </>
                ) : (
                  <Avatar className="flex size-8 items-center justify-center rounded-lg bg-muted">
                    <User className="size-5" />
                  </Avatar>
                )}
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuPositioner
            align="end"
            side={isMobile ? 'bottom' : 'right'}
          >
            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
              <DropdownMenuGroup>
                {session && (
                  <>
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="size-8 rounded-lg">
                          <AvatarImage
                            className="bg-gray-300"
                            src="/avatars/03.png"
                          />
                          <AvatarFallback className="rounded-lg">
                            {`${session.user.user_metadata.firstName[0]}${session.user.user_metadata.lastName[0]}`}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">
                            {session.user.user_metadata.name}
                          </span>
                          <span className="truncate text-xs">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  onValueChange={(t) => setTheme(t as Theme)}
                  value={theme}
                >
                  <DropdownMenuRadioItem closeOnClick value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem closeOnClick value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem closeOnClick value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              {session ? (
                <DropdownMenuItem onClick={signOut}>
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => {
                    setOpenMobile(false);
                    navigate({ to: ROUTE_HREF.SIGNIN });
                  }}
                >
                  <LogIn />
                  Sign in
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenuPositioner>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

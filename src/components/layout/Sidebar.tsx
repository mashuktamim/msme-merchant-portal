import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@/store/use-auth-store';
import type { Permission } from '@/types/auth';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronRight,
} from 'lucide-react';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

interface NavItem {
  title: string;
  to: string;
  icon: any;
  permissions?: Permission[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
    permissions: ['view:dashboard'],
  },
  {
    title: 'Posts',
    to: '/posts',
    icon: FileText,
    permissions: ['manage:posts'],
  },
  {
    title: 'Users',
    to: '/users',
    icon: Users,
    permissions: ['manage:users'],
  },
  {
    title: 'Settings',
    to: '/settings',
    icon: Settings,
    permissions: ['view:settings'],
  },
];

export function Sidebar() {
  const hasPermission = useAuthStore((state) => state.hasPermission);

  const filteredItems = navItems.filter((item) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some((p) => hasPermission(p));
  });

  return (
    <SidebarUI variant="inset" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-6">
        {/* Logo area - redundant with Navbar but good for collapsed state */}
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center w-full">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold">B</span>
          </div>
          <span className="font-bold truncate group-data-[collapsible=icon]:hidden">
            bKash MSME
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <Link
                      to={item.to}
                      activeProps={{
                        className: 'text-primary font-bold',
                      }}
                      className="flex items-center w-full"
                    >
                      <item.icon className="size-4" />
                      <span className="ml-3 group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      <ChevronRight className="ml-auto size-4 group-data-[collapsible=icon]:hidden opacity-50" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </SidebarUI>
  );
}

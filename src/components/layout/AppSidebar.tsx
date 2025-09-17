import { 
  Map, 
  FileText, 
  Clock, 
  Users, 
  BarChart3, 
  Settings,
  Shield
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Map View", 
    url: "/", 
    icon: Map,
    description: "Interactive map with all issues"
  },
  { 
    title: "Issues", 
    url: "/issues", 
    icon: FileText,
    description: "Manage all civic issues"
  },
  { 
    title: "Deadlines", 
    url: "/deadlines", 
    icon: Clock,
    description: "Track approaching deadlines"
  },
  { 
    title: "Departments", 
    url: "/departments", 
    icon: Users,
    description: "Department management"
  },
  { 
    title: "Analytics", 
    url: "/analytics", 
    icon: BarChart3,
    description: "Reports and insights"
  }
];

const systemItems = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    description: "System configuration"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-soft" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-[image:var(--sidebar-background-gradient)] border-r border-sidebar-border text-[var(--sidebar-foreground)]">


        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
  <div className="flex items-center space-x-2">
    {/* Replace Shield with your logo */}
    <div className="w-8 h-8 flex items-center justify-center">
      <img
        src="/logo.png"   // ✅ your logo file in public/
        alt="Nivaran Logo"
        className="w-8 h-8 object-contain"
      />
    </div>

    {!isCollapsed && (
      <div>
        <h1 className="font-bold text-lg text-sidebar-foreground">Nivaran</h1>
        <p className="text-xs text-sidebar-foreground/70">Issue Management</p>
      </div>
    )}
  </div>
</div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium px-6 py-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4 space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11 rounded-lg">
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium px-6 py-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4 space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11 rounded-lg">
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-2 text-xs text-sidebar-foreground/70">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
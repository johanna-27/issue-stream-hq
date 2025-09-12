import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shadow-soft">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="text-foreground hover:bg-accent rounded-lg" />
              <div className="hidden md:flex items-center space-x-2 max-w-md">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search issues, locations, or departments..." 
                  className="bg-muted/50 border-0 focus-visible:bg-background"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-urgent rounded-full"></div>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Admin User</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
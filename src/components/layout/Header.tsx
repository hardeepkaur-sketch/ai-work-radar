import { Bell, Settings, User, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";

interface HeaderProps {
  isMyDashboard: boolean;
  onToggleDashboard: (checked: boolean) => void;
}

const notifications = [
  { id: 1, title: "New PR assigned", description: "Feature/auth-module needs review", time: "2m ago", unread: true },
  { id: 2, title: "Jira ticket updated", description: "WORK-123 moved to In Progress", time: "15m ago", unread: true },
  { id: 3, title: "Sprint ending soon", description: "2 days remaining in Sprint 14", time: "1h ago", unread: false },
  { id: 4, title: "Slack mention", description: "@you in #dev-team", time: "2h ago", unread: false },
];

export function Header({ isMyDashboard, onToggleDashboard }: HeaderProps) {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AI WorkTracker" className="h-9 w-9" />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold text-foreground">AI WorkTracker</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Team Analytics</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-muted/50 rounded-full px-4 py-2">
            <Label htmlFor="dashboard-toggle" className="text-sm font-medium text-muted-foreground cursor-pointer">
              Team Insights
            </Label>
            <Switch
              id="dashboard-toggle"
              checked={isMyDashboard}
              onCheckedChange={onToggleDashboard}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="dashboard-toggle" className="text-sm font-medium text-muted-foreground cursor-pointer">
              My Dashboard
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-destructive text-destructive-foreground border-2 border-card">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80">
                    Mark all read
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                    <div className="flex items-center gap-2 w-full">
                      {notification.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                      <span className="font-medium text-sm flex-1">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <span className="text-xs text-muted-foreground pl-4">{notification.description}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary font-medium">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Sparkles className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>John Doe</span>
                    <span className="text-xs text-muted-foreground font-normal">john.doe@company.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

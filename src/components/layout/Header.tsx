import { useState } from "react";
import { Bell, User, Settings, Calendar, ChevronDown, LayoutGrid, LogOut } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const projects = [
  { id: "project-1", name: "Project 1" },
  { id: "project-2", name: "Project 2" },
  { id: "project-3", name: "Project 3" },
];

const dateFilters = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last-7-days", label: "Last 7 Days" },
  { value: "last-14-days", label: "Last 14 Days" },
  { value: "last-30-days", label: "Last 30 Days" },
  { value: "this-sprint", label: "This Sprint" },
];

export function Header({ isMyDashboard, onToggleDashboard }: HeaderProps) {
  const [selectedProject, setSelectedProject] = useState("project-1");
  const [selectedDate, setSelectedDate] = useState("today");
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side - Logo and Project Name */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AI Work Analytics" className="h-9 w-9" />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold text-foreground">AI Work Analytics</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Team Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Side - Controls */}
        <div className="flex items-center gap-4">
          {/* Dashboard Toggle */}
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

          {/* Project Filter */}
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[140px] h-9 bg-muted/50 border-0">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Customize Dashboard */}
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden lg:inline">Customize</span>
          </Button>

          {/* Date Filter */}
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[130px] h-9 bg-muted/50 border-0">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              {dateFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Notification Icon */}
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
            <DropdownMenuContent align="end" className="w-80 bg-card">
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

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border-2 border-primary/20">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>John Doe</span>
                  <span className="text-xs text-muted-foreground font-normal">john.doe@company.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

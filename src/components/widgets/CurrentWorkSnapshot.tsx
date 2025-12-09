import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, GitBranch, TicketCheck } from "lucide-react";

interface WorkItem {
  id: string;
  title: string;
  priority: "critical" | "high" | "medium" | "low";
  assignee: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status: string;
  lastUpdate: string;
}

interface CurrentWorkSnapshotProps {
  isPersonal?: boolean;
}

export function CurrentWorkSnapshot({ isPersonal = false }: CurrentWorkSnapshotProps) {
  const jiraItems: WorkItem[] = isPersonal
    ? [
        { id: "WORK-145", title: "Implement user authentication flow", priority: "high", assignee: { name: "You", initials: "JD" }, status: "In Progress", lastUpdate: "2h ago" },
        { id: "WORK-152", title: "Fix dashboard loading state", priority: "medium", assignee: { name: "You", initials: "JD" }, status: "In Review", lastUpdate: "4h ago" },
      ]
    : [
        { id: "WORK-142", title: "API rate limiting implementation", priority: "critical", assignee: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC" }, status: "In Progress", lastUpdate: "1h ago" },
        { id: "WORK-145", title: "User authentication flow", priority: "high", assignee: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD" }, status: "In Progress", lastUpdate: "2h ago" },
        { id: "WORK-148", title: "Dashboard performance optimization", priority: "high", assignee: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ" }, status: "Blocked", lastUpdate: "5h ago" },
        { id: "WORK-151", title: "Mobile responsive fixes", priority: "medium", assignee: { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", initials: "ED" }, status: "In Review", lastUpdate: "3h ago" },
      ];

  const prItems: WorkItem[] = isPersonal
    ? [
        { id: "#234", title: "feat: Add OAuth integration", priority: "high", assignee: { name: "You", initials: "JD" }, status: "Review Required", lastUpdate: "1h ago" },
      ]
    : [
        { id: "#234", title: "feat: Add OAuth integration", priority: "high", assignee: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD" }, status: "Review Required", lastUpdate: "1h ago" },
        { id: "#231", title: "fix: Memory leak in worker", priority: "critical", assignee: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC" }, status: "Changes Requested", lastUpdate: "4h ago" },
        { id: "#228", title: "refactor: Database queries", priority: "medium", assignee: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ" }, status: "Approved", lastUpdate: "6h ago" },
      ];

  const priorityClasses = {
    critical: "priority-critical",
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };

  const WorkItemRow = ({ item }: { item: WorkItem }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer">
      <Avatar className="h-8 w-8 border border-border">
        <AvatarImage src={item.assignee.avatar} />
        <AvatarFallback className="text-xs bg-primary/10 text-primary">{item.assignee.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${priorityClasses[item.priority]}`}>
            {item.priority}
          </Badge>
        </div>
        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {item.title}
        </p>
      </div>
      <div className="text-right">
        <Badge variant="secondary" className="text-[10px] mb-1">{item.status}</Badge>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {item.lastUpdate}
        </div>
      </div>
    </div>
  );

  return (
    <div className="widget animate-fade-in stagger-4">
      <h2 className="widget-title">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-subtle" />
        {isPersonal ? "My Work Snapshot" : "Current Work Snapshot"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TicketCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Jira Items</span>
            <Badge variant="secondary" className="text-[10px]">{jiraItems.length}</Badge>
          </div>
          <div className="space-y-1">
            {jiraItems.map((item) => (
              <WorkItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <GitBranch className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-foreground">GitHub PR/Commits</span>
            <Badge variant="secondary" className="text-[10px]">{prItems.length}</Badge>
          </div>
          <div className="space-y-1">
            {prItems.map((item) => (
              <WorkItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

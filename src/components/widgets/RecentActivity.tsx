import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GitCommit, GitPullRequest, TicketCheck, MessageSquare, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "commit" | "pr" | "jira" | "comment";
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  time: string;
}

interface RecentActivityProps {
  isPersonal?: boolean;
}

export function RecentActivity({ isPersonal = false }: RecentActivityProps) {
  const activities: Activity[] = isPersonal
    ? [
        { id: "1", type: "commit", user: { name: "You", initials: "JD" }, action: "pushed", target: "3 commits to feature/auth", time: "2m ago" },
        { id: "2", type: "pr", user: { name: "You", initials: "JD" }, action: "opened PR", target: "#234: OAuth integration", time: "1h ago" },
        { id: "3", type: "jira", user: { name: "You", initials: "JD" }, action: "moved", target: "WORK-145 to In Progress", time: "2h ago" },
        { id: "4", type: "comment", user: { name: "You", initials: "JD" }, action: "commented on", target: "PR #231", time: "3h ago" },
      ]
    : [
        { id: "1", type: "commit", user: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC" }, action: "pushed", target: "5 commits to main", time: "5m ago" },
        { id: "2", type: "pr", user: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD" }, action: "opened PR", target: "#234: OAuth integration", time: "1h ago" },
        { id: "3", type: "jira", user: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ" }, action: "resolved", target: "WORK-139: API fix", time: "2h ago" },
        { id: "4", type: "pr", user: { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", initials: "ED" }, action: "approved", target: "PR #228", time: "3h ago" },
        { id: "5", type: "comment", user: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", initials: "AR" }, action: "commented on", target: "WORK-142", time: "4h ago" },
      ];

  const typeConfig = {
    commit: { icon: GitCommit, color: "text-success", bg: "bg-success/10" },
    pr: { icon: GitPullRequest, color: "text-primary", bg: "bg-primary/10" },
    jira: { icon: TicketCheck, color: "text-warning", bg: "bg-warning/10" },
    comment: { icon: MessageSquare, color: "text-muted-foreground", bg: "bg-muted" },
  };

  return (
    <div className="widget animate-fade-in stagger-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <Clock className="h-4 w-4 text-primary" />
          {isPersonal ? "My Recent Activity" : "Recent Activity"}
        </h2>
        <Badge variant="outline" className="text-[10px]">
          Last 24h
        </Badge>
      </div>

      <div className="space-y-1">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div 
              key={activity.id} 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">{activity.user.initials}</AvatarFallback>
              </Avatar>

              <div className={`p-1.5 rounded-md ${config.bg}`}>
                <Icon className={`h-3.5 w-3.5 ${config.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium text-primary group-hover:underline">{activity.target}</span>
                </p>
              </div>

              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-3 py-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
        View all activity →
      </button>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  load: number;
  capacity: number;
  status: "online" | "away" | "offline";
}

export function WorkloadDistribution() {
  const teamMembers: TeamMember[] = [
    { id: "1", name: "Sarah Chen", role: "Senior Frontend", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC", load: 95, capacity: 40, status: "online" },
    { id: "2", name: "John Doe", role: "Full Stack Dev", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD", load: 78, capacity: 40, status: "online" },
    { id: "3", name: "Mike Johnson", role: "Backend Dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ", load: 110, capacity: 40, status: "away" },
    { id: "4", name: "Emily Davis", role: "UI/UX Dev", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", initials: "ED", load: 65, capacity: 40, status: "online" },
    { id: "5", name: "Alex Rivera", role: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", initials: "AR", load: 45, capacity: 40, status: "offline" },
  ];

  const getLoadColor = (load: number) => {
    if (load >= 100) return "bg-destructive";
    if (load >= 80) return "bg-warning";
    return "bg-success";
  };

  const getLoadTextColor = (load: number) => {
    if (load >= 100) return "text-destructive";
    if (load >= 80) return "text-warning";
    return "text-success";
  };

  const statusColors = {
    online: "bg-success",
    away: "bg-warning",
    offline: "bg-muted-foreground/40",
  };

  const overloadedCount = teamMembers.filter((m) => m.load >= 100).length;

  return (
    <div className="widget animate-fade-in stagger-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <Users className="h-4 w-4 text-primary" />
          Workload Distribution
        </h2>
        {overloadedCount > 0 && (
          <Badge variant="outline" className="text-[10px] gap-1 priority-high">
            <AlertTriangle className="h-3 w-3" />
            {overloadedCount} overloaded
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="relative">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">{member.initials}</AvatarFallback>
              </Avatar>
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusColors[member.status]}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-sm font-medium text-foreground">{member.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{member.role}</span>
                </div>
                <span className={`text-sm font-semibold ${getLoadTextColor(member.load)}`}>
                  {member.load}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={Math.min(member.load, 100)} 
                  className="h-2 flex-1" 
                  style={{ 
                    ['--progress-background' as string]: member.load >= 100 
                      ? 'hsl(var(--destructive))' 
                      : member.load >= 80 
                      ? 'hsl(var(--warning))' 
                      : 'hsl(var(--success))' 
                  }}
                />
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {member.capacity}h/wk
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
        <span className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">AI Suggestion:</span> Consider redistributing 2 tasks from Mike to Emily to balance the team workload.
        </span>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, TicketCheck, GitPullRequest, Flame } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  assignedPoints: number;
  avgPoints: number; // Last 3 sprints avg
  activeJira: number;
  highPriorityTickets: number;
  prsAwaitingReview: number;
}

export function WorkloadDistribution() {
  const teamMembers: TeamMember[] = [
    { id: "1", name: "Sarah Chen", role: "Senior Frontend", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC", assignedPoints: 18, avgPoints: 15, activeJira: 4, highPriorityTickets: 2, prsAwaitingReview: 1 },
    { id: "2", name: "John Doe", role: "Full Stack Dev", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD", assignedPoints: 14, avgPoints: 14, activeJira: 3, highPriorityTickets: 1, prsAwaitingReview: 2 },
    { id: "3", name: "Mike Johnson", role: "Backend Dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ", assignedPoints: 21, avgPoints: 16, activeJira: 5, highPriorityTickets: 3, prsAwaitingReview: 0 },
    { id: "4", name: "Emily Davis", role: "UI/UX Dev", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", initials: "ED", assignedPoints: 10, avgPoints: 12, activeJira: 2, highPriorityTickets: 0, prsAwaitingReview: 1 },
    { id: "5", name: "Alex Rivera", role: "DevOps Engineer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", initials: "AR", assignedPoints: 8, avgPoints: 10, activeJira: 2, highPriorityTickets: 1, prsAwaitingReview: 0 },
  ];

  const getLoadBadge = (assignedPoints: number, avgPoints: number) => {
    const ratio = assignedPoints / avgPoints;
    if (ratio >= 1.3) return { label: "Overloaded", color: "bg-destructive text-destructive-foreground" };
    if (ratio >= 1.1) return { label: "High", color: "bg-warning text-warning-foreground" };
    return { label: "Balanced", color: "bg-success text-success-foreground" };
  };

  const overloadedCount = teamMembers.filter((m) => m.assignedPoints / m.avgPoints >= 1.3).length;

  return (
    <div className="widget animate-fade-in stagger-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <Users className="h-4 w-4 text-primary" />
          Sprint Load Overview
        </h2>
        <div className="flex items-center gap-2">
          {overloadedCount > 0 && (
            <Badge variant="outline" className="text-[10px] gap-1 priority-high">
              <AlertTriangle className="h-3 w-3" />
              {overloadedCount} Overloaded
            </Badge>
          )}
          <Badge variant="outline" className="text-[10px]">Today</Badge>
        </div>
      </div>

      {/* Sprint Load Overview */}
      <div className="space-y-3 mb-6">
        {teamMembers.map((member) => {
          const loadBadge = getLoadBadge(member.assignedPoints, member.avgPoints);
          return (
            <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">{member.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="text-sm font-medium text-foreground">{member.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{member.role}</span>
                  </div>
                  <Badge className={`text-[10px] ${loadBadge.color}`}>
                    {loadBadge.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span><strong className="text-foreground">{member.assignedPoints}</strong> pts assigned</span>
                  <span>Avg: {member.avgPoints} pts (last 3 sprints)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Focus & Bottlenecks (Today) */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Flame className="h-4 w-4 text-warning" />
          Focus & Bottlenecks (Today)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {teamMembers.slice(0, 3).map((member) => (
            <div key={member.id} className="p-3 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-[10px]">{member.initials}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-foreground truncate">{member.name}</span>
              </div>
              <div className="space-y-1 text-[10px] text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><TicketCheck className="h-3 w-3" /> Active Jira</span>
                  <span className="font-medium text-foreground">{member.activeJira}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-warning" /> High Priority</span>
                  <span className="font-medium text-foreground">{member.highPriorityTickets}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><GitPullRequest className="h-3 w-3" /> PRs Awaiting</span>
                  <span className="font-medium text-foreground">{member.prsAwaitingReview}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-primary mt-0.5" />
        <span className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">AI Suggestion:</span> Mike is overloaded with 21 pts (avg 16). Consider reassigning 1-2 tasks to Emily who has capacity.
        </span>
      </div>
    </div>
  );
}

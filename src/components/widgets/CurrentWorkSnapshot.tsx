import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, GitBranch, GitCommit, TicketCheck, ExternalLink, CheckCircle, XCircle, MessageSquare, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface JiraItem {
  id: string;
  title: string;
  status: "To-Do" | "In-Progress" | "Dev Done" | "Ready for Testing" | "QA Verified" | "Production";
  priority: "critical" | "high" | "medium" | "low";
  assignee: { name: string; avatar?: string; initials: string };
  storyPoints: number;
  prLinked: boolean;
  commitCount: number;
  lastActivity: string;
}

interface PRItem {
  id: string;
  title: string;
  status: "Open" | "Review Required" | "Changes Requested" | "Approved" | "Merged";
  author: { name: string; avatar?: string; initials: string };
  reviewers: { name: string; initials: string }[];
  jiraTicket: string;
  createdDate: string;
  reviewsPending: number;
  commentCount: number;
  ciStatus: "passed" | "failed" | "running";
  waitingDuration: string;
}

interface CommitItem {
  id: string;
  message: string;
  timestamp: string;
  author: { name: string; avatar?: string; initials: string };
  jiraTicket?: string;
  branch: string;
  prLinked: boolean;
  ciStatus: "passed" | "failed" | "running";
  cdStatus: "deployed" | "pending" | "failed";
  commitType: "Feature" | "Bugfix" | "Refactor" | "Test";
  messageQuality: "Clear" | "Needs Improvement";
}

interface CurrentWorkSnapshotProps {
  isPersonal?: boolean;
}

export function CurrentWorkSnapshot({ isPersonal = false }: CurrentWorkSnapshotProps) {
  const [jiraModalOpen, setJiraModalOpen] = useState(false);
  const [prModalOpen, setPrModalOpen] = useState(false);
  const [commitModalOpen, setCommitModalOpen] = useState(false);

  const jiraItems: JiraItem[] = isPersonal
    ? [
        { id: "WORK-145", title: "Implement user authentication flow", status: "In-Progress", priority: "high", assignee: { name: "You", initials: "JD" }, storyPoints: 5, prLinked: true, commitCount: 3, lastActivity: "2h ago" },
        { id: "WORK-152", title: "Fix dashboard loading state", status: "Dev Done", priority: "medium", assignee: { name: "You", initials: "JD" }, storyPoints: 3, prLinked: true, commitCount: 2, lastActivity: "4h ago" },
      ]
    : [
        { id: "WORK-142", title: "API rate limiting implementation", status: "In-Progress", priority: "critical", assignee: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC" }, storyPoints: 8, prLinked: false, commitCount: 5, lastActivity: "1h ago" },
        { id: "WORK-145", title: "User authentication flow", status: "In-Progress", priority: "high", assignee: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD" }, storyPoints: 5, prLinked: true, commitCount: 3, lastActivity: "2h ago" },
        { id: "WORK-148", title: "Dashboard performance optimization", status: "To-Do", priority: "high", assignee: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ" }, storyPoints: 5, prLinked: false, commitCount: 0, lastActivity: "5h ago" },
      ];

  const prItems: PRItem[] = isPersonal
    ? [
        { id: "#234", title: "feat: Add OAuth integration", status: "Review Required", author: { name: "You", initials: "JD" }, reviewers: [{ name: "Sarah", initials: "SC" }], jiraTicket: "WORK-145", createdDate: "2 days ago", reviewsPending: 1, commentCount: 3, ciStatus: "passed", waitingDuration: "4h" },
      ]
    : [
        { id: "#234", title: "feat: Add OAuth integration", status: "Review Required", author: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD" }, reviewers: [{ name: "Sarah", initials: "SC" }], jiraTicket: "WORK-145", createdDate: "2 days ago", reviewsPending: 1, commentCount: 3, ciStatus: "passed", waitingDuration: "4h" },
        { id: "#231", title: "fix: Memory leak in worker", status: "Changes Requested", author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC" }, reviewers: [{ name: "Mike", initials: "MJ" }], jiraTicket: "WORK-140", createdDate: "3 days ago", reviewsPending: 0, commentCount: 8, ciStatus: "passed", waitingDuration: "2d" },
        { id: "#228", title: "refactor: Database queries", status: "Approved", author: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ" }, reviewers: [{ name: "Sarah", initials: "SC" }], jiraTicket: "WORK-138", createdDate: "4 days ago", reviewsPending: 0, commentCount: 5, ciStatus: "passed", waitingDuration: "1d" },
      ];

  const commitItems: CommitItem[] = isPersonal
    ? [
        { id: "a1b2c3d", message: "feat: implement OAuth token refresh", timestamp: "1h ago", author: { name: "You", initials: "JD" }, jiraTicket: "WORK-145", branch: "feature/oauth", prLinked: true, ciStatus: "passed", cdStatus: "pending", commitType: "Feature", messageQuality: "Clear" },
        { id: "e4f5g6h", message: "fix: resolve login redirect issue", timestamp: "3h ago", author: { name: "You", initials: "JD" }, jiraTicket: "WORK-145", branch: "feature/oauth", prLinked: true, ciStatus: "passed", cdStatus: "deployed", commitType: "Bugfix", messageQuality: "Clear" },
      ]
    : [
        { id: "a1b2c3d", message: "feat: implement OAuth token refresh", timestamp: "1h ago", author: { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", initials: "JD" }, jiraTicket: "WORK-145", branch: "feature/oauth", prLinked: true, ciStatus: "passed", cdStatus: "pending", commitType: "Feature", messageQuality: "Clear" },
        { id: "i7j8k9l", message: "fix memory issue", timestamp: "2h ago", author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", initials: "SC" }, jiraTicket: "WORK-140", branch: "fix/memory-leak", prLinked: true, ciStatus: "running", cdStatus: "pending", commitType: "Bugfix", messageQuality: "Needs Improvement" },
        { id: "m0n1o2p", message: "refactor: optimize query performance", timestamp: "4h ago", author: { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", initials: "MJ" }, jiraTicket: "WORK-138", branch: "refactor/db-queries", prLinked: true, ciStatus: "passed", cdStatus: "deployed", commitType: "Refactor", messageQuality: "Clear" },
      ];

  const priorityClasses = {
    critical: "priority-critical",
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };

  const statusColors: Record<string, string> = {
    "To-Do": "bg-muted text-muted-foreground",
    "In-Progress": "bg-primary/10 text-primary",
    "Dev Done": "bg-success/10 text-success",
    "Ready for Testing": "bg-warning/10 text-warning",
    "QA Verified": "bg-success/10 text-success",
    "Production": "bg-success text-success-foreground",
    "Open": "bg-muted text-muted-foreground",
    "Review Required": "bg-warning/10 text-warning",
    "Changes Requested": "bg-destructive/10 text-destructive",
    "Approved": "bg-success/10 text-success",
    "Merged": "bg-success text-success-foreground",
  };

  const ciStatusIcon = (status: string) => {
    if (status === "passed") return <CheckCircle className="h-3 w-3 text-success" />;
    if (status === "failed") return <XCircle className="h-3 w-3 text-destructive" />;
    return <Clock className="h-3 w-3 text-warning animate-spin" />;
  };

  return (
    <div className="widget animate-fade-in stagger-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-subtle" />
          {isPersonal ? "My Work Snapshot" : "Current Work Snapshot"}
        </h2>
        <Badge variant="outline" className="text-[10px]">Today</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Jira Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TicketCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Jira Items</span>
              <Badge variant="secondary" className="text-[10px]">{jiraItems.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary h-6 px-2" onClick={() => setJiraModalOpen(true)}>
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {jiraItems.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${priorityClasses[item.priority]}`}>
                    {item.priority}
                  </Badge>
                  <Badge className={`text-[10px] px-1.5 py-0 ${statusColors[item.status]}`}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground truncate mb-2">{item.title}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={item.assignee.avatar} />
                      <AvatarFallback className="text-[8px]">{item.assignee.initials}</AvatarFallback>
                    </Avatar>
                    <span>{item.storyPoints} pts</span>
                    <span>•</span>
                    <span>{item.commitCount} commits</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.prLinked ? <GitBranch className="h-3 w-3 text-success" /> : <GitBranch className="h-3 w-3 text-muted-foreground" />}
                    <Clock className="h-3 w-3" />
                    <span>{item.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PR Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-foreground">Pull Requests</span>
              <Badge variant="secondary" className="text-[10px]">{prItems.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary h-6 px-2" onClick={() => setPrModalOpen(true)}>
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {prItems.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                  <Badge className={`text-[10px] px-1.5 py-0 ${statusColors[item.status]}`}>
                    {item.status}
                  </Badge>
                  {ciStatusIcon(item.ciStatus)}
                </div>
                <p className="text-sm font-medium text-foreground truncate mb-2 group-hover:text-primary transition-colors">{item.title}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={item.author.avatar} />
                      <AvatarFallback className="text-[8px]">{item.author.initials}</AvatarFallback>
                    </Avatar>
                    <span>{item.jiraTicket}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3 w-3" />
                    <span>{item.commentCount}</span>
                    <Eye className="h-3 w-3" />
                    <span>{item.reviewsPending}</span>
                    <Clock className="h-3 w-3" />
                    <span>{item.waitingDuration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commit Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium text-foreground">Commits</span>
              <Badge variant="secondary" className="text-[10px]">{commitItems.length}</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary h-6 px-2" onClick={() => setCommitModalOpen(true)}>
              View All
            </Button>
          </div>
          <div className="space-y-2">
            {commitItems.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-primary">{item.id.slice(0, 7)}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{item.commitType}</Badge>
                  {ciStatusIcon(item.ciStatus)}
                  <Badge className={`text-[10px] px-1.5 py-0 ${item.cdStatus === "deployed" ? "bg-success/10 text-success" : item.cdStatus === "failed" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                    {item.cdStatus}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground truncate mb-2">{item.message}</p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={item.author.avatar} />
                      <AvatarFallback className="text-[8px]">{item.author.initials}</AvatarFallback>
                    </Avatar>
                    <span>{item.branch}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.jiraTicket && <span>{item.jiraTicket}</span>}
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
                {item.messageQuality === "Needs Improvement" && (
                  <div className="mt-2 text-[10px] text-warning">⚠ Message quality: Needs Improvement</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jira Modal */}
      <Dialog open={jiraModalOpen} onOpenChange={setJiraModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TicketCheck className="h-5 w-5 text-primary" />
              All Jira Items
              <Badge variant="outline" className="text-xs">Today</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {jiraItems.map((item) => (
              <div key={item.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                  <Badge variant="outline" className={`text-xs ${priorityClasses[item.priority]}`}>{item.priority}</Badge>
                  <Badge className={`text-xs ${statusColors[item.status]}`}>{item.status}</Badge>
                </div>
                <p className="font-medium text-foreground mb-2">{item.title}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6"><AvatarImage src={item.assignee.avatar} /><AvatarFallback className="text-xs">{item.assignee.initials}</AvatarFallback></Avatar>
                    <span>{item.assignee.name}</span>
                  </div>
                  <span>{item.storyPoints} story points</span>
                  <span>{item.commitCount} commits</span>
                  <span>{item.prLinked ? "PR linked" : "No PR"}</span>
                  <span>Last activity: {item.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* PR Modal */}
      <Dialog open={prModalOpen} onOpenChange={setPrModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-success" />
              All Pull Requests
              <Badge variant="outline" className="text-xs">Today</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {prItems.map((item) => (
              <div key={item.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                  <Badge className={`text-xs ${statusColors[item.status]}`}>{item.status}</Badge>
                  {ciStatusIcon(item.ciStatus)}
                </div>
                <p className="font-medium text-foreground mb-2">{item.title}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6"><AvatarImage src={item.author.avatar} /><AvatarFallback className="text-xs">{item.author.initials}</AvatarFallback></Avatar>
                    <span>{item.author.name}</span>
                  </div>
                  <span>{item.jiraTicket}</span>
                  <span>{item.commentCount} comments</span>
                  <span>{item.reviewsPending} reviews pending</span>
                  <span>Waiting: {item.waitingDuration}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Commit Modal */}
      <Dialog open={commitModalOpen} onOpenChange={setCommitModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCommit className="h-5 w-5 text-warning" />
              All Commits
              <Badge variant="outline" className="text-xs">Today</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {commitItems.map((item) => (
              <div key={item.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-primary">{item.id}</span>
                  <Badge variant="outline" className="text-xs">{item.commitType}</Badge>
                  {ciStatusIcon(item.ciStatus)}
                  <Badge className={`text-xs ${item.cdStatus === "deployed" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{item.cdStatus}</Badge>
                </div>
                <p className="font-medium text-foreground mb-2">{item.message}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6"><AvatarImage src={item.author.avatar} /><AvatarFallback className="text-xs">{item.author.initials}</AvatarFallback></Avatar>
                    <span>{item.author.name}</span>
                  </div>
                  <span>{item.branch}</span>
                  {item.jiraTicket && <span>{item.jiraTicket}</span>}
                  <span>{item.prLinked ? "PR linked" : "No PR"}</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

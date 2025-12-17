import { useState } from "react";
import { TicketCheck, GitPullRequest, AlertTriangle, AlertOctagon, GitCommit, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  colorClass: string;
  timeBadge: string;
  onViewAll: () => void;
}

function MetricCard({ icon, label, value, change, changeLabel, colorClass, timeBadge, onViewAll }: MetricCardProps) {
  const isPositive = change >= 0;
  const isNegativeGood = label.includes("Inactive") || label.includes("Incidents");
  const showPositiveColor = isNegativeGood ? !isPositive : isPositive;
  
  return (
    <div className="metric-card group cursor-pointer" onClick={onViewAll}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colorClass} transition-transform group-hover:scale-105`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[9px] px-1.5 py-0">{timeBadge}</Badge>
          <div className={`flex items-center gap-1 text-xs font-medium ${showPositiveColor ? 'trend-up' : 'trend-down'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
        </div>
      </div>
      <div className="stat-value text-foreground">{value}</div>
      <div className="stat-label mt-1">{label}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-muted-foreground">{changeLabel}</span>
        <Button variant="ghost" size="sm" className="text-[10px] text-primary h-5 px-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          View All <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}

interface TeamMetricsSummaryProps {
  isPersonal?: boolean;
}

export function TeamMetricsSummary({ isPersonal = false }: TeamMetricsSummaryProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const prefix = isPersonal ? "My " : "Total ";
  
  const metrics = [
    {
      id: "jira",
      icon: <TicketCheck className="h-5 w-5 text-primary" />,
      label: `${prefix}Jira Tickets (Sprint)`,
      value: isPersonal ? 12 : 156,
      change: 12,
      changeLabel: "vs last sprint",
      colorClass: "bg-primary/10",
      timeBadge: "Today",
    },
    {
      id: "inactive",
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      label: "High Priority – No Recent Activity",
      value: isPersonal ? 2 : 8,
      change: -15,
      changeLabel: "No updates in 3+ days",
      colorClass: "bg-warning/10",
      timeBadge: "Today",
    },
    {
      id: "commits",
      icon: <GitCommit className="h-5 w-5 text-success" />,
      label: `${prefix}Commits`,
      value: isPersonal ? 18 : 234,
      change: 8,
      changeLabel: "vs last sprint",
      colorClass: "bg-success/10",
      timeBadge: "Today",
    },
    {
      id: "prs",
      icon: <GitPullRequest className="h-5 w-5 text-primary" />,
      label: `${prefix}PRs`,
      value: isPersonal ? 5 : 48,
      change: 15,
      changeLabel: "vs last sprint",
      colorClass: "bg-primary/10",
      timeBadge: "Today",
    },
    {
      id: "incidents",
      icon: <AlertOctagon className="h-5 w-5 text-destructive" />,
      label: `${prefix}Incidents`,
      value: isPersonal ? 1 : 3,
      change: -25,
      changeLabel: "vs last week",
      colorClass: "bg-destructive/10",
      timeBadge: "Today",
    },
  ];

  const modalContent: Record<string, { title: string; items: { label: string; value: string; status: string }[] }> = {
    jira: {
      title: "Jira Tickets (Sprint)",
      items: [
        { label: "WORK-142", value: "API rate limiting implementation", status: "In Progress" },
        { label: "WORK-145", value: "User authentication flow", status: "In Progress" },
        { label: "WORK-148", value: "Dashboard performance optimization", status: "To-Do" },
        { label: "WORK-151", value: "Mobile responsive fixes", status: "In Review" },
      ],
    },
    inactive: {
      title: "High Priority – No Recent Activity",
      items: [
        { label: "WORK-148", value: "Dashboard performance optimization", status: "5 days inactive" },
        { label: "WORK-135", value: "Payment gateway integration", status: "4 days inactive" },
      ],
    },
    commits: {
      title: "Commits",
      items: [
        { label: "a1b2c3d", value: "feat: implement OAuth token refresh", status: "1h ago" },
        { label: "e4f5g6h", value: "fix: resolve login redirect issue", status: "3h ago" },
        { label: "i7j8k9l", value: "refactor: database queries", status: "5h ago" },
      ],
    },
    prs: {
      title: "Pull Requests",
      items: [
        { label: "#234", value: "feat: Add OAuth integration", status: "Review Required" },
        { label: "#231", value: "fix: Memory leak in worker", status: "Changes Requested" },
        { label: "#228", value: "refactor: Database queries", status: "Approved" },
      ],
    },
    incidents: {
      title: "Incidents",
      items: [
        { label: "INC-045", value: "Production API latency spike", status: "Resolved" },
        { label: "INC-044", value: "Database connection timeout", status: "Monitoring" },
      ],
    },
  };

  return (
    <div className="widget animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />
          {isPersonal ? "My Metrics Summary" : "Team Metrics Summary"}
        </h2>
        <Badge variant="outline" className="text-[10px]">Today</Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <MetricCard 
            key={metric.id} 
            {...metric} 
            onViewAll={() => setActiveModal(metric.id)}
          />
        ))}
      </div>

      {/* View All Modal */}
      <Dialog open={!!activeModal} onOpenChange={() => setActiveModal(null)}>
        <DialogContent className="max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeModal && modalContent[activeModal]?.title}
              <Badge variant="outline" className="text-xs">Today</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-auto">
            {activeModal && modalContent[activeModal]?.items.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted-foreground">{item.label}</span>
                  <Badge variant="secondary" className="text-xs">{item.status}</Badge>
                </div>
                <p className="text-sm font-medium text-foreground mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

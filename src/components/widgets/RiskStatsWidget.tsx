import { useState } from "react";
import { AlertCircle, Clock, Flame, GitPullRequest, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RiskCardProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: number;
  severity: "critical" | "high" | "medium" | "low";
  trend: "up" | "down";
  trendValue: number;
  timeBadge: string;
  onViewAll: () => void;
}

function RiskCard({ icon, label, description, value, severity, trend, trendValue, timeBadge, onViewAll }: RiskCardProps) {
  const severityClasses = {
    critical: "bg-destructive/10 border-destructive/20 text-destructive",
    high: "bg-warning/10 border-warning/20 text-warning",
    medium: "bg-primary/10 border-primary/20 text-primary",
    low: "bg-success/10 border-success/20 text-success",
  };

  const iconBgClasses = {
    critical: "bg-destructive text-destructive-foreground",
    high: "bg-warning text-warning-foreground",
    medium: "bg-primary text-primary-foreground",
    low: "bg-success text-success-foreground",
  };

  return (
    <div className={`metric-card border ${severityClasses[severity]} cursor-pointer group`} onClick={onViewAll}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconBgClasses[severity]}`}>
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-card">{timeBadge}</Badge>
          <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'down' ? 'text-success' : 'text-destructive'}`}>
            {trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
            <span>{trendValue}%</span>
          </div>
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label mt-1">{label}</div>
      <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{description}</p>
      <Button variant="ghost" size="sm" className="text-[10px] text-primary h-5 px-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        View All <ExternalLink className="h-3 w-3 ml-1" />
      </Button>
    </div>
  );
}

interface RiskStatsWidgetProps {
  isPersonal?: boolean;
}

export function RiskStatsWidget({ isPersonal = false }: RiskStatsWidgetProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const riskData = [
    {
      id: "at-risk",
      icon: <AlertCircle className="h-4 w-4" />,
      label: "At-Risk Jira",
      description: "Tickets where work is expected but no activity for X days",
      value: isPersonal ? 2 : 12,
      severity: "critical" as const,
      trend: "down" as const,
      trendValue: 8,
      timeBadge: "Today",
    },
    {
      id: "past-due",
      icon: <Clock className="h-4 w-4" />,
      label: "High Priority – Past Due",
      description: "High-priority tickets that crossed expected timeline",
      value: isPersonal ? 1 : 5,
      severity: "high" as const,
      trend: "down" as const,
      trendValue: 15,
      timeBadge: "Today",
    },
    {
      id: "prs-stuck",
      icon: <GitPullRequest className="h-4 w-4" />,
      label: "PRs Stuck",
      description: "PRs waiting for review > threshold with no review activity",
      value: isPersonal ? 1 : 7,
      severity: "high" as const,
      trend: "up" as const,
      trendValue: 12,
      timeBadge: "Today",
    },
    {
      id: "incidents",
      icon: <Flame className="h-4 w-4" />,
      label: "Critical Incidents",
      description: "Active production incidents requiring immediate attention",
      value: isPersonal ? 0 : 2,
      severity: "critical" as const,
      trend: "down" as const,
      trendValue: 33,
      timeBadge: "Today",
    },
  ];

  const modalContent: Record<string, { title: string; items: { id: string; title: string; status: string; severity: string }[] }> = {
    "at-risk": {
      title: "At-Risk Jira Tickets",
      items: [
        { id: "WORK-148", title: "Dashboard performance optimization", status: "5 days no activity", severity: "critical" },
        { id: "WORK-135", title: "Payment gateway integration", status: "4 days no activity", severity: "high" },
        { id: "WORK-128", title: "User profile redesign", status: "3 days no activity", severity: "medium" },
      ],
    },
    "past-due": {
      title: "High Priority – Past Due",
      items: [
        { id: "WORK-130", title: "Security vulnerability patch", status: "2 days overdue", severity: "critical" },
        { id: "WORK-125", title: "API response optimization", status: "1 day overdue", severity: "high" },
      ],
    },
    "prs-stuck": {
      title: "PRs Stuck in Review",
      items: [
        { id: "#231", title: "fix: Memory leak in worker", status: "Waiting 2 days", severity: "high" },
        { id: "#225", title: "feat: Analytics dashboard", status: "Waiting 3 days", severity: "critical" },
        { id: "#220", title: "refactor: Auth module", status: "Waiting 2 days", severity: "medium" },
      ],
    },
    incidents: {
      title: "Critical Incidents",
      items: [
        { id: "INC-046", title: "Production API latency spike", status: "Active", severity: "critical" },
        { id: "INC-045", title: "Database connection timeout", status: "Monitoring", severity: "high" },
      ],
    },
  };

  return (
    <div className="widget animate-fade-in stagger-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-subtle" />
          {isPersonal ? "My Risk Stats" : "Risk Stats Overview"}
        </h2>
        <Badge variant="outline" className="text-[10px]">Today</Badge>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {riskData.map((risk) => (
          <RiskCard 
            key={risk.id} 
            {...risk} 
            onViewAll={() => setActiveModal(risk.id)}
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
                  <span className="text-sm font-mono text-muted-foreground">{item.id}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{item.status}</Badge>
                    <Badge variant="outline" className={`text-xs ${
                      item.severity === 'critical' ? 'priority-critical' : 
                      item.severity === 'high' ? 'priority-high' : 'priority-medium'
                    }`}>{item.severity}</Badge>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mt-1">{item.title}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { TicketCheck, GitPullRequest, AlertTriangle, AlertOctagon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  colorClass: string;
}

function MetricCard({ icon, label, value, change, changeLabel, colorClass }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colorClass} transition-transform group-hover:scale-105`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'trend-up' : 'trend-down'}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      <div className="stat-value text-foreground">{value}</div>
      <div className="stat-label mt-1">{label}</div>
      <div className="text-[10px] text-muted-foreground mt-2">{changeLabel}</div>
    </div>
  );
}

interface TeamMetricsSummaryProps {
  isPersonal?: boolean;
}

export function TeamMetricsSummary({ isPersonal = false }: TeamMetricsSummaryProps) {
  const prefix = isPersonal ? "My " : "Total ";
  
  const metrics = [
    {
      icon: <TicketCheck className="h-5 w-5 text-primary" />,
      label: `${prefix}Jira Tickets`,
      value: isPersonal ? 12 : 156,
      change: 12,
      changeLabel: "vs last sprint",
      colorClass: "bg-primary/10",
    },
    {
      icon: <GitPullRequest className="h-5 w-5 text-success" />,
      label: "Commits & PRs",
      value: isPersonal ? 28 : 342,
      change: 8,
      changeLabel: "vs last sprint",
      colorClass: "bg-success/10",
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      label: "High Priority Inactive",
      value: isPersonal ? 2 : 8,
      change: -15,
      changeLabel: "improvement",
      colorClass: "bg-warning/10",
    },
    {
      icon: <AlertOctagon className="h-5 w-5 text-destructive" />,
      label: `${prefix}Incidents`,
      value: isPersonal ? 1 : 3,
      change: -25,
      changeLabel: "vs last week",
      colorClass: "bg-destructive/10",
    },
  ];

  return (
    <div className="widget animate-fade-in">
      <h2 className="widget-title">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" />
        {isPersonal ? "My Metrics Summary" : "Team Metrics Summary"}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
}

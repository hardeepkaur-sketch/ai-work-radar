import { AlertCircle, Clock, Flame, GitPullRequest, TrendingUp, TrendingDown } from "lucide-react";

interface RiskCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  severity: "critical" | "high" | "medium" | "low";
  trend: "up" | "down";
  trendValue: number;
}

function RiskCard({ icon, label, value, severity, trend, trendValue }: RiskCardProps) {
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
    <div className={`metric-card border ${severityClasses[severity]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconBgClasses[severity]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'down' ? 'text-success' : 'text-destructive'}`}>
          {trend === 'down' ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
          <span>{trendValue}%</span>
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label mt-1">{label}</div>
    </div>
  );
}

interface RiskStatsWidgetProps {
  isPersonal?: boolean;
}

export function RiskStatsWidget({ isPersonal = false }: RiskStatsWidgetProps) {
  const riskData = [
    {
      icon: <AlertCircle className="h-4 w-4" />,
      label: "At-Risk Jira",
      value: isPersonal ? 2 : 12,
      severity: "critical" as const,
      trend: "down" as const,
      trendValue: 8,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      label: "High Priority Delayed",
      value: isPersonal ? 1 : 5,
      severity: "high" as const,
      trend: "down" as const,
      trendValue: 15,
    },
    {
      icon: <Flame className="h-4 w-4" />,
      label: "Critical Incidents",
      value: isPersonal ? 0 : 2,
      severity: "medium" as const,
      trend: "down" as const,
      trendValue: 33,
    },
    {
      icon: <GitPullRequest className="h-4 w-4" />,
      label: "PRs Stuck",
      value: isPersonal ? 1 : 7,
      severity: "high" as const,
      trend: "up" as const,
      trendValue: 12,
    },
  ];

  return (
    <div className="widget animate-fade-in stagger-2">
      <h2 className="widget-title">
        <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-subtle" />
        {isPersonal ? "My Risk Stats" : "Risk Stats Overview"}
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {riskData.map((risk, index) => (
          <RiskCard key={index} {...risk} />
        ))}
      </div>
    </div>
  );
}

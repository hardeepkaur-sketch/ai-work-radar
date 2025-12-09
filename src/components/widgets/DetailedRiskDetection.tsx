import { Badge } from "@/components/ui/badge";
import { AlertOctagon, AlertTriangle, AlertCircle, ChevronRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium";
  type: string;
  impactScore: number;
  mitigation: string;
}

interface DetailedRiskDetectionProps {
  isPersonal?: boolean;
}

export function DetailedRiskDetection({ isPersonal = false }: DetailedRiskDetectionProps) {
  const risks: RiskItem[] = isPersonal
    ? [
        { id: "1", title: "PR #234 needs review", description: "Open for 48+ hours without review", severity: "high", type: "PR Stale", impactScore: 72, mitigation: "Request review from team lead" },
        { id: "2", title: "WORK-145 approaching deadline", description: "2 days until due date, 60% complete", severity: "medium", type: "Sprint Risk", impactScore: 58, mitigation: "Break into smaller tasks or extend" },
      ]
    : [
        { id: "1", title: "API service degradation", description: "Response times 40% above baseline", severity: "critical", type: "Incident", impactScore: 95, mitigation: "Scale up instances, investigate bottleneck" },
        { id: "2", title: "3 PRs stuck in review", description: "Average wait time exceeds 72 hours", severity: "high", type: "PR Bottleneck", impactScore: 78, mitigation: "Assign additional reviewers" },
        { id: "3", title: "Backend team overloaded", description: "Mike at 110% capacity", severity: "high", type: "Workload", impactScore: 82, mitigation: "Redistribute 2 tasks to frontend team" },
        { id: "4", title: "Sprint scope at risk", description: "Velocity 15% below target", severity: "medium", type: "Sprint Risk", impactScore: 65, mitigation: "Consider descoping 2 low-priority items" },
      ];

  const severityConfig = {
    critical: { icon: AlertOctagon, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
    high: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
    medium: { icon: AlertCircle, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  };

  return (
    <div className="widget animate-fade-in stagger-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <AlertOctagon className="h-4 w-4 text-destructive" />
          {isPersonal ? "My Risk Detection" : "Detailed Risk Detection"}
        </h2>
        <div className="flex gap-2">
          {["critical", "high", "medium"].map((sev) => {
            const count = risks.filter((r) => r.severity === sev).length;
            if (count === 0) return null;
            const config = severityConfig[sev as keyof typeof severityConfig];
            return (
              <Badge key={sev} variant="outline" className={`text-[10px] ${config.bg} ${config.color} ${config.border}`}>
                {count} {sev}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => {
          const config = severityConfig[risk.severity];
          const Icon = config.icon;

          return (
            <div 
              key={risk.id} 
              className={`p-4 rounded-lg border ${config.border} ${config.bg} transition-all hover:shadow-sm cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{risk.title}</span>
                      <Badge variant="secondary" className="text-[10px]">{risk.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{risk.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${config.color}`}>{risk.impactScore}</div>
                  <div className="text-[10px] text-muted-foreground">Impact Score</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground flex-1">{risk.mitigation}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" className="w-full mt-4 text-sm">
        View All Risks
      </Button>
    </div>
  );
}

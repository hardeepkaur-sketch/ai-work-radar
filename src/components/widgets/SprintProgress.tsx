import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Target, TrendingUp, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface SprintProgressProps {
  isPersonal?: boolean;
}

export function SprintProgress({ isPersonal = false }: SprintProgressProps) {
  const sprintData = {
    name: "Sprint 14",
    number: 14,
    totalPoints: isPersonal ? 21 : 89,
    completedPoints: isPersonal ? 14 : 62,
    remainingDays: 4,
    totalDays: 14,
    velocity: isPersonal ? 18 : 82,
    previousVelocity: isPersonal ? 16 : 78,
  };

  const progressPercent = Math.round((sprintData.completedPoints / sprintData.totalPoints) * 100);
  const daysPercent = Math.round(((sprintData.totalDays - sprintData.remainingDays) / sprintData.totalDays) * 100);
  const velocityChange = Math.round(((sprintData.velocity - sprintData.previousVelocity) / sprintData.previousVelocity) * 100);

  // Sprint status logic based on time elapsed vs work completed
  const getSprintStatus = () => {
    const workBuffer = 10; // 10% buffer
    if (progressPercent >= daysPercent - workBuffer) {
      return { status: "On Track", color: "text-success", bgColor: "bg-success/10", icon: CheckCircle2 };
    } else if (progressPercent >= daysPercent - 20) {
      return { status: "At Risk", color: "text-warning", bgColor: "bg-warning/10", icon: AlertTriangle };
    }
    return { status: "Off Track", color: "text-destructive", bgColor: "bg-destructive/10", icon: XCircle };
  };

  const sprintStatus = getSprintStatus();
  const StatusIcon = sprintStatus.icon;

  // Sprint Prediction
  const remainingPoints = sprintData.totalPoints - sprintData.completedPoints;
  const avgPointsPerDay = sprintData.completedPoints / (sprintData.totalDays - sprintData.remainingDays);
  const predictedCompletion = Math.min(100, Math.round(((avgPointsPerDay * sprintData.remainingDays + sprintData.completedPoints) / sprintData.totalPoints) * 100));

  // Scope at Risk
  const expectedVelocity = sprintData.velocity;
  const scopeAtRisk = sprintData.totalPoints > expectedVelocity * 1.1;

  return (
    <div className="widget animate-fade-in stagger-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <Target className="h-4 w-4 text-primary" />
          {isPersonal ? "My Sprint Progress" : "Sprint Progress"}
        </h2>
        <Badge variant="outline" className="text-[10px]">Today</Badge>
      </div>

      <div className="space-y-5">
        {/* Sprint Name and Status */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-foreground">{sprintData.name}</span>
            <span className="text-xs text-muted-foreground ml-2">#{sprintData.number}</span>
            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${sprintStatus.bgColor} ${sprintStatus.color}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {sprintStatus.status}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {sprintData.remainingDays} days left
          </div>
        </div>

        {/* Story Points Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Story Points</span>
            <span className="font-medium text-foreground">
              {sprintData.completedPoints} / {sprintData.totalPoints} pts
            </span>
          </div>
          <Progress value={progressPercent} className="h-2.5 bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercent}% complete</span>
            <span>{remainingPoints} pts remaining</span>
          </div>
        </div>

        {/* Velocity and Time Elapsed */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-muted-foreground">Velocity Trend</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="stat-value text-lg">{sprintData.velocity}</span>
              <span className="text-xs text-success">+{velocityChange}%</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Time Elapsed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="stat-value text-lg">{daysPercent}%</span>
              <span className="text-xs text-muted-foreground">of sprint</span>
            </div>
          </div>
        </div>

        {/* Sprint Prediction Card */}
        <div className="p-3 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">Sprint Prediction</span>
            <Badge variant="outline" className={`text-[10px] ${predictedCompletion >= 90 ? 'text-success' : predictedCompletion >= 70 ? 'text-warning' : 'text-destructive'}`}>
              {predictedCompletion}% likely
            </Badge>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Based on current velocity ({avgPointsPerDay.toFixed(1)} pts/day), sprint completion is {predictedCompletion >= 90 ? 'highly likely' : predictedCompletion >= 70 ? 'moderately likely' : 'at risk'}.
          </p>
        </div>

        {/* Scope at Risk Card */}
        {scopeAtRisk && (
          <div className="p-3 rounded-lg border border-warning/30 bg-warning/5">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-xs font-medium text-warning">Sprint Scope at Risk</span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Current scope ({sprintData.totalPoints} pts) exceeds team velocity ({expectedVelocity} pts). Consider descoping or extending timeline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

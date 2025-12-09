import { Progress } from "@/components/ui/progress";
import { Calendar, Target, TrendingUp, CheckCircle2 } from "lucide-react";

interface SprintProgressProps {
  isPersonal?: boolean;
}

export function SprintProgress({ isPersonal = false }: SprintProgressProps) {
  const sprintData = {
    name: "Sprint 14",
    totalPoints: isPersonal ? 21 : 89,
    completedPoints: isPersonal ? 14 : 62,
    remainingDays: 4,
    totalDays: 14,
    prediction: "on-track" as const,
    velocity: isPersonal ? 18 : 82,
    previousVelocity: isPersonal ? 16 : 78,
  };

  const progressPercent = Math.round((sprintData.completedPoints / sprintData.totalPoints) * 100);
  const daysPercent = Math.round(((sprintData.totalDays - sprintData.remainingDays) / sprintData.totalDays) * 100);
  const velocityChange = Math.round(((sprintData.velocity - sprintData.previousVelocity) / sprintData.previousVelocity) * 100);

  return (
    <div className="widget animate-fade-in stagger-3">
      <h2 className="widget-title">
        <Target className="h-4 w-4 text-primary" />
        {isPersonal ? "My Sprint Progress" : "Sprint Progress"}
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-foreground">{sprintData.name}</span>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-success/10 text-success">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              On Track
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {sprintData.remainingDays} days left
          </div>
        </div>

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
            <span>{sprintData.totalPoints - sprintData.completedPoints} pts remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-success" />
              <span className="text-xs text-muted-foreground">Velocity</span>
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
      </div>
    </div>
  );
}

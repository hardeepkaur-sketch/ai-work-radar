import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeeklyAnalyticsChartProps {
  isPersonal?: boolean;
}

export function WeeklyAnalyticsChart({ isPersonal = false }: WeeklyAnalyticsChartProps) {
  const teamData = [
    { day: "Mon", commits: 45, prs: 12 },
    { day: "Tue", commits: 62, prs: 18 },
    { day: "Wed", commits: 78, prs: 24 },
    { day: "Thu", commits: 55, prs: 15 },
    { day: "Fri", commits: 48, prs: 20 },
    { day: "Sat", commits: 12, prs: 3 },
    { day: "Sun", commits: 8, prs: 2 },
  ];

  const personalData = [
    { day: "Mon", commits: 8, prs: 2 },
    { day: "Tue", commits: 12, prs: 3 },
    { day: "Wed", commits: 15, prs: 4 },
    { day: "Thu", commits: 10, prs: 2 },
    { day: "Fri", commits: 9, prs: 3 },
    { day: "Sat", commits: 2, prs: 0 },
    { day: "Sun", commits: 1, prs: 0 },
  ];

  const data = isPersonal ? personalData : teamData;

  const totalCommits = data.reduce((sum, d) => sum + d.commits, 0);
  const totalPRs = data.reduce((sum, d) => sum + d.prs, 0);
  const peakDay = data.reduce((max, d) => (d.commits > max.commits ? d : max), data[0]);

  return (
    <div className="widget animate-fade-in stagger-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="widget-title mb-0">
          <Calendar className="h-4 w-4 text-primary" />
          {isPersonal ? "My Weekly Activity" : "Weekly Commit & PR Analytics"}
        </h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] gap-1">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Commits: {totalCommits}
          </Badge>
          <Badge variant="outline" className="text-[10px] gap-1">
            <span className="w-2 h-2 rounded-full bg-success" />
            PRs: {totalPRs}
          </Badge>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }} 
              className="fill-muted-foreground"
              axisLine={{ className: "stroke-border" }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              className="fill-muted-foreground"
              axisLine={{ className: "stroke-border" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="commits"
              name="Commits"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
            <Line
              type="monotone"
              dataKey="prs"
              name="Pull Requests"
              stroke="hsl(var(--success))"
              strokeWidth={2.5}
              dot={{ fill: "hsl(var(--success))", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--success))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-3">
        <TrendingUp className="h-4 w-4 text-success" />
        <span className="text-xs text-muted-foreground">
          Peak productivity on <span className="font-medium text-foreground">{peakDay.day}</span> with {peakDay.commits} commits.
          {!isPersonal && " Team average is 12% higher than last week."}
        </span>
      </div>
    </div>
  );
}

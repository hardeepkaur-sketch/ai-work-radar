import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { TeamMetricsSummary } from "@/components/widgets/TeamMetricsSummary";
import { RiskStatsWidget } from "@/components/widgets/RiskStatsWidget";
import { SprintProgress } from "@/components/widgets/SprintProgress";
import { CurrentWorkSnapshot } from "@/components/widgets/CurrentWorkSnapshot";
import { WeeklyAnalyticsChart } from "@/components/widgets/WeeklyAnalyticsChart";
import { AISummaryInsights } from "@/components/widgets/AISummaryInsights";
import { WorkloadDistribution } from "@/components/widgets/WorkloadDistribution";
import { RecentActivity } from "@/components/widgets/RecentActivity";
import { DetailedRiskDetection } from "@/components/widgets/DetailedRiskDetection";
import { ConfluenceContributions } from "@/components/widgets/ConfluenceContributions";
import { AIAssistant } from "@/components/widgets/AIAssistant";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const [isMyDashboard, setIsMyDashboard] = useState(false);

  return (
    <>
      <Helmet>
        <title>{isMyDashboard ? "My Dashboard" : "Team Insights"} | AI WorkTracker</title>
        <meta name="description" content="AI-powered team analytics and work tracking dashboard. Monitor sprint progress, detect risks, and get actionable insights." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header isMyDashboard={isMyDashboard} onToggleDashboard={setIsMyDashboard} />
        
        <main className="p-6 max-w-[1600px] mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {isMyDashboard ? "My Dashboard" : "Team Insights"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isMyDashboard 
                ? "Your personal work metrics and activity" 
                : "Overview of team performance and analytics"
              }
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2 cols wide */}
            <div className="lg:col-span-2 space-y-6">
              <TeamMetricsSummary isPersonal={isMyDashboard} />
              <RiskStatsWidget isPersonal={isMyDashboard} />
              <CurrentWorkSnapshot isPersonal={isMyDashboard} />
              <WeeklyAnalyticsChart isPersonal={isMyDashboard} />
              <DetailedRiskDetection isPersonal={isMyDashboard} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <SprintProgress isPersonal={isMyDashboard} />
              {!isMyDashboard && <WorkloadDistribution />}
              <AISummaryInsights isPersonal={isMyDashboard} />
              <RecentActivity isPersonal={isMyDashboard} />
              <ConfluenceContributions isPersonal={isMyDashboard} />
            </div>
          </div>
        </main>

        <AIAssistant />
      </div>
    </>
  );
}

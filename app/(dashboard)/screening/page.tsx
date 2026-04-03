"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScreeningQueue } from "@/components/screening/screening-queue";
import { RulesBuilder } from "@/components/screening/rules-builder";
import { AiInsightsBanner } from "@/components/shared/ai-insights-banner";
import { screeningRules as initialRules } from "@/lib/mock-data";
import { ScanSearch } from "lucide-react";
import type { ScreeningRule } from "@/lib/types";

export default function ScreeningPage() {
  const [rules, setRules] = useState<ScreeningRule[]>(initialRules);

  return (
    <div className="p-8 space-y-8">
      <Header title="AI Screening" breadcrumbs={[{ label: "AI Screening" }]} />

      {/* AI Insights Banner */}
      <AiInsightsBanner
        icon={<ScanSearch size={20} />}
        title="AI Screening Center"
        badge="ARIA Powered"
        description="12 new applications pending screening. Auto-screening rules caught 3 candidates below threshold."
        stats={[
          { label: "Pending Review", value: "12" },
          { label: "Auto-Screened Today", value: "28" },
          { label: "Rules Active", value: "6" },
        ]}
      />

      <div>
        <Tabs defaultValue="queue">
          <TabsList>
            <TabsTrigger value="queue">Queue</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="mt-6">
            <ScreeningQueue />
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <RulesBuilder rules={rules} onChange={setRules} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

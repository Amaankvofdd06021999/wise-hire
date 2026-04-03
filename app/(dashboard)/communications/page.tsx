"use client";

import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inbox } from "@/components/communications/inbox";
import { TemplateLibrary } from "@/components/communications/template-library";
import { AiInsightsBanner } from "@/components/shared/ai-insights-banner";
import { MessageSquare } from "lucide-react";

export default function CommunicationsPage() {
  return (
    <div className="p-8 space-y-8">
      <Header
        title="Communications"
        breadcrumbs={[{ label: "Communications" }]}
      />

      {/* AI Insights Banner */}
      <AiInsightsBanner
        icon={<MessageSquare size={20} />}
        title="Communications Hub"
        badge="ARIA Powered"
        description="5 candidates awaiting response. ARIA has drafted 3 personalized follow-ups ready for review."
        stats={[
          { label: "Unread", value: "5" },
          { label: "Templates", value: "12" },
          { label: "Response Rate", value: "89%" },
        ]}
      />

      <div>
        <Tabs defaultValue="inbox">
          <TabsList className="mb-6">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="inbox">
            <Inbox />
          </TabsContent>
          <TabsContent value="templates">
            <TemplateLibrary />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

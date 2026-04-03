"use client";

import { Header } from "@/components/layout/header";
import { JobCreationWizard } from "@/components/jobs/job-creation-wizard";

export default function NewJobPage() {
  return (
    <div className="p-6">
      <Header
        title="New Job"
        breadcrumbs={[
          { label: "Jobs", href: "/jobs" },
          { label: "New Job" },
        ]}
      />
      <div className="mt-6">
        <JobCreationWizard />
      </div>
    </div>
  );
}

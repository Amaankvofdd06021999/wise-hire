"use client";

import { use } from "react";
import { Header } from "@/components/layout/header";
import { CandidateProfile } from "@/components/candidates/candidate-profile";
import { mockCandidates } from "@/lib/mock-data";

export default function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const candidate = mockCandidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div className="p-8">
        <Header
          title="Candidate Profile"
          breadcrumbs={[
            { label: "Candidates", href: "/candidates" },
            { label: "Profile" },
          ]}
        />
        <div className="mt-6 flex items-center justify-center py-16">
          <p className="text-sm font-medium" style={{ color: "var(--gray-500)" }}>
            Candidate not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Header
        title={candidate.name}
        breadcrumbs={[
          { label: "Candidates", href: "/candidates" },
          { label: candidate.name },
        ]}
      />
      <div className="mt-6">
        <CandidateProfile candidate={candidate} />
      </div>
    </div>
  );
}

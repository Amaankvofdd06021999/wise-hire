"use client";

import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { JobCard } from "@/components/jobs/job-card";
import { CreateJobModal } from "@/components/jobs/create-job-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockJobs } from "@/lib/mock-data";
import {
  Search,
  Plus,
  Briefcase,
  Sparkles,
  Clock,
  TrendingUp,
  Layers,
} from "lucide-react";
import type { JobStatus } from "@/lib/types";

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredJobs = useMemo(() => {
    let jobs = mockJobs;

    // Filter by status tab
    if (activeTab !== "all") {
      jobs = jobs.filter((j) => j.status === (activeTab as JobStatus));
    }

    // Filter by search query
    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.hiringManager.toLowerCase().includes(q)
      );
    }

    return jobs;
  }, [activeTab, debouncedQuery]);

  return (
    <div className="p-8">
      <Header title="Jobs" breadcrumbs={[{ label: "Jobs" }]} />

      <div className="mt-8 space-y-6">
        {/* AI Insights Banner */}
        <div
          className="rounded-xl p-6 bg-white"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Left: title + insight text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--brand-50)" }}
                >
                  <Sparkles
                    size={18}
                    style={{ color: "var(--brand-600)" }}
                  />
                </div>
                <h2 className="text-lg font-semibold text-[var(--gray-900)]">
                  AI Hiring Insights
                </h2>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--brand-50)",
                    color: "var(--brand-600)",
                  }}
                >
                  ARIA Powered
                </span>
              </div>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                Your &lsquo;Full Stack Engineer&rsquo; role is trending{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--brand-600)" }}
                >
                  34% above market demand
                </span>
                . Consider increasing your sourcing channels to attract top
                talent before the competition intensifies.
              </p>
            </div>

            {/* Right: stats */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--gray-50)" }}
                >
                  <Clock size={18} className="text-[var(--gray-500)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--gray-500)] font-medium">
                    Avg Time to Fill
                  </p>
                  <p className="text-lg font-semibold text-[var(--gray-900)]">
                    18 days
                  </p>
                </div>
              </div>

              <div
                className="w-px h-10"
                style={{ backgroundColor: "var(--gray-200)" }}
              />

              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--gray-50)" }}
                >
                  <Layers size={18} className="text-[var(--gray-500)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--gray-500)] font-medium">
                    Open Positions
                  </p>
                  <p className="text-lg font-semibold text-[var(--gray-900)]">
                    5
                  </p>
                </div>
              </div>

              <div
                className="w-px h-10"
                style={{ backgroundColor: "var(--gray-200)" }}
              />

              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "var(--gray-50)" }}
                >
                  <TrendingUp size={18} className="text-[var(--gray-500)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--gray-500)] font-medium">
                    Market Demand
                  </p>
                  <p className="text-lg font-semibold text-[var(--success-700)]">
                    High
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs + Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {/* Action bar */}
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="relative w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)]"
              />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search jobs..."
                className="pl-9"
              />
            </div>
            <Button
              onClick={() => setCreateModalOpen(true)}
              className="gap-2"
              style={{
                backgroundColor: "var(--brand-600)",
                color: "white",
              }}
            >
              <Plus size={16} />
              Create New Job
            </Button>
          </div>

          {/* Grid for all tabs */}
          {["active", "draft", "closed", "all"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue}>
              {filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Briefcase
                    size={48}
                    className="text-[var(--gray-300)] mb-4"
                  />
                  <h3 className="text-base font-medium text-[var(--gray-700)]">
                    No jobs found
                  </h3>
                  <p className="text-sm text-[var(--gray-500)] mt-1">
                    {debouncedQuery
                      ? "Try adjusting your search query."
                      : "Get started by creating a new job."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Create Job Modal */}
      <CreateJobModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
}

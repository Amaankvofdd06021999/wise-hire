"use client";

import { toast } from "sonner";
import { Sparkles, Download, Calendar, BarChart3, Users, Shield, TrendingUp, TrendingDown } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  Cell,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const hiringMetrics = [
  { month: "Oct", tth: 42, cph: 25000, offers: 8, accepted: 5 },
  { month: "Nov", tth: 39, cph: 23500, offers: 12, accepted: 8 },
  { month: "Dec", tth: 37, cph: 22800, offers: 10, accepted: 7 },
  { month: "Jan", tth: 35, cph: 22000, offers: 15, accepted: 11 },
  { month: "Feb", tth: 33, cph: 21800, offers: 11, accepted: 9 },
  { month: "Mar", tth: 32, cph: 21400, offers: 14, accepted: 11 },
];

const funnelData = [
  { stage: "Applied", count: 847, rate: 100 },
  { stage: "Screened", count: 634, rate: 75 },
  { stage: "Shortlisted", count: 285, rate: 45 },
  { stage: "Assessment", count: 142, rate: 50 },
  { stage: "Interview", count: 89, rate: 63 },
  { stage: "Offer", count: 34, rate: 38 },
  { stage: "Hired", count: 28, rate: 82 },
];

const aiPerformanceData = [
  { month: "Oct", screened: 152, precision: 89.4, falsePositive: 6.2 },
  { month: "Nov", screened: 178, precision: 90.1, falsePositive: 5.8 },
  { month: "Dec", screened: 195, precision: 91.5, falsePositive: 5.1 },
  { month: "Jan", screened: 223, precision: 92.8, falsePositive: 4.6 },
  { month: "Feb", screened: 241, precision: 93.5, falsePositive: 4.1 },
  { month: "Mar", screened: 258, precision: 94.2, falsePositive: 3.8 },
];

const sourceData = [
  { source: "LinkedIn", applicants: 312, shortlisted: 94, hired: 11, costPerHire: 18200, conversion: 3.5 },
  { source: "Indeed", applicants: 198, shortlisted: 42, hired: 5, costPerHire: 24500, conversion: 2.5 },
  { source: "Naukri", applicants: 145, shortlisted: 38, hired: 4, costPerHire: 19800, conversion: 2.8 },
  { source: "Glassdoor", applicants: 87, shortlisted: 22, hired: 2, costPerHire: 28400, conversion: 2.3 },
  { source: "Referral", applicants: 54, shortlisted: 32, hired: 8, costPerHire: 8500, conversion: 14.8 },
  { source: "Direct Apply", applicants: 51, shortlisted: 15, hired: 2, costPerHire: 12200, conversion: 3.9 },
];

const sourceChartData = sourceData.map((s, i) => ({
  source: s.source,
  applicants: s.applicants,
  fill: ["#0E5EF5", "#2970FF", "#4B8AFF", "#84ADFF", "#B2CCFF", "#D1E0FF"][i],
}));

const deiPipelineData = [
  { stage: "Applied", groupA: 340, groupB: 285, groupC: 222 },
  { stage: "Screened", groupA: 252, groupB: 218, groupC: 164 },
  { stage: "Shortlisted", groupA: 112, groupB: 98, groupC: 75 },
  { stage: "Assessment", groupA: 58, groupB: 48, groupC: 36 },
  { stage: "Interview", groupA: 36, groupB: 30, groupC: 23 },
  { stage: "Offer", groupA: 14, groupB: 12, groupC: 8 },
  { stage: "Hired", groupA: 12, groupB: 10, groupC: 6 },
];

const deiDropoffData = [
  { stage: "Applied", total: 847, retained: 100, dropoff: 0 },
  { stage: "Screened", total: 634, retained: 74.9, dropoff: 25.1 },
  { stage: "Shortlisted", total: 285, retained: 44.9, dropoff: 55.1 },
  { stage: "Assessment", total: 142, retained: 49.8, dropoff: 50.2 },
  { stage: "Interview", total: 89, retained: 62.7, dropoff: 37.3 },
  { stage: "Offer", total: 34, retained: 38.2, dropoff: 61.8 },
  { stage: "Hired", total: 28, retained: 82.4, dropoff: 17.6 },
];

/* ------------------------------------------------------------------ */
/*  Reusable Sub-components                                            */
/* ------------------------------------------------------------------ */

function ReportStatCard({
  label,
  value,
  delta,
  deltaLabel,
  positiveIsGood = true,
}: {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  positiveIsGood?: boolean;
}) {
  const isGood = positiveIsGood ? delta > 0 : delta < 0;
  const Icon = delta >= 0 ? TrendingUp : TrendingDown;
  const color = isGood ? "var(--success-600)" : "var(--error-600)";
  const displayDelta = delta >= 0 ? `+${delta}` : `${delta}`;

  return (
    <div
      className="rounded-xl bg-white p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <p
        className="text-xs font-medium uppercase tracking-wide"
        style={{ color: "var(--gray-500)" }}
      >
        {label}
      </p>
      <p
        className="mt-1 text-2xl font-semibold"
        style={{ color: "var(--gray-900)" }}
      >
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1">
        <span
          className="inline-flex items-center gap-1 text-sm font-medium"
          style={{ color }}
        >
          <Icon size={14} />
          {displayDelta}{deltaLabel}
        </span>
        <span className="text-xs" style={{ color: "var(--gray-400)" }}>
          vs last quarter
        </span>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl bg-white p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: "var(--gray-700)" }}
      >
        {title}
      </h3>
      <div className="min-h-[300px]">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8">
      <Header
        title="Reports"
        breadcrumbs={[{ label: "Reports & Analytics" }]}
      />

      {/* ─── AI Insights Banner ─── */}
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: "var(--brand-50)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ backgroundColor: "var(--brand-100)" }}
              >
                <Sparkles size={20} style={{ color: "var(--brand-600)" }} />
              </div>
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--gray-900)" }}
              >
                Reporting Insights
              </h2>
              <Badge className="bg-[var(--brand-600)] text-white border-transparent text-[10px] uppercase tracking-wider px-2 py-0.5">
                ARIA Powered
              </Badge>
            </div>
            <p
              className="text-sm leading-relaxed max-w-3xl"
              style={{ color: "var(--gray-700)" }}
            >
              Time-to-hire improved 18% this quarter. LinkedIn remains your highest quality source.
              Consider increasing referral program investment — referrals convert 3x better than job boards.
            </p>
          </div>

          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
                Avg TTH
              </p>
              <p className="text-xl font-semibold mt-0.5" style={{ color: "var(--gray-900)" }}>
                32 days
              </p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: "var(--gray-200)" }} />
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
                Cost/Hire
              </p>
              <p className="text-xl font-semibold mt-0.5" style={{ color: "var(--gray-900)" }}>
                $21.4k
              </p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: "var(--gray-200)" }} />
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>
                Offer Accept
              </p>
              <p className="text-xl font-semibold mt-0.5" style={{ color: "var(--gray-900)" }}>
                78%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Page Header Row ─── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--gray-900)" }}>
            Reports &amp; Analytics
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--gray-500)" }}>
            Track hiring performance and AI effectiveness
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="gap-2 text-[var(--gray-600)]" onClick={() => toast.info("Opening report scheduler...")}>
            <Calendar size={16} />
            Schedule Report
          </Button>
          <Button className="gap-2 bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white" onClick={() => toast.success("Exporting report...")}>
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <Tabs defaultValue="hiring" className="space-y-6">
        <TabsList className="bg-[var(--gray-100)]">
          <TabsTrigger value="hiring" className="gap-1.5 data-[state=active]:bg-white">
            <BarChart3 size={14} />
            Hiring Performance
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-1.5 data-[state=active]:bg-white">
            <Sparkles size={14} />
            AI Performance
          </TabsTrigger>
          <TabsTrigger value="sources" className="gap-1.5 data-[state=active]:bg-white">
            <Users size={14} />
            Sources
          </TabsTrigger>
          <TabsTrigger value="dei" className="gap-1.5 data-[state=active]:bg-white">
            <Shield size={14} />
            DEI
          </TabsTrigger>
        </TabsList>

        {/* ============================================================ */}
        {/*  TAB 1: Hiring Performance                                   */}
        {/* ============================================================ */}
        <TabsContent value="hiring" className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            <ReportStatCard label="Time to Hire" value="32 days" delta={-8} deltaLabel="%" positiveIsGood={false} />
            <ReportStatCard label="Cost per Hire" value="$21.4k" delta={-12} deltaLabel="%" positiveIsGood={false} />
            <ReportStatCard label="Offer Acceptance" value="78%" delta={5} deltaLabel="%" />
            <ReportStatCard label="Pipeline Velocity" value="127" delta={15} deltaLabel="%" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TTH Trend */}
            <ChartCard title="Time-to-Hire Trend">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={hiringMetrics} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0E5EF5" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#0E5EF5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={{ stroke: "var(--gray-200)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={false}
                    tickLine={false}
                    label={{ value: "Days", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "var(--gray-400)" } }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${value} days`, "Time to Hire"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="tth"
                    stroke="#0E5EF5"
                    strokeWidth={2.5}
                    fill="url(#tthGradient)"
                    dot={{ r: 4, fill: "#0E5EF5", strokeWidth: 2, stroke: "white" }}
                    activeDot={{ r: 6, fill: "#0E5EF5", strokeWidth: 2, stroke: "white" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Conversion Funnel */}
            <ChartCard title="Conversion Funnel">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }} layout="vertical">
                  <defs>
                    <linearGradient id="funnelGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0E5EF5" />
                      <stop offset="100%" stopColor="#4B8AFF" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={{ stroke: "var(--gray-200)" }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="stage"
                    type="category"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, _name: any, entry: any) => [
                      `${value} (${entry?.payload?.rate ?? 0}%)`,
                      "Candidates",
                    ]}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#funnelGradient)"
                    radius={[0, 6, 6, 0]}
                    barSize={24}
                    label={{
                      position: "right",
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter: (v: any) => {
                        const item = funnelData.find((d) => d.count === v);
                        return item ? `${item.rate}%` : "";
                      },
                      style: { fontSize: 11, fill: "var(--gray-500)", fontWeight: 500 },
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/*  TAB 2: AI Performance                                       */}
        {/* ============================================================ */}
        <TabsContent value="ai" className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            <ReportStatCard label="Screening Accuracy" value="94.2%" delta={2.1} deltaLabel="%" />
            <ReportStatCard label="False Positive Rate" value="3.8%" delta={-1.2} deltaLabel="%" positiveIsGood={false} />
            <ReportStatCard label="False Negative Rate" value="2.1%" delta={-0.5} deltaLabel="%" positiveIsGood={false} />
            <ReportStatCard label="Candidates Screened" value="1,247" delta={34} deltaLabel="%" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Screening Volume */}
            <ChartCard title="Monthly Screening Volume">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aiPerformanceData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={{ stroke: "var(--gray-200)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${value} candidates`, "Screened"]}
                  />
                  <Bar dataKey="screened" fill="#0E5EF5" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Accuracy Trend */}
            <ChartCard title="Accuracy Trend">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={aiPerformanceData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={{ stroke: "var(--gray-200)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) => [
                      `${value}%`,
                      name === "precision" ? "Precision" : "False Positive",
                    ]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value: string) =>
                      value === "precision" ? "Precision" : "False Positive Rate"
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="precision"
                    stroke="#0E5EF5"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#0E5EF5", strokeWidth: 2, stroke: "white" }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="falsePositive"
                    stroke="var(--error-600)"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "var(--error-600)", strokeWidth: 2, stroke: "white" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/*  TAB 3: Sources                                              */}
        {/* ============================================================ */}
        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Breakdown Chart */}
            <ChartCard title="Applicants by Source">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sourceChartData} layout="vertical" margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={{ stroke: "var(--gray-200)" }}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="source"
                    type="category"
                    tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${value} applicants`, "Total"]}
                  />
                  <Bar dataKey="applicants" radius={[0, 6, 6, 0]} barSize={28}>
                    {sourceChartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Quality by Source Table */}
            <div
              className="rounded-xl bg-white p-6"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "var(--gray-700)" }}
              >
                Quality by Source
              </h3>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>Source</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Applicants</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Shortlisted</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Hired</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Cost/Hire</TableHead>
                      <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Conv. Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sourceData.map((row) => {
                      const convColor =
                        row.conversion >= 10
                          ? "var(--success-600)"
                          : row.conversion >= 3
                          ? "var(--warning-600)"
                          : "var(--error-600)";
                      return (
                        <TableRow key={row.source}>
                          <TableCell className="font-medium" style={{ color: "var(--gray-700)" }}>
                            {row.source}
                          </TableCell>
                          <TableCell className="text-right" style={{ color: "var(--gray-600)" }}>
                            {row.applicants.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right" style={{ color: "var(--gray-600)" }}>
                            {row.shortlisted}
                          </TableCell>
                          <TableCell className="text-right" style={{ color: "var(--gray-600)" }}>
                            {row.hired}
                          </TableCell>
                          <TableCell className="text-right" style={{ color: "var(--gray-600)" }}>
                            ${(row.costPerHire / 1000).toFixed(1)}k
                          </TableCell>
                          <TableCell className="text-right font-semibold" style={{ color: convColor }}>
                            {row.conversion}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/*  TAB 4: DEI                                                  */}
        {/* ============================================================ */}
        <TabsContent value="dei" className="space-y-6">
          {/* Pipeline Demographics */}
          <ChartCard title="Pipeline Demographics (Anonymized)">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deiPipelineData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" />
                <XAxis
                  dataKey="stage"
                  tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                  axisLine={{ stroke: "var(--gray-200)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "var(--gray-500)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid var(--gray-200)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value: string) => {
                    const labels: Record<string, string> = {
                      groupA: "Group A",
                      groupB: "Group B",
                      groupC: "Group C",
                    };
                    return labels[value] || value;
                  }}
                />
                <Bar dataKey="groupA" stackId="a" fill="#0E5EF5" radius={[0, 0, 0, 0]} name="groupA" />
                <Bar dataKey="groupB" stackId="a" fill="#4B8AFF" radius={[0, 0, 0, 0]} name="groupB" />
                <Bar dataKey="groupC" stackId="a" fill="#B2CCFF" radius={[4, 4, 0, 0]} name="groupC" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Stage Drop-off Analysis */}
          <div
            className="rounded-xl bg-white p-6"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--gray-700)" }}
            >
              Stage Drop-off Analysis
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--gray-500)" }}>Stage</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Total Candidates</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>% Retained</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right" style={{ color: "var(--gray-500)" }}>Drop-off</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deiDropoffData.map((row) => {
                  const isFlagged = row.dropoff > 20;
                  return (
                    <TableRow key={row.stage}>
                      <TableCell className="font-medium" style={{ color: "var(--gray-700)" }}>
                        {row.stage}
                      </TableCell>
                      <TableCell className="text-right" style={{ color: "var(--gray-600)" }}>
                        {row.total.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right" style={{ color: "var(--gray-600)" }}>
                        {row.retained}%
                      </TableCell>
                      <TableCell
                        className="text-right font-semibold"
                        style={{ color: isFlagged ? "var(--error-600)" : "var(--success-600)" }}
                      >
                        {row.dropoff > 0 ? `${row.dropoff}%` : "—"}
                        {isFlagged && (
                          <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(227, 27, 84, 0.08)" }}>
                            Flag
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Compliance Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* EEOC Reporting */}
            <div
              className="rounded-xl bg-white p-6 flex items-start gap-4"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{ backgroundColor: "rgba(9, 146, 80, 0.08)" }}
              >
                <Shield size={20} style={{ color: "var(--success-600)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                  EEOC Reporting
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--success-600)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--success-600)" }}>
                    Compliant
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--gray-400)" }}>
                  Last updated 3 days ago
                </p>
              </div>
            </div>

            {/* Adverse Impact Analysis */}
            <div
              className="rounded-xl bg-white p-6 flex items-start gap-4"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{ backgroundColor: "rgba(202, 133, 4, 0.08)" }}
              >
                <Shield size={20} style={{ color: "var(--warning-600)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                  Adverse Impact Analysis
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--warning-600)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--warning-600)" }}>
                    Review Needed
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--gray-400)" }}>
                  Assessment stage flagged
                </p>
              </div>
            </div>

            {/* Audit Trail */}
            <div
              className="rounded-xl bg-white p-6 flex items-start gap-4"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                style={{ backgroundColor: "rgba(9, 146, 80, 0.08)" }}
              >
                <Shield size={20} style={{ color: "var(--success-600)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--gray-900)" }}>
                  Audit Trail
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--success-600)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--success-600)" }}>
                    Complete
                  </span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--gray-400)" }}>
                  1,247 decisions logged
                </p>
              </div>
            </div>
          </div>

          {/* Export EEOC Report Button */}
          <div className="flex">
            <Button className="gap-2 bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white" onClick={() => toast.success("EEOC report exported")}>
              <Download size={16} />
              Export EEOC Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

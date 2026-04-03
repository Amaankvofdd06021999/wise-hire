"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { pipelineStages } from "@/lib/mock-data";

export function PipelineFunnel() {
  return (
    <div
      className="rounded-xl bg-white p-6"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <h2
        className="text-base font-semibold"
        style={{ color: "var(--gray-900)" }}
      >
        Pipeline Overview
      </h2>

      <div className="mt-4" style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={pipelineStages}
            layout="vertical"
            margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={130}
              tick={{ fontSize: 13, fill: "var(--gray-600)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => [String(value), "Candidates"]}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--gray-200)",
                boxShadow: "var(--shadow-md)",
              }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
              {pipelineStages.map((_, index) => (
                <Cell
                  key={index}
                  fill={`color-mix(in srgb, var(--brand-600), var(--brand-300) ${index * 14}%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

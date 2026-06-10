"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type Item = {
  month: string;
  revenue: number;
  expenses: number;
};

export function RevenueChart({ data }: { data: Item[] }) {
  const [range, setRange] = useState<"year" | "last6">("year");

  const filteredData = useMemo(() => {
    if (range === "last6") return data.slice(-6);
    return data;
  }, [data, range]);

  return (
    <div className="rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(200,162,74,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl font-bold">Revenue Overview</h3>
          <p className="text-sm text-white/40">Revenue vs expenses</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-4 text-xs text-white/45 sm:flex">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-mb-gold" />
              Revenue
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/35" />
              Expenses
            </span>
          </div>
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs">
            <button
              type="button"
              onClick={() => setRange("year")}
              className={`rounded-full px-3 py-1.5 transition-colors ${range === "year" ? "bg-mb-gold text-black" : "text-white/60 hover:text-white"}`}
            >
              This Year
            </button>
            <button
              type="button"
              onClick={() => setRange("last6")}
              className={`rounded-full px-3 py-1.5 transition-colors ${range === "last6" ? "bg-mb-gold text-black" : "text-white/60 hover:text-white"}`}
            >
              Last 6
            </button>
          </div>
        </div>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(255,255,255,.35)" />
            <YAxis stroke="rgba(255,255,255,.35)" />
            <Tooltip
              contentStyle={{
                background: "#111",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 16
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#c8a24a"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="rgba(255,255,255,.35)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

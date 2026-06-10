import { money } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  delta?: string;
  tone?: "gold" | "green" | "red";
};

export function KpiCard({
  label,
  value,
  delta,
  tone = "gold"
}: Props) {
  const toneClass =
    tone === "green"
      ? "border-mb-green/15 bg-mb-green/10 text-mb-green"
      : tone === "red"
        ? "border-mb-red/15 bg-mb-red/10 text-mb-red"
        : "border-mb-gold/20 bg-mb-gold/10 text-mb-gold";

  return (
    <div className="rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-mb-gold">
          ✦
        </div>
        {delta ? (
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneClass}`}>
            {delta}
          </span>
        ) : null}
      </div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">{label}</p>
      <div className="mt-3 flex items-end gap-3">
        <h3 className="font-display text-4xl font-bold leading-none">
          {typeof value === "number" && label.toLowerCase().includes("revenue")
            ? money(value)
            : value}
        </h3>
      </div>
      <p className="mt-4 text-sm text-white/35">Compared with last month</p>
    </div>
  );
}

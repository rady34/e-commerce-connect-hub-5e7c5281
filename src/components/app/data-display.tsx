/**
 * Chart-free data display primitives.
 * القاعدة: لا توجد رسوم بيانية — البيانات تُعرض كأرقام وقوائم ومؤشرات حالة.
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpLeft, Minus } from "lucide-react";

function toNumber(v: unknown) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function fmt(n: number) {
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(n);
}

/* ---------- Metric row (label + number + subtle proportional meter) ---------- */
function MetricRow({
  label,
  value,
  max,
  hint,
  tone = "primary",
}: {
  label: string;
  value: number;
  max: number;
  hint?: React.ReactNode | undefined;
  tone?: "primary" | "secondary" | "success" | "warning" | undefined;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const tones: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-brand-navy",
    success: "bg-success",
    warning: "bg-warning",
  };
  return (
    <li className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm text-muted-foreground">{label}</span>
        <span className="shrink-0 text-sm font-bold tabular-nums">{fmt(value)}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full", tones[tone])} style={{ width: `${pct}%` }} />
      </div>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </li>
  );
}

/** قائمة اتجاه زمني: القيم كأرقام مع نسبة التغير بدل الرسم البياني */
export function TrendSummary({
  data,
  xKey,
  yKey,
  name,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  name: string;
}) {
  const values = data.map((d) => toNumber(d[yKey]));
  const max = Math.max(1, ...values);
  const total = values.reduce((a, b) => a + b, 0);
  const first = values[0] ?? 0;
  const last = values[values.length - 1] ?? 0;
  const change = first > 0 ? Math.round(((last - first) / first) * 100) : 0;
  const Icon = change > 0 ? ArrowUpLeft : change < 0 ? ArrowDownLeft : Minus;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">إجمالي {name}</p>
          <p className="mt-1 text-xl font-bold tabular-nums">{fmt(total)}</p>
        </div>
        <div className="rounded-xl border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">نسبة التغير</p>
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-xl font-bold tabular-nums",
              change > 0 ? "text-success" : change < 0 ? "text-destructive" : "text-muted-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {change > 0 ? "+" : ""}
            {change}%
          </p>
        </div>
      </div>
      <ul className="space-y-3">
        {data.map((d, i) => (
          <MetricRow key={i} label={String(d[xKey] ?? "")} value={values[i] ?? 0} max={max} />
        ))}
      </ul>
    </div>
  );
}

/** ترتيب رقمي بدل الأعمدة البيانية */
export function RankedList({
  data,
  xKey,
  bars,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  bars: { key: string; name: string }[];
}) {
  const primary = bars[0];
  if (!primary) return null;
  const rows = data
    .map((d) => ({ label: String(d[xKey] ?? ""), value: toNumber(d[primary.key]) }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {rows.map((r, i) => (
        <MetricRow
          key={i}
          label={`${i + 1}. ${r.label}`}
          value={r.value}
          max={max}
          tone={i === 0 ? "primary" : "secondary"}
        />
      ))}
    </ul>
  );
}

/** مقارنة بين أكثر من قيمة لكل فترة، كجدول أرقام مبسط */
export function ComparisonTable({
  data,
  xKey,
  lines,
}: {
  data: Record<string, unknown>[];
  xKey: string;
  lines: { key: string; name: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm">
        <thead>
          <tr className="text-muted-foreground">
            <th className="py-2 font-medium">الفترة</th>
            {lines.map((l) => (
              <th key={l.key} className="py-2 font-medium">
                {l.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border-t">
              <td className="py-2 text-muted-foreground">{String(d[xKey] ?? "")}</td>
              {lines.map((l) => (
                <td key={l.key} className="py-2 font-semibold tabular-nums">
                  {fmt(toNumber(d[l.key]))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** توزيع نسبي كقائمة نسب مئوية بدل الدونات */
export function DistributionList({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const tones = ["primary", "secondary", "success", "warning"] as const;
  return (
    <ul className="space-y-3">
      {data.map((d, i) => (
        <MetricRow
          key={d.name}
          label={d.name}
          value={d.value}
          max={Math.max(...data.map((x) => x.value), 1)}
          tone={tones[i % tones.length]}
          hint={`${Math.round((d.value / total) * 100)}% من الإجمالي`}
        />
      ))}
    </ul>
  );
}

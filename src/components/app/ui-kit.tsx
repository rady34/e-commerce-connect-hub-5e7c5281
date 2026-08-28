import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownUp,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Search,
  SearchX,
  SlidersHorizontal,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import type { Status } from "@/lib/mock-data";

/* ============================================================
 * Page layout primitives
 * ============================================================ */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function IconAction({
  label,
  icon: Icon,
  badge,
  onClick,
  variant = "outline",
}: {
  label: string;
  icon: LucideIcon;
  badge?: number;
  onClick?: () => void;
  variant?: "outline" | "ghost";
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={variant} size="icon" onClick={onClick} aria-label={label} className="relative">
          <Icon className="size-4" />
          {badge ? (
            <span className="absolute -top-1.5 -start-1.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
              {badge}
            </span>
          ) : null}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/* ---------------- KPI Card ---------------- */
export function KpiCard({
  title,
  value,
  icon: Icon,
  hint,
  tone = "default",
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
}) {
  const tones: Record<string, string> = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/12 text-destructive",
    info: "bg-info/12 text-info",
  };
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
        <div className={cn("grid size-10 shrink-0 place-items-center rounded-xl sm:size-12", tones[tone])}>
          <Icon className="size-5 sm:size-6" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground sm:text-sm">{title}</p>
          <p className="mt-1 text-xl font-bold tracking-tight tabular-nums sm:text-2xl">{value}</p>
          {hint ? <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

/** شبكة البطاقات الأساسية: عمودان دائمًا على الموبايل وما فوق */
export function CardGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:gap-4", className)}>{children}</div>;
}

/* ---------------- Status Badge ---------------- */
const statusMap: Record<string, { label: string; className: string }> = {
  active: { label: "مفعل", className: "bg-success/12 text-success border-success/25" },
  inactive: { label: "معطل", className: "bg-muted text-muted-foreground border-border" },
  pending: { label: "معلق", className: "bg-warning/15 text-warning border-warning/25" },
  new: { label: "جديد", className: "bg-info/12 text-info border-info/25" },
  processing: { label: "قيد المعالجة", className: "bg-secondary text-secondary-foreground border-border" },
  completed: { label: "مكتمل", className: "bg-success/12 text-success border-success/25" },
  cancelled: { label: "ملغي", className: "bg-destructive/12 text-destructive border-destructive/25" },
  failed: { label: "فشل", className: "bg-destructive/12 text-destructive border-destructive/25" },
  resolved: { label: "تم الحل", className: "bg-success/12 text-success border-success/25" },
  closed: { label: "مغلق", className: "bg-muted text-muted-foreground border-border" },
  عالية: { label: "عالية", className: "bg-destructive/12 text-destructive border-destructive/25" },
  متوسطة: { label: "متوسطة", className: "bg-warning/15 text-warning border-warning/25" },
  منخفضة: { label: "منخفضة", className: "bg-info/12 text-info border-info/25" },
};

export function StatusBadge({ status }: { status: Status | string }) {
  const s = statusMap[status] ?? { label: String(status), className: "bg-muted text-muted-foreground" };
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", s.className)}>
      <span className="me-1.5 inline-block size-1.5 rounded-full bg-current" aria-hidden />
      {s.label}
    </Badge>
  );
}

export function ScorePill({ score }: { score: number }) {
  const tone =
    score >= 85 ? "bg-success/12 text-success" : score >= 70 ? "bg-warning/15 text-warning" : "bg-destructive/12 text-destructive";
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums", tone)}>{score}%</span>;
}

/* ---------------- States ---------------- */
function StateShell({
  icon: Icon,
  title,
  description,
  action,
  danger,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <div className={cn("grid size-11 place-items-center rounded-full", danger ? "bg-destructive/10" : "bg-muted")}>
        <Icon className={cn("size-5", danger ? "text-destructive" : "text-muted-foreground")} />
      </div>
      <p className="font-semibold">{title}</p>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export function EmptyState({
  title = "لا توجد بيانات حاليًا",
  description = "لم تتم إضافة أي سجلات بعد.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return <StateShell icon={Inbox} title={title} description={description} action={action} />;
}

export function SearchEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <StateShell
      icon={SearchX}
      title="لم يتم العثور على نتائج"
      description="جرّب كلمات بحث مختلفة أو امسح البحث."
      action={
        <Button variant="outline" size="sm" onClick={onClear}>
          مسح البحث
        </Button>
      }
    />
  );
}

export function FilterEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <StateShell
      icon={SlidersHorizontal}
      title="لا توجد نتائج تطابق الفلاتر المحددة"
      description="عدّل الفلاتر أو امسحها لعرض جميع السجلات."
      action={
        <Button variant="outline" size="sm" onClick={onClear}>
          مسح الفلاتر
        </Button>
      }
    />
  );
}

export function ErrorState({
  message = "حدث خطأ أثناء تحميل البيانات",
  onRetry,
}: {
  message?: string | undefined;
  onRetry?: (() => void) | undefined;
}) {
  return (
    <StateShell
      icon={TriangleAlert}
      danger
      title={message}
      description="تعذر إكمال العملية، يمكنك إعادة المحاولة."
      action={
        onRetry ? (
          <Button variant="outline" size="sm" onClick={onRetry}>
            إعادة المحاولة
          </Button>
        ) : undefined
      }
    />
  );
}

export function LoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full rounded-lg" />
      ))}
    </div>
  );
}

/* ---------------- Section Card ---------------- */
export function SectionCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="min-w-0 truncate text-base font-semibold">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

/* ============================================================
 * Search / Filters / Sorting
 * ============================================================ */
export function SearchBar({
  value,
  onChange,
  placeholder = "ابحث...",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full sm:max-w-xs", className)}>
      <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="بحث"
        className="pe-9"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="مسح البحث"
          className="absolute start-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-muted-foreground hover:bg-muted"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

export type FieldType = "text" | "number" | "select" | "date";

export interface FilterField {
  key: string;
  label: string;
  type: FieldType;
  /** خيارات ديناميكية تُشتق من البيانات الفعلية */
  options?: { value: string; label: string }[] | undefined;
}

export type Operator =
  | "eq"
  | "neq"
  | "contains"
  | "ncontains"
  | "startsWith"
  | "endsWith"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "empty"
  | "nempty";

const operatorLabels: Record<Operator, string> = {
  eq: "يساوي",
  neq: "لا يساوي",
  contains: "يحتوي على",
  ncontains: "لا يحتوي على",
  startsWith: "يبدأ بـ",
  endsWith: "ينتهي بـ",
  gt: "أكبر من",
  lt: "أقل من",
  gte: "أكبر من أو يساوي",
  lte: "أقل من أو يساوي",
  empty: "فارغ",
  nempty: "غير فارغ",
};

const operatorsByType: Record<FieldType, Operator[]> = {
  text: ["contains", "ncontains", "eq", "neq", "startsWith", "endsWith", "empty", "nempty"],
  select: ["eq", "neq", "empty", "nempty"],
  number: ["eq", "neq", "gt", "lt", "gte", "lte", "empty", "nempty"],
  date: ["eq", "neq", "gt", "lt", "gte", "lte", "empty", "nempty"],
};

export interface FilterRule {
  id: string;
  field: string;
  operator: Operator;
  value: string;
}

function matchRule(raw: unknown, rule: FilterRule, type: FieldType) {
  const s = String(raw ?? "");
  const v = rule.value;
  switch (rule.operator) {
    case "empty":
      return s.trim() === "";
    case "nempty":
      return s.trim() !== "";
    case "eq":
      return s === v;
    case "neq":
      return s !== v;
    case "contains":
      return s.includes(v);
    case "ncontains":
      return !s.includes(v);
    case "startsWith":
      return s.startsWith(v);
    case "endsWith":
      return s.endsWith(v);
    default: {
      if (type === "date") {
        const a = new Date(s).getTime();
        const b = new Date(v).getTime();
        if (!Number.isFinite(a) || !Number.isFinite(b)) return true;
        return rule.operator === "gt" ? a > b : rule.operator === "lt" ? a < b : rule.operator === "gte" ? a >= b : a <= b;
      }
      const a = Number(s);
      const b = Number(v);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return true;
      return rule.operator === "gt" ? a > b : rule.operator === "lt" ? a < b : rule.operator === "gte" ? a >= b : a <= b;
    }
  }
}

function FilterRowEditor({
  fields,
  rule,
  onChange,
  onRemove,
}: {
  fields: FilterField[];
  rule: FilterRule;
  onChange: (r: FilterRule) => void;
  onRemove: () => void;
}) {
  const field = fields.find((f) => f.key === rule.field) ?? fields[0];
  const type = field?.type ?? "text";
  const ops = operatorsByType[type];
  const needsValue = rule.operator !== "empty" && rule.operator !== "nempty";

  return (
    <div className="space-y-1.5 rounded-lg border border-border/70 bg-muted/25 p-2">
      <div className="flex items-center gap-1.5">
        <Select
          value={rule.field}
          onValueChange={(v) => {
            const next = fields.find((f) => f.key === v);
            const nextOps = operatorsByType[next?.type ?? "text"];
            onChange({
              ...rule,
              field: v,
              operator: nextOps.includes(rule.operator) ? rule.operator : nextOps[0]!,
              value: "",
            });
          }}
        >
          <SelectTrigger className="h-8 text-[13px] w-full min-w-0 flex-1 [&>span]:truncate">
            <SelectValue placeholder="اسم العنصر" />
          </SelectTrigger>
          <SelectContent>
            {fields.map((f) => (
              <SelectItem key={f.key} value={f.key}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label="حذف الفلتر"
          className="shrink-0 hover:text-destructive"
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="grid gap-1.5">
        <Select value={rule.operator} onValueChange={(v) => onChange({ ...rule, operator: v as Operator })}>
          <SelectTrigger className="h-8 text-[13px] w-full min-w-0 [&>span]:truncate">
            <SelectValue placeholder="الشرط" />
          </SelectTrigger>
          <SelectContent>
            {ops.map((o) => (
              <SelectItem key={o} value={o}>
                {operatorLabels[o]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="w-full min-w-0">
          {!needsValue ? (
            <Input disabled placeholder="—" className="h-8 w-full text-sm" />
          ) : field?.type === "select" ? (
            <Select value={rule.value} onValueChange={(v) => onChange({ ...rule, value: v })}>
              <SelectTrigger className="h-8 text-[13px] w-full min-w-0 [&>span]:truncate">
                <SelectValue placeholder="القيمة" />
              </SelectTrigger>
              <SelectContent>
                {(field.options ?? []).length === 0 ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">لا توجد نتائج</div>
                ) : (
                  field.options!.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={field?.type === "number" ? "number" : field?.type === "date" ? "date" : "text"}
              value={rule.value}
              onChange={(e) => onChange({ ...rule, value: e.target.value })}
              placeholder="القيمة"
              className="h-8 w-full min-w-0 text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}


export function AdvancedFilters({
  fields,
  rules,
  onChange,
  activeCount,
}: {
  fields: FilterField[];
  rules: FilterRule[];
  onChange: (rules: FilterRule[]) => void;
  activeCount?: number;
}) {
  const badgeCount = activeCount ?? rules.length;
  const addRule = () => {
    const f = fields[0];
    if (!f) return;
    onChange([
      ...rules,
      { id: Math.random().toString(36).slice(2), field: f.key, operator: operatorsByType[f.type][0]!, value: "" },
    ]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="الفلاتر" className="relative shrink-0">
          <SlidersHorizontal className="size-4" />
          {badgeCount ? (
            <span className="absolute -top-1.5 -start-1.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
              {badgeCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(88vw,17rem)] overflow-hidden p-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold">الفلاتر المتقدمة</p>
          {badgeCount ? (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => onChange([])}>
              مسح الكل
            </Button>
          ) : null}
        </div>
        <Separator className="my-2" />
        {rules.length === 0 ? (
          <p className="py-3 text-center text-xs text-muted-foreground">لم تتم إضافة أي فلاتر بعد.</p>
        ) : (
          <div className="space-y-1.5">
            {rules.map((r) => (
              <FilterRowEditor
                key={r.id}
                fields={fields}
                rule={r}
                onChange={(nr) => onChange(rules.map((x) => (x.id === r.id ? nr : x)))}
                onRemove={() => onChange(rules.filter((x) => x.id !== r.id))}
              />
            ))}
          </div>
        )}
        <Button variant="outline" size="sm" className="mt-2 w-full" onClick={addRule}>
          + إضافة فلتر
        </Button>
      </PopoverContent>
    </Popover>
  );
}


export type DatePreset = "all" | "today" | "yesterday" | "7d" | "30d" | "month" | "prev-month" | "custom";

export interface DateRangeValue {
  preset: DatePreset;
  from?: string;
  to?: string;
}

const presetLabels: Record<DatePreset, string> = {
  all: "كل التواريخ",
  today: "اليوم",
  yesterday: "أمس",
  "7d": "آخر 7 أيام",
  "30d": "آخر 30 يومًا",
  month: "هذا الشهر",
  "prev-month": "الشهر السابق",
  custom: "نطاق مخصص",
};

export function resolveDateRange(v: DateRangeValue): { from?: Date | undefined; to?: Date | undefined } {
  const now = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  switch (v.preset) {
    case "today":
      return { from: startOfDay(now) };
    case "yesterday": {
      const y = startOfDay(new Date(now.getTime() - 86400000));
      return { from: y, to: new Date(y.getTime() + 86400000 - 1) };
    }
    case "7d":
      return { from: startOfDay(new Date(now.getTime() - 6 * 86400000)) };
    case "30d":
      return { from: startOfDay(new Date(now.getTime() - 29 * 86400000)) };
    case "month":
      return { from: new Date(now.getFullYear(), now.getMonth(), 1) };
    case "prev-month":
      return { from: new Date(now.getFullYear(), now.getMonth() - 1, 1), to: new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59) };
    case "custom":
      return { from: v.from ? new Date(v.from) : undefined, to: v.to ? new Date(`${v.to}T23:59:59`) : undefined };
    default:
      return {};
  }
}

export function DateFilter({ value, onChange }: { value: DateRangeValue; onChange: (v: DateRangeValue) => void }) {
  const presets: DatePreset[] = ["all", "today", "yesterday", "7d", "30d", "month", "prev-month", "custom"];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="فلتر التاريخ" className="relative shrink-0">
          <CalendarDays className="size-4" />
          {value.preset !== "all" ? <span className="absolute -top-1 -start-1 size-2.5 rounded-full bg-primary" /> : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-60 p-2">
        <div className="grid gap-1">
          {presets.map((p) => (
            <Button
              key={p}
              variant={value.preset === p ? "secondary" : "ghost"}
              size="sm"
              className="justify-start"
              onClick={() => onChange({ ...value, preset: p })}
            >
              {presetLabels[p]}
            </Button>
          ))}
        </div>
        {value.preset === "custom" ? (
          <div className="mt-2 grid gap-2 border-t pt-2">
            <div className="grid gap-1">
              <label className="text-xs text-muted-foreground">من</label>
              <Input type="date" value={value.from ?? ""} onChange={(e) => onChange({ ...value, from: e.target.value })} />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-muted-foreground">إلى</label>
              <Input type="date" value={value.to ?? ""} onChange={(e) => onChange({ ...value, to: e.target.value })} />
            </div>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

export interface SortOption<T> {
  value: string;
  label: string;
  compare: (a: T, b: T) => number;
}

/* ============================================================
 * Pagination
 * ============================================================ */
export function Pager({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="icon" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="السابق">
        <ChevronRight className="size-4" />
      </Button>
      <span className="px-3 text-sm tabular-nums">
        صفحة {page} من {pages}
      </span>
      <Button variant="outline" size="icon" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="التالي">
        <ChevronLeft className="size-4" />
      </Button>
    </div>
  );
}

/* ============================================================
 * Data View (Cards first, table when necessary)
 * ============================================================ */
export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  /** نوع الحقل لأغراض الفلاتر المتقدمة، الافتراضي نص */
  type?: FieldType;
  /** استبعاد العمود من الفلاتر المتقدمة (مثل أعمدة الإجراءات) */
  filterable?: boolean;
}

export interface FilterDef<T> {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  match: (row: T, value: string) => boolean;
}

function inferType(values: unknown[]): FieldType {
  const sample = values.find((v) => v !== undefined && v !== null && v !== "");
  if (typeof sample === "number") return "number";
  const s = String(sample ?? "");
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return "date";
  const unique = new Set(values.map((v) => String(v ?? "")));
  if (unique.size > 0 && unique.size <= 8) return "select";
  return "text";
}

export function DataTable<T>({
  data,
  columns,
  searchKeys = [],
  filters = [],
  pageSize = 8,
  toolbar,
  onRowClick,
  loading = false,
  error = false,
  onRetry,
  sortOptions = [],
  dateKey,
  bulkActions,
  getRowId,
  variant = "auto",
  searchPlaceholder = "ابحث...",
}: {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  filters?: FilterDef<T>[];
  pageSize?: number;
  toolbar?: React.ReactNode;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  error?: boolean;
  onRetry?: () => void;
  sortOptions?: SortOption<T>[];
  dateKey?: keyof T;
  bulkActions?: (selected: T[], clear: () => void) => React.ReactNode;
  getRowId?: (row: T, index: number) => string;
  /** auto = بطاقات منفصلة على كل المقاسات */
  variant?: "auto" | "table" | "cards";
  searchPlaceholder?: string;
}) {
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [legacy, setLegacy] = React.useState<Record<string, string>>({});
  const [rules, setRules] = React.useState<FilterRule[]>([]);
  const [dateValue, setDateValue] = React.useState<DateRangeValue>({ preset: "all" });
  const [sort, setSort] = React.useState<string>("");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const effectiveDateKey = React.useMemo(
    () =>
      dateKey ??
      (columns.find((c) => (c.type ?? inferType(data.map((r) => (r as Record<string, unknown>)[c.key]))) === "date")
        ?.key as keyof T | undefined),
    [dateKey, columns, data],
  );

  const rowId = React.useCallback((row: T, i: number) => getRowId?.(row, i) ?? String(i), [getRowId]);

  /* حقول الفلاتر المتقدمة تُشتق ديناميكيًا من الأعمدة والبيانات */
  const fields: FilterField[] = React.useMemo(() => {
    return columns
      .filter((c) => c.filterable !== false && c.key !== "actions")
      .map((c) => {
        const values = data.map((r) => (r as Record<string, unknown>)[c.key]);
        const type = c.type ?? inferType(values);
        const options =
          type === "select"
            ? Array.from(new Set(values.map((v) => String(v ?? "")).filter(Boolean)))
                .sort()
                .map((v) => ({ value: v, label: statusMap[v]?.label ?? v }))
            : undefined;
        return { key: c.key, label: c.header, type, options };
      });
  }, [columns, data]);

  const fieldType = React.useCallback(
    (key: string) => fields.find((f) => f.key === key)?.type ?? "text",
    [fields],
  );

  const searched = React.useMemo(() => {
    if (!q.trim()) return data;
    const needle = q.trim().toLowerCase();
    return data.filter((r) =>
      (searchKeys.length ? searchKeys : (Object.keys(r as object) as (keyof T)[])).some((k) =>
        String(r[k] ?? "").toLowerCase().includes(needle),
      ),
    );
  }, [data, q, searchKeys]);

  const filtered = React.useMemo(() => {
    let rows = searched;
    for (const f of filters) {
      const v = legacy[f.key];
      if (v && v !== "all") rows = rows.filter((r) => f.match(r, v));
    }
    for (const rule of rules) {
      const needsValue = rule.operator !== "empty" && rule.operator !== "nempty";
      if (needsValue && rule.value === "") continue;
      rows = rows.filter((r) => matchRule((r as Record<string, unknown>)[rule.field], rule, fieldType(rule.field)));
    }
    if (effectiveDateKey && dateValue.preset !== "all") {
      const { from, to } = resolveDateRange(dateValue);
      rows = rows.filter((r) => {
        const t = new Date(String(r[effectiveDateKey] ?? "")).getTime();
        if (!Number.isFinite(t)) return false;
        if (from && t < from.getTime()) return false;
        if (to && t > to.getTime()) return false;
        return true;
      });
    }
    const s = sortOptions.find((o) => o.value === sort);
    if (s) rows = [...rows].sort(s.compare);
    return rows;
  }, [searched, filters, legacy, rules, fieldType, effectiveDateKey, dateValue, sort, sortOptions]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * pageSize, current * pageSize);
  const activeFilterCount = rules.length + Object.values(legacy).filter((v) => v && v !== "all").length;

  const selectedRows = filtered.filter((r, i) => selected.has(rowId(r, i)));
  const clearSelection = () => setSelected(new Set());
  const toggleRow = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const showCheckbox = Boolean(bulkActions);
  const allOnPageSelected = slice.length > 0 && slice.every((r, i) => selected.has(rowId(r, (current - 1) * pageSize + i)));

  const framed = (node: React.ReactNode) => (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-card">{node}</div>
  );

  const body = () => {
    if (loading) return framed(<LoadingState />);
    if (error) return framed(<ErrorState onRetry={onRetry} />);
    if (slice.length === 0) {
      if (q.trim()) return framed(<SearchEmptyState onClear={() => setQ("")} />);
      if (activeFilterCount > 0 || dateValue.preset !== "all")
        return framed(
          <FilterEmptyState
            onClear={() => {
              setRules([]);
              setLegacy({});
              setDateValue({ preset: "all" });
            }}
          />,
        );
      return framed(<EmptyState />);
    }


    const cardList = (
      <ul className="grid items-stretch gap-3 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {slice.map((row, i) => {
          const idx = (current - 1) * pageSize + i;
          const id = rowId(row, idx);
          const [head, ...others] = columns;
          const actions = others.find((c) => c.key === "actions");
          const rest = others.filter((c) => c.key !== "actions");
          return (
            <li
              key={id}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "group flex h-full flex-col gap-1.5 rounded-xl border border-border/80 bg-card p-2.5 shadow-[0_3px_0_0_var(--sidebar-border),0_4px_10px_-3px_oklch(0.25_0.02_200/0.08)] transition-all duration-200",
                onRowClick && "cursor-pointer hover:-translate-y-1 hover:border-primary/40 hover:bg-muted/20 hover:shadow-[0_5px_0_0_var(--sidebar-border),0_12px_20px_-5px_oklch(0.25_0.02_200/0.14)]",
              )}
            >
              <div className="flex items-start gap-2">
                {showCheckbox ? (
                  <span onClick={(e) => e.stopPropagation()} className="pt-0.5">
                    <Checkbox checked={selected.has(id)} onCheckedChange={() => toggleRow(id)} aria-label="تحديد عنصر" />
                  </span>
                ) : null}
                <p className="min-w-0 flex-1 truncate text-xs font-semibold leading-snug">
                  {head ? (head.render ? head.render(row) : String((row as Record<string, unknown>)[head.key] ?? "—")) : null}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-2 gap-y-1.5 border-t border-border/60 pt-2">
                {rest.map((c) => (
                  <div key={c.key} className="min-w-0">
                    <dt className="truncate text-[10px] text-muted-foreground">{c.header}</dt>
                    <dd className="truncate text-[11px] font-medium">
                      {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "—")}
                    </dd>
                  </div>
                ))}
              </dl>
              {actions ? (
                <div
                  className="mt-auto flex flex-wrap items-center justify-end gap-1.5 border-t border-border/60 pt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {actions.render ? actions.render(row) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    );


    const table = (
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-muted/60">
            <tr>
              {showCheckbox ? (
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={() => {
                      setSelected((prev) => {
                        const next = new Set(prev);
                        slice.forEach((r, i) => {
                          const id = rowId(r, (current - 1) * pageSize + i);
                          if (allOnPageSelected) next.delete(id);
                          else next.add(id);
                        });
                        return next;
                      });
                    }}
                    aria-label="تحديد الكل"
                  />
                </th>
              ) : null}
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={cn("whitespace-nowrap px-4 py-3 font-semibold text-muted-foreground", c.className)}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => {
              const id = rowId(row, (current - 1) * pageSize + i);
              return (
                <tr
                  key={id}
                  onClick={() => onRowClick?.(row)}
                  className={cn("border-t transition-colors hover:bg-muted/40", onRowClick && "cursor-pointer")}
                >
                  {showCheckbox ? (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={selected.has(id)} onCheckedChange={() => toggleRow(id)} aria-label="تحديد عنصر" />
                    </td>
                  ) : null}
                  {columns.map((c) => (
                    <td key={c.key} className={cn("max-w-[220px] truncate px-4 py-3", c.className)}>
                      {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key] ?? "—")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );


    if (variant === "table") return framed(table);
    return cardList;

  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <SearchBar
            value={q}
            onChange={(v) => {
              setQ(v);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
          />
          {fields.length ? (
            <AdvancedFilters
              fields={fields}
              rules={rules}
              activeCount={activeFilterCount}
              onChange={(r) => {
                setRules(r);
                setPage(1);
              }}
            />
          ) : null}
          {effectiveDateKey ? (
            <DateFilter
              value={dateValue}
              onChange={(v) => {
                setDateValue(v);
                setPage(1);
              }}
            />
          ) : null}
          {sortOptions.length ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" aria-label="الترتيب" className="relative shrink-0">
                  <ArrowDownUp className="size-4" />
                  {sort ? <span className="absolute -top-1 -start-1 size-2.5 rounded-full bg-primary" /> : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-52 p-1.5">
                <div className="grid gap-0.5">
                  {sortOptions.map((o) => (
                    <Button
                      key={o.value}
                      variant={sort === o.value ? "secondary" : "ghost"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setSort(sort === o.value ? "" : o.value)}
                    >
                      {o.label}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : null}

        </div>
        {toolbar}
      </div>

      {bulkActions && selectedRows.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/80 bg-primary/5 p-3">
          <span className="text-sm font-medium">تم تحديد {selectedRows.length} عنصر</span>
          <div className="flex flex-wrap items-center gap-2">{bulkActions(selectedRows, clearSelection)}</div>
          <Button variant="ghost" size="sm" className="ms-auto" onClick={clearSelection}>
            إلغاء التحديد
          </Button>
        </div>
      ) : null}

      {body()}

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          عرض {slice.length} من {filtered.length} سجل
        </p>
        <Pager page={current} pages={pages} onChange={setPage} />
      </div>
    </div>
  );
}

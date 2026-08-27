import * as React from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Bell,
  CheckCircle2,
  Clock,
  Eye,
  Gauge,
  Pencil,
  Plus,
  Share2,
  ShoppingCart,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KpiCard, DataTable, SectionCard, StatusBadge, ScorePill, EmptyState, type Column } from "@/components/app/ui-kit";
import { TrendSummary, RankedList, DistributionList } from "@/components/app/data-display";
import {
  activityLog,
  auditLog,
  callCenterPerformance,
  callCenters,
  complaints,
  dataSources,
  distributionRules,
  employeePerformance,
  employees,
  formatDate,
  formatMoney,
  formatNumber,
  incentives,
  notifications,
  orders,
  ordersTrend,
  sellerPerformance,
  sellerProducts,
  sellers,
  statusDistribution,
  transactions,
  type ActivityItem,
  type AuditItem,
  type CallCenter,
  type Complaint,
  type DataSource,
  type DistributionRule,
  type Employee,
  type Incentive,
  type Notification,
  type Order,
  type Seller,
  type Transaction,
} from "@/lib/mock-data";

const AnyLink = Link as unknown as React.FC<Record<string, unknown>>;

function RowActions({ label, extra }: { label: string; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1">
      {extra}
      <Button variant="ghost" size="icon" onClick={() => toast.info(`تعديل: ${label}`)} aria-label="تعديل">
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive"
        onClick={() => toast.warning(`تأكيد حذف ${label}؟`, { action: { label: "حذف", onClick: () => toast.success("تم الحذف") } })}
        aria-label="حذف"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

const statusFilter = {
  key: "status",
  label: "الحالة",
  options: [
    { value: "active", label: "مفعل" },
    { value: "inactive", label: "معطل" },
    { value: "pending", label: "معلق" },
  ],
};

/* ================= Sellers ================= */
export function AdminSellers() {
  const columns: Column<Seller>[] = [
    {
      key: "name",
      header: "الاسم",
      render: (r) => (
        <AnyLink to="/admin/sellers/$id" params={{ id: r.id }} className="font-medium text-primary hover:underline">
          {r.name}
        </AnyLink>
      ),
    },
    { key: "company", header: "الشركة" },
    { key: "phone", header: "الهاتف" },
    { key: "email", header: "البريد" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "orders", header: "الطلبات", render: (r) => formatNumber(r.orders) },
    { key: "sales", header: "المبيعات", render: (r) => formatMoney(r.sales) },
    { key: "score", header: "Score", render: (r) => <ScorePill score={r.score} /> },
    { key: "wallet", header: "المحفظة", render: (r) => formatMoney(r.wallet) },
    { key: "actions", header: "إجراءات", render: (r) => <RowActions label={r.company} /> },
  ];
  return (
    <DataTable
      data={sellers}
      columns={columns}
      searchKeys={["name", "company", "phone", "email"]}
      filters={[{ ...statusFilter, match: (r: Seller, v) => r.status === v }]}
    />
  );
}

function DetailTabs({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode }[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.key ?? "a"} className="space-y-4">
      <div className="overflow-x-auto">
        <TabsList className="w-max">
          {tabs.map((t) => (
            <TabsTrigger key={t.key} value={t.key}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((t) => (
        <TabsContent key={t.key} value={t.key}>
          {t.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

function InfoGrid({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs text-muted-foreground">{k}</p>
          <p className="mt-1 font-semibold">{v}</p>
        </div>
      ))}
    </div>
  );
}

export function AdminSellerDetail({ id }: { id: string }) {
  const seller = sellers.find((s) => s.id === id);
  if (!seller) return <EmptyState title="السيلر غير موجود" description="تأكد من رقم السيلر المطلوب." />;
  const sellerOrders = orders.filter((_, i) => i % 4 === 0).slice(0, 10);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">{seller.company}</h2>
        <StatusBadge status={seller.status} />
        <ScorePill score={seller.score} />
        <span className="text-sm text-muted-foreground">{seller.id}</span>
      </div>
      <DetailTabs
        tabs={[
          {
            key: "info",
            label: "البيانات الأساسية",
            content: (
              <InfoGrid
                items={[
                  ["المسؤول", seller.name],
                  ["البريد", seller.email],
                  ["الهاتف", seller.phone],
                  ["المدينة", seller.city],
                  ["تاريخ الانضمام", formatDate(seller.createdAt)],
                  ["إجمالي المبيعات", formatMoney(seller.sales)],
                ]}
              />
            ),
          },
          { key: "orders", label: "الطلبات", content: <OrdersTable data={sellerOrders} /> },
          {
            key: "products",
            label: "المنتجات",
            content: <SellerProductsTable />,
          },
          { key: "complaints", label: "الشكاوى", content: <ComplaintsTable data={complaints.slice(0, 8)} /> },
          {
            key: "wallet",
            label: "المحفظة",
            content: <TransactionsTable data={transactions.slice(0, 10)} />,
          },
          {
            key: "score",
            label: "Score",
            content: (
              <SectionCard title="تطور التقييم">
                <TrendSummary data={ordersTrend} xKey="name" yKey="orders" name="الطلبات المؤكدة" />
              </SectionCard>
            ),
          },
          {
            key: "incentives",
            label: "الحوافز",
            content: <IncentivesTable />,
          },
          { key: "activity", label: "النشاط", content: <ActivityTable data={activityLog.slice(0, 10)} /> },
        ]}
      />
    </div>
  );
}

/* ================= Call centers ================= */
export function AdminCallCenters() {
  const columns: Column<CallCenter>[] = [
    {
      key: "name",
      header: "المركز",
      render: (r) => (
        <AnyLink to="/admin/call-centers/$id" params={{ id: r.id }} className="font-medium text-primary hover:underline">
          {r.name}
        </AnyLink>
      ),
    },
    { key: "manager", header: "المسؤول" },
    { key: "phone", header: "الهاتف" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "employees", header: "الموظفون" },
    { key: "orders", header: "الطلبات", render: (r) => formatNumber(r.orders) },
    { key: "performance", header: "الأداء", render: (r) => `${r.performance}%` },
    { key: "score", header: "Score", render: (r) => <ScorePill score={r.score} /> },
    { key: "actions", header: "إجراءات", render: (r) => <RowActions label={r.name} /> },
  ];
  return (
    <DataTable
      data={callCenters}
      columns={columns}
      searchKeys={["name", "manager", "phone"]}
      filters={[{ ...statusFilter, match: (r: CallCenter, v) => r.status === v }]}
      toolbar={
        <Button className="gap-2" onClick={() => toast.info("نموذج إضافة مركز اتصال")}>
          <Plus className="size-4" /> إضافة مركز
        </Button>
      }
    />
  );
}

export function AdminCallCenterDetail({ id }: { id: string }) {
  const cc = callCenters.find((c) => c.id === id);
  if (!cc) return <EmptyState title="مركز الاتصال غير موجود" description="تأكد من رقم المركز المطلوب." />;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">{cc.name}</h2>
        <StatusBadge status={cc.status} />
        <ScorePill score={cc.score} />
        <span className="text-sm text-muted-foreground">{cc.id}</span>
      </div>
      <DetailTabs
        tabs={[
          {
            key: "info",
            label: "البيانات الأساسية",
            content: (
              <InfoGrid
                items={[
                  ["المسؤول", cc.manager],
                  ["الهاتف", cc.phone],
                  ["عدد الموظفين", String(cc.employees)],
                  ["الطلبات", formatNumber(cc.orders)],
                  ["الأداء", `${cc.performance}%`],
                  ["تاريخ الانضمام", formatDate(cc.createdAt)],
                ]}
              />
            ),
          },
          { key: "emp", label: "الموظفون", content: <EmployeesTable data={employees.slice(0, 12)} /> },
          { key: "orders", label: "الطلبات", content: <OrdersTable data={orders.slice(0, 12)} /> },
          { key: "complaints", label: "الشكاوى", content: <ComplaintsTable data={complaints.slice(0, 8)} /> },
          { key: "wallet", label: "المحفظة", content: <TransactionsTable data={transactions.slice(0, 10)} /> },
          {
            key: "perf",
            label: "الأداء",
            content: (
              <SectionCard title="أداء الموظفين">
                <RankedList data={employeePerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
              </SectionCard>
            ),
          },
          {
            key: "score",
            label: "Score",
            content: (
              <SectionCard title="تطور التقييم">
                <TrendSummary data={ordersTrend} xKey="name" yKey="orders" name="الطلبات" />
              </SectionCard>
            ),
          },
          { key: "activity", label: "النشاط", content: <ActivityTable data={activityLog.slice(0, 10)} /> },
        ]}
      />
    </div>
  );
}

/* ================= Employees ================= */
function EmployeesTable({ data }: { data: Employee[] }) {
  const columns: Column<Employee>[] = [
    { key: "id", header: "الرقم" },
    { key: "name", header: "الاسم" },
    { key: "callCenter", header: "مركز الاتصال" },
    { key: "role", header: "الدور" },
    { key: "phone", header: "الهاتف" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "orders", header: "الطلبات" },
    { key: "score", header: "Score", render: (r) => <ScorePill score={r.score} /> },
    { key: "actions", header: "إجراءات", render: (r) => <RowActions label={r.name} /> },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      searchKeys={["name", "callCenter", "phone", "role"]}
      filters={[
        { ...statusFilter, match: (r: Employee, v) => r.status === v },
        {
          key: "cc",
          label: "مركز الاتصال",
          options: [...new Set(employees.map((e) => e.callCenter))].map((c) => ({ value: c, label: c })),
          match: (r: Employee, v) => r.callCenter === v,
        },
      ]}
      toolbar={
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" /> إضافة موظف
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة موظف</DialogTitle>
              <DialogDescription>اربط الموظف بمركز اتصال وحدد دوره.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>الاسم</Label>
                <Input placeholder="اسم الموظف" />
              </div>
              <div className="space-y-2">
                <Label>مركز الاتصال</Label>
                <Input placeholder="اسم المركز" />
              </div>
              <div className="space-y-2">
                <Label>الدور</Label>
                <Input placeholder="موظف مبيعات" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => toast.success("تم إضافة الموظف")}>حفظ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    />
  );
}

export function AdminEmployees() {
  return <EmployeesTable data={employees} />;
}

/* ================= Orders ================= */
function OrdersTable({ data }: { data: Order[] }) {
  const columns: Column<Order>[] = [
    {
      key: "id",
      header: "رقم الطلب",
      render: (r) => (
        <AnyLink to="/admin/orders/$id" params={{ id: r.id }} className="font-medium text-primary hover:underline">
          {r.id}
        </AnyLink>
      ),
    },
    { key: "customer", header: "العميل" },
    { key: "seller", header: "السيلر" },
    { key: "callCenter", header: "مركز الاتصال" },
    { key: "employee", header: "الموظف" },
    { key: "product", header: "المنتج" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "amount", header: "المبلغ", render: (r) => formatMoney(r.amount) },
    { key: "createdAt", header: "الإنشاء", render: (r) => formatDate(r.createdAt) },
    { key: "updatedAt", header: "آخر تحديث", render: (r) => formatDate(r.updatedAt) },
    {
      key: "actions",
      header: "إجراءات",
      render: (r) => (
        <RowActions
          label={r.id}
          extra={
            <Button variant="ghost" size="icon" onClick={() => toast.info(`توزيع الطلب ${r.id}`)} aria-label="توزيع">
              <Share2 className="size-4" />
            </Button>
          }
        />
      ),
    },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      searchKeys={["id", "customer", "seller", "product"]}
      filters={[
        {
          key: "status",
          label: "الحالة",
          options: [
            { value: "new", label: "جديد" },
            { value: "processing", label: "قيد المعالجة" },
            { value: "completed", label: "مكتمل" },
            { value: "pending", label: "معلق" },
            { value: "cancelled", label: "ملغي" },
          ],
          match: (r: Order, v) => r.status === v,
        },
        {
          key: "seller",
          label: "السيلر",
          options: [...new Set(orders.map((o) => o.seller))].slice(0, 12).map((s) => ({ value: s, label: s })),
          match: (r: Order, v) => r.seller === v,
        },
        {
          key: "cc",
          label: "مركز الاتصال",
          options: [...new Set(orders.map((o) => o.callCenter))].slice(0, 12).map((s) => ({ value: s, label: s })),
          match: (r: Order, v) => r.callCenter === v,
        },
      ]}
    />
  );
}

export function AdminOrders() {
  return <OrdersTable data={orders} />;
}

export function AdminOrderDetail({ id }: { id: string }) {
  const order = orders.find((o) => o.id === id);
  const [note, setNote] = React.useState("");
  if (!order) return <EmptyState title="الطلب غير موجود" description="تأكد من رقم الطلب المطلوب." />;
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold">تفاصيل الطلب {order.id}</h3>
            <StatusBadge status={order.status} />
          </div>
          <InfoGrid
            items={[
              ["العميل", order.customer],
              ["الهاتف", order.phone],
              ["المنتج", order.product],
              ["المبلغ", formatMoney(order.amount)],
              ["السيلر", order.seller],
              ["مركز الاتصال", order.callCenter],
              ["الموظف", order.employee],
              ["تاريخ الإنشاء", formatDate(order.createdAt)],
              ["آخر تحديث", formatDate(order.updatedAt)],
            ]}
          />
        </div>
        <SectionCard title="ملاحظات الطلب">
          <div className="space-y-3">
            <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="أضف ملاحظة على الطلب..." />
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (!note.trim()) {
                    toast.error("الملاحظة فارغة");
                    return;
                  }
                  setNote("");
                  toast.success("تمت إضافة الملاحظة");
                }}
              >
                إضافة ملاحظة
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>
      <div className="space-y-5">
        <SectionCard title="إجراءات سريعة">
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => toast.info("تغيير حالة الطلب")}>
              تغيير الحالة
            </Button>
            <Button variant="outline" onClick={() => toast.info("إعادة توزيع الطلب")}>
              إعادة التوزيع
            </Button>
            <Button variant="outline" onClick={() => toast.success("تم تحديث بيانات الطلب")}>
              تعديل الطلب
            </Button>
          </div>
        </SectionCard>
        <SectionCard title="سجل الطلب">
          <ol className="space-y-4 border-s ps-4">
            {["تم استلام الطلب", "تم التوزيع على مركز الاتصال", "تم الاتصال بالعميل", "تحديث الحالة"].map((s, i) => (
              <li key={s} className="relative text-sm">
                <span className="absolute -start-[21px] top-1.5 size-2 rounded-full bg-primary" />
                <p className="font-medium">{s}</p>
                <p className="text-xs text-muted-foreground">{formatDate(orders[i]?.createdAt ?? order.createdAt)}</p>
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>
    </div>
  );
}

/* ================= Complaints ================= */
function ComplaintsTable({ data }: { data: Complaint[] }) {
  const columns: Column<Complaint>[] = [
    { key: "id", header: "رقم الشكوى" },
    { key: "customer", header: "العميل" },
    { key: "orderId", header: "الطلب" },
    { key: "seller", header: "السيلر" },
    { key: "callCenter", header: "مركز الاتصال" },
    { key: "priority", header: "الأولوية", render: (r) => <StatusBadge status={r.priority} /> },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "employee", header: "الموظف" },
    { key: "subject", header: "الموضوع" },
    { key: "createdAt", header: "التاريخ", render: (r) => formatDate(r.createdAt) },
    {
      key: "actions",
      header: "إجراءات",
      render: (r) => (
        <Button variant="ghost" size="icon" onClick={() => toast.info(`عرض الشكوى ${r.id}`)} aria-label="عرض">
          <Eye className="size-4" />
        </Button>
      ),
    },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      searchKeys={["id", "customer", "orderId", "subject"]}
      filters={[
        {
          key: "status",
          label: "الحالة",
          options: [
            { value: "new", label: "جديدة" },
            { value: "processing", label: "قيد المعالجة" },
            { value: "resolved", label: "تم الحل" },
            { value: "closed", label: "مغلقة" },
          ],
          match: (r: Complaint, v) => r.status === v,
        },
        {
          key: "priority",
          label: "الأولوية",
          options: [
            { value: "عالية", label: "عالية" },
            { value: "متوسطة", label: "متوسطة" },
            { value: "منخفضة", label: "منخفضة" },
          ],
          match: (r: Complaint, v) => r.priority === v,
        },
      ]}
    />
  );
}

export function AdminComplaints() {
  return <ComplaintsTable data={complaints} />;
}

/* ================= Distribution rules ================= */
export function AdminDistributionRules() {
  const columns: Column<DistributionRule>[] = [
    { key: "priority", header: "الأولوية" },
    { key: "name", header: "اسم القاعدة" },
    { key: "source", header: "المصدر" },
    { key: "condition", header: "الشرط" },
    { key: "target", header: "الوجهة" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "toggle",
      header: "تفعيل",
      render: (r) => <Switch defaultChecked={r.status === "active"} onCheckedChange={() => toast.success("تم تحديث حالة القاعدة")} />,
    },
    { key: "actions", header: "إجراءات", render: (r) => <RowActions label={r.name} /> },
  ];
  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-center gap-3 p-5 text-sm font-medium">
          {["مصدر البيانات", "قاعدة التوزيع", "سيلر / مركز اتصال", "الموظف"].map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <span className="text-muted-foreground">←</span>}
              <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                {s}
              </Badge>
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
      <DataTable
        data={distributionRules}
        columns={columns}
        searchKeys={["name", "condition", "target"]}
        toolbar={
          <Button className="gap-2" onClick={() => toast.info("نموذج إنشاء قاعدة توزيع")}>
            <Plus className="size-4" /> إنشاء قاعدة
          </Button>
        }
      />
    </div>
  );
}

/* ================= Data sources ================= */
export function AdminDataSources() {
  const columns: Column<DataSource>[] = [
    { key: "id", header: "الرقم" },
    { key: "name", header: "اسم المصدر" },
    { key: "type", header: "النوع" },
    { key: "records", header: "عدد البيانات", render: (r) => formatNumber(r.records) },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "createdAt", header: "تاريخ الإنشاء", render: (r) => formatDate(r.createdAt) },
    { key: "actions", header: "الإعدادات", render: (r) => <RowActions label={r.name} /> },
  ];
  return (
    <DataTable
      data={dataSources}
      columns={columns}
      searchKeys={["name", "type"]}
      toolbar={
        <Button className="gap-2" onClick={() => toast.info("نموذج ربط مصدر بيانات")}>
          <Plus className="size-4" /> ربط مصدر
        </Button>
      }
    />
  );
}

/* ================= Scoring ================= */
export function AdminScoring() {
  const ranking = [...sellers].sort((a, b) => b.score - a.score).slice(0, 10);
  const columns: Column<Seller>[] = [
    { key: "rank", header: "الترتيب", render: (r) => `#${ranking.indexOf(r) + 1}` },
    { key: "company", header: "السيلر" },
    { key: "orders", header: "الطلبات" },
    { key: "sales", header: "المبيعات", render: (r) => formatMoney(r.sales) },
    { key: "score", header: "Score", render: (r) => <ScorePill score={r.score} /> },
    { key: "createdAt", header: "تاريخ التقييم", render: (r) => formatDate(r.createdAt) },
  ];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <KpiCard title="متوسط Score السيلرز" value={`${Math.round(sellers.reduce((s, x) => s + x.score, 0) / sellers.length)}%`} icon={Gauge} tone="info" />
        <KpiCard title="متوسط Score مراكز الاتصال" value={`${Math.round(callCenters.reduce((s, x) => s + x.score, 0) / callCenters.length)}%`} icon={TrendingUp} tone="success" />
        <KpiCard title="متوسط Score الموظفين" value={`${Math.round(employees.reduce((s, x) => s + x.score, 0) / employees.length)}%`} icon={TrendingDown} tone="warning" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="أداء السيلرز">
          <RankedList data={sellerPerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
        </SectionCard>
        <SectionCard title="أداء مراكز الاتصال">
          <RankedList data={callCenterPerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
        </SectionCard>
        <SectionCard title="أداء الموظفين">
          <RankedList data={employeePerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
        </SectionCard>
        <SectionCard title="توزيع الطلبات حسب الحالة">
          <DistributionList data={statusDistribution} />
        </SectionCard>
      </div>
      <SectionCard title="ترتيب السيلرز حسب التقييم">
        <DataTable data={ranking} columns={columns} searchKeys={["company"]} pageSize={10} />
      </SectionCard>
    </div>
  );
}

/* ================= Incentives ================= */
function IncentivesTable() {
  const columns: Column<Incentive>[] = [
    { key: "name", header: "البرنامج" },
    { key: "target", header: "الفئة المستهدفة" },
    { key: "condition", header: "الشروط" },
    { key: "goal", header: "الهدف" },
    { key: "reward", header: "المكافأة" },
    { key: "start", header: "البداية", render: (r) => formatDate(r.start) },
    { key: "end", header: "النهاية", render: (r) => formatDate(r.end) },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", header: "إجراءات", render: (r) => <RowActions label={r.name} /> },
  ];
  return (
    <DataTable
      data={incentives}
      columns={columns}
      searchKeys={["name", "target"]}
      toolbar={
        <Button className="gap-2" onClick={() => toast.info("نموذج إنشاء برنامج حوافز")}>
          <Plus className="size-4" /> برنامج حوافز
        </Button>
      }
    />
  );
}

export function AdminIncentives() {
  return <IncentivesTable />;
}

/* ================= Wallets ================= */
function TransactionsTable({ data }: { data: Transaction[] }) {
  const columns: Column<Transaction>[] = [
    { key: "id", header: "رقم العملية" },
    { key: "account", header: "الحساب" },
    { key: "type", header: "النوع" },
    { key: "amount", header: "المبلغ", render: (r) => formatMoney(r.amount) },
    { key: "balanceAfter", header: "الرصيد بعد العملية", render: (r) => formatMoney(r.balanceAfter) },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "createdAt", header: "التاريخ", render: (r) => formatDate(r.createdAt) },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      searchKeys={["id", "account", "type"]}
      filters={[
        {
          key: "type",
          label: "النوع",
          options: ["إيداع", "سحب", "عمولة", "تسوية"].map((t) => ({ value: t, label: t })),
          match: (r: Transaction, v) => r.type === v,
        },
        {
          key: "status",
          label: "الحالة",
          options: [
            { value: "completed", label: "مكتمل" },
            { value: "pending", label: "معلق" },
            { value: "cancelled", label: "ملغي" },
          ],
          match: (r: Transaction, v) => r.status === v,
        },
      ]}
    />
  );
}

export function AdminWallets() {
  const totalBalance = sellers.reduce((s, x) => s + x.wallet, 0) + callCenters.reduce((s, x) => s + x.wallet, 0);
  const deposits = transactions.filter((t) => t.type === "إيداع").reduce((s, t) => s + t.amount, 0);
  const withdrawals = transactions.filter((t) => t.type === "سحب").reduce((s, t) => s + t.amount, 0);
  const pending = transactions.filter((t) => t.status === "pending").length;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <KpiCard title="إجمالي الأرصدة" value={formatMoney(totalBalance)} icon={Wallet} />
        <KpiCard title="إجمالي الإيداعات" value={formatMoney(deposits)} icon={TrendingUp} tone="success" />
        <KpiCard title="إجمالي السحوبات" value={formatMoney(withdrawals)} icon={TrendingDown} tone="danger" />
        <KpiCard title="المعاملات المعلقة" value={pending} icon={Clock} tone="warning" />
      </div>
      <SectionCard title="المعاملات المالية">
        <TransactionsTable data={transactions} />
      </SectionCard>
    </div>
  );
}

/* ================= Notifications ================= */
export function NotificationsPage() {
  const [items, setItems] = React.useState<Notification[]>(notifications);
  const view = (filter: "all" | "read" | "unread") => {
    const rows = items.filter((n) => (filter === "all" ? true : filter === "read" ? n.read : !n.read));
    if (rows.length === 0) return <EmptyState title="لا توجد إشعارات" description="ستظهر الإشعارات الجديدة هنا." />;
    return (
      <div className="space-y-3">
        {rows.map((n) => (
          <Card key={n.id} className={n.read ? "" : "border-primary/40 bg-primary/[0.03]"}>
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bell className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{n.title}</p>
                  <Badge variant="secondary" className="rounded-full">
                    {n.type}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatDate(n.createdAt)}</p>
              </div>
              <div className="flex items-center gap-1">
                {!n.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setItems((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
                      toast.success("تم التحديد كمقروء");
                    }}
                  >
                    <CheckCircle2 className="size-4" /> مقروء
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => {
                    setItems((p) => p.filter((x) => x.id !== n.id));
                    toast.success("تم حذف الإشعار");
                  }}
                  aria-label="حذف"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TabsList>
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="unread">غير المقروءة</TabsTrigger>
          <TabsTrigger value="read">المقروءة</TabsTrigger>
        </TabsList>
        <Button
          variant="outline"
          onClick={() => {
            setItems((p) => p.map((x) => ({ ...x, read: true })));
            toast.success("تم تحديد الكل كمقروء");
          }}
        >
          تحديد الكل كمقروء
        </Button>
      </div>
      <TabsContent value="all">{view("all")}</TabsContent>
      <TabsContent value="unread">{view("unread")}</TabsContent>
      <TabsContent value="read">{view("read")}</TabsContent>
    </Tabs>
  );
}

/* ================= Logs ================= */
function ActivityTable({ data }: { data: ActivityItem[] }) {
  const columns: Column<ActivityItem>[] = [
    { key: "user", header: "المستخدم" },
    { key: "action", header: "العملية" },
    { key: "module", header: "القسم" },
    { key: "description", header: "الوصف" },
    { key: "ip", header: "IP" },
    { key: "createdAt", header: "التاريخ", render: (r) => formatDate(r.createdAt) },
  ];
  return <DataTable data={data} columns={columns} searchKeys={["user", "action", "module", "description"]} />;
}

export function AdminActivityLog() {
  return <ActivityTable data={activityLog} />;
}

export function AdminAuditLog() {
  const columns: Column<AuditItem>[] = [
    { key: "user", header: "المستخدم" },
    { key: "action", header: "العملية" },
    { key: "resource", header: "المورد" },
    { key: "oldValue", header: "القيمة القديمة", render: (r) => <span className="text-destructive">{r.oldValue}</span> },
    { key: "newValue", header: "القيمة الجديدة", render: (r) => <span className="text-emerald-600">{r.newValue}</span> },
    { key: "createdAt", header: "التاريخ والوقت", render: (r) => formatDate(r.createdAt) },
  ];
  return <DataTable data={auditLog} columns={columns} searchKeys={["user", "action", "resource"]} />;
}

/* ================= Seller products (shared) ================= */
type Product = (typeof sellerProducts)[number];

export function SellerProductsTable() {
  const columns: Column<Product>[] = [
    { key: "id", header: "الرقم" },
    { key: "name", header: "المنتج" },
    { key: "sku", header: "SKU" },
    { key: "price", header: "السعر", render: (r) => formatMoney(r.price) },
    { key: "stock", header: "المخزون" },
    { key: "sold", header: "المباع" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", header: "إجراءات", render: (r) => <RowActions label={r.name} /> },
  ];
  return (
    <DataTable
      data={sellerProducts}
      columns={columns}
      searchKeys={["name", "sku"]}
      toolbar={
        <Button className="gap-2" onClick={() => toast.info("نموذج إضافة منتج")}>
          <Plus className="size-4" /> إضافة منتج
        </Button>
      }
    />
  );
}

export { OrdersTable, ComplaintsTable, TransactionsTable, ActivityTable, EmployeesTable, IncentivesTable, InfoGrid, DetailTabs };

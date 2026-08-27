import * as React from "react";
import { toast } from "sonner";
import {
  Activity,
  CheckCircle2,
  Clock,
  Headphones,
  Pencil,
  Plus,
  ShoppingCart,
  Store,
  Trash2,
  TrendingUp,
  UserCog,
  Users as UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard, DataTable, SectionCard, StatusBadge, ScorePill, type Column } from "@/components/app/ui-kit";
import { TrendSummary, RankedList, DistributionList, ComparisonTable } from "@/components/app/data-display";
import {
  activityLog,
  adminUsers,
  callCenterPerformance,
  callCenters,
  complaints,
  employees,
  formatDate,
  formatMoney,
  formatNumber,
  orders,
  ordersTrend,
  permissionActions,
  permissionModules,
  roles,
  sellerPerformance,
  sellers,
  statusDistribution,
  type AdminUser,
  type RoleItem,
} from "@/lib/mock-data";

/* ============ Dashboard ============ */
export function AdminDashboard() {
  const totalSales = sellers.reduce((s, x) => s + x.sales, 0);
  const recent = orders.slice(0, 6);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <KpiCard title="إجمالي الطلبات" value={formatNumber(1380)} icon={ShoppingCart} hint="خلال آخر 30 يومًا" />
        <KpiCard title="الطلبات الجديدة" value={formatNumber(320)} icon={TrendingUp} tone="info" />
        <KpiCard title="الطلبات المكتملة" value={formatNumber(640)} icon={CheckCircle2} tone="success" />
        <KpiCard title="الطلبات المعلقة" value={formatNumber(120)} icon={Clock} tone="warning" />
        <KpiCard title="إجمالي السيلرز" value={formatNumber(sellers.length)} icon={Store} />
        <KpiCard title="مراكز الاتصال" value={formatNumber(callCenters.length)} icon={Headphones} />
        <KpiCard title="الموظفون" value={formatNumber(employees.length)} icon={UserCog} />
        <KpiCard title="إجمالي المبيعات" value={formatMoney(totalSales)} icon={Activity} tone="success" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="الطلبات خلال الفترة">
          <TrendSummary data={ordersTrend} xKey="name" yKey="orders" name="الطلبات" />
        </SectionCard>
        <SectionCard title="المبيعات خلال الفترة">
          <TrendSummary data={ordersTrend} xKey="name" yKey="sales" name="المبيعات" />
        </SectionCard>
        <SectionCard title="أداء السيلرز">
          <RankedList data={sellerPerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
        </SectionCard>
        <SectionCard title="أداء مراكز الاتصال">
          <RankedList data={callCenterPerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
        </SectionCard>
        <SectionCard title="توزيع الطلبات حسب الحالة">
          <DistributionList data={statusDistribution} />
        </SectionCard>
        <SectionCard title="اتجاه الطلبات والمبيعات">
          <ComparisonTable
            data={ordersTrend}
            xKey="name"
            lines={[
              { key: "orders", name: "الطلبات" },
              { key: "sales", name: "المبيعات" },
            ]}
          />
        </SectionCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="أحدث الطلبات" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="py-2 font-medium">رقم الطلب</th>
                  <th className="py-2 font-medium">العميل</th>
                  <th className="py-2 font-medium">المركز</th>
                  <th className="py-2 font-medium">الحالة</th>
                  <th className="py-2 font-medium">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="py-2.5 font-medium">{o.id}</td>
                    <td className="py-2.5">{o.customer}</td>
                    <td className="py-2.5">{o.callCenter}</td>
                    <td className="py-2.5">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="py-2.5">{formatMoney(o.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="آخر الأنشطة">
            <ul className="space-y-3">
              {activityLog.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{a.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.user} · {formatDate(a.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="آخر الشكاوى">
            <ul className="space-y-3">
              {complaints.slice(0, 5).map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">{c.customer}</p>
                  </div>
                  <StatusBadge status={c.priority} />
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

/* ============ Users ============ */
function UserFormDialog({ trigger, title }: { trigger: React.ReactNode; title: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            حسابات الإدارة تُنشأ من داخل لوحة الأدمن فقط ولا تتوفر عبر التسجيل العام.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>الاسم</Label>
            <Input placeholder="اسم المستخدم" />
          </div>
          <div className="space-y-2">
            <Label>البريد الإلكتروني</Label>
            <Input type="email" placeholder="user@kassebni.com" />
          </div>
          <div className="space-y-2">
            <Label>الهاتف</Label>
            <Input placeholder="01xxxxxxxxx" />
          </div>
          <div className="space-y-2">
            <Label>الدور</Label>
            <Select defaultValue="مشرف">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.id} value={r.name}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>كلمة المرور</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>تأكيد كلمة المرور</Label>
            <Input type="password" />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Switch id="st" defaultChecked />
            <Label htmlFor="st" className="font-normal">
              الحساب مفعل
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              toast.success("تم حفظ بيانات المستخدم");
            }}
          >
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmDelete({ label }: { label: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive">
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
          <AlertDialogDescription>هل أنت متأكد من حذف {label}؟ لا يمكن التراجع عن هذا الإجراء.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={() => toast.success("تم الحذف بنجاح")}>حذف</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const userColumns: Column<AdminUser>[] = [
  { key: "name", header: "الاسم" },
  { key: "email", header: "البريد" },
  { key: "phone", header: "الهاتف" },
  { key: "role", header: "الدور" },
  { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
  { key: "lastLogin", header: "آخر دخول", render: (r) => formatDate(r.lastLogin) },
  {
    key: "actions",
    header: "إجراءات",
    render: (r) => (
      <div className="flex items-center gap-1">
        <UserFormDialog
          title={`تعديل: ${r.name}`}
          trigger={
            <Button variant="ghost" size="icon">
              <Pencil className="size-4" />
            </Button>
          }
        />
        <Button variant="ghost" size="sm" onClick={() => toast.success("تم تغيير حالة الحساب")}>
          {r.status === "active" ? "تعطيل" : "تفعيل"}
        </Button>
        <ConfirmDelete label={r.name} />
      </div>
    ),
  },
];

export function AdminUsers() {
  const supervisors = adminUsers.filter((u) => u.role === "مشرف");
  const management = adminUsers.filter((u) => u.role !== "مشرف");
  const toolbar = (
    <UserFormDialog
      title="إنشاء مستخدم إداري"
      trigger={
        <Button className="gap-2">
          <Plus className="size-4" /> إنشاء مستخدم إداري
        </Button>
      }
    />
  );

  const table = (rows: AdminUser[]) => (
    <DataTable
      data={rows}
      columns={userColumns}
      searchKeys={["name", "email", "phone"]}
      toolbar={toolbar}
      filters={[
        {
          key: "role",
          label: "الدور",
          options: [...new Set(adminUsers.map((u) => u.role))].map((r) => ({ value: r, label: r })),
          match: (row, v) => row.role === v,
        },
        {
          key: "status",
          label: "الحالة",
          options: [
            { value: "active", label: "مفعل" },
            { value: "inactive", label: "معطل" },
          ],
          match: (row, v) => row.status === v,
        },
      ]}
    />
  );

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">جميع المستخدمين</TabsTrigger>
        <TabsTrigger value="sup">المشرفون</TabsTrigger>
        <TabsTrigger value="mgmt">أعضاء الإدارة</TabsTrigger>
      </TabsList>
      <TabsContent value="all">{table(adminUsers)}</TabsContent>
      <TabsContent value="sup">{table(supervisors)}</TabsContent>
      <TabsContent value="mgmt">{table(management)}</TabsContent>
    </Tabs>
  );
}

/* ============ Roles ============ */
export function AdminRoles() {
  const columns: Column<RoleItem>[] = [
    { key: "name", header: "اسم الدور" },
    { key: "description", header: "الوصف" },
    { key: "users", header: "عدد المستخدمين" },
    { key: "status", header: "الحالة", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      header: "إجراءات",
      render: (r) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => toast.info(`تعديل الدور: ${r.name}`)}>
            <Pencil className="size-4" />
          </Button>
          <ConfirmDelete label={`الدور ${r.name}`} />
        </div>
      ),
    },
  ];
  return (
    <DataTable
      data={roles}
      columns={columns}
      searchKeys={["name", "description"]}
      toolbar={
        <Button className="gap-2" onClick={() => toast.info("نموذج إنشاء دور جديد")}>
          <Plus className="size-4" /> إنشاء دور
        </Button>
      }
    />
  );
}

/* ============ Permissions ============ */
export function AdminPermissions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">مصفوفة الصلاحيات</CardTitle>
        <Button size="sm" onClick={() => toast.success("تم حفظ الصلاحيات")}>
          حفظ التغييرات
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-right text-sm">
            <thead className="bg-muted/60">
              <tr>
                <th className="px-4 py-3 font-semibold text-muted-foreground">القسم</th>
                {permissionActions.map((a) => (
                  <th key={a} className="px-4 py-3 text-center font-semibold text-muted-foreground">
                    {a}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionModules.map((m, i) => (
                <tr key={m} className="border-t">
                  <td className="px-4 py-3 font-medium">{m}</td>
                  {permissionActions.map((a, j) => (
                    <td key={a} className="px-4 py-3 text-center">
                      <Checkbox defaultChecked={(i + j) % 3 !== 0} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============ Settings ============ */
const settingsSections: { key: string; label: string; fields: string[] }[] = [
  { key: "general", label: "إعدادات عامة", fields: ["اسم المنصة", "البريد الرسمي", "المنطقة الزمنية", "العملة"] },
  { key: "accounts", label: "الحسابات", fields: ["اعتماد السيلرز تلقائيًا", "اعتماد مراكز الاتصال", "التحقق بخطوتين"] },
  { key: "orders", label: "الطلبات", fields: ["مهلة تأكيد الطلب", "عدد محاولات الاتصال", "إغلاق الطلب تلقائيًا"] },
  { key: "distribution", label: "التوزيع", fields: ["وضع التوزيع", "الحد الأقصى للطلبات لكل موظف", "أولوية الأداء"] },
  { key: "notifications", label: "الإشعارات", fields: ["إشعارات البريد", "إشعارات النظام", "إشعارات الشكاوى"] },
  { key: "score", label: "Score", fields: ["وزن نسبة التأكيد", "وزن سرعة الرد", "وزن الشكاوى"] },
  { key: "incentives", label: "الحوافز", fields: ["تفعيل الحوافز", "دورة الاحتساب", "الحد الأدنى للمكافأة"] },
  { key: "security", label: "الأمان", fields: ["مدة الجلسة", "قفل الحساب بعد المحاولات", "تسجيل عمليات التدقيق"] },
];

export function AdminSettings() {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <div className="overflow-x-auto">
        <TabsList className="w-max">
          {settingsSections.map((s) => (
            <TabsTrigger key={s.key} value={s.key}>
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {settingsSections.map((s) => (
        <TabsContent key={s.key} value={s.key} className="space-y-4">
          <h3 className="text-base font-semibold">{s.label}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {s.fields.map((f, i) => (
              <Card key={f}>
                <CardContent className="p-4">
                  {i % 3 === 2 ? (
                    <div className="flex items-center justify-between">
                      <Label className="font-normal">{f}</Label>
                      <Switch defaultChecked={i % 2 === 0} />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>{f}</Label>
                      <Input defaultValue={i % 2 === 0 ? "مفعل" : "قيمة افتراضية"} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">إلغاء</Button>
            <Button onClick={() => toast.success("تم حفظ الإعدادات")}>حفظ</Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export { ConfirmDelete, UsersIcon, ScorePill };

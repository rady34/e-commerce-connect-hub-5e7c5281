import * as React from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, Gauge, MessageSquareWarning, Package, ShoppingCart, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KpiCard, SectionCard } from "@/components/app/ui-kit";
import { TrendSummary, RankedList, DistributionList } from "@/components/app/data-display";
import {
  OrdersTable,
  ComplaintsTable,
  TransactionsTable,
  SellerProductsTable,
} from "@/components/app/pages/admin-entities";
import {
  callCenters,
  complaints,
  employeePerformance,
  formatMoney,
  formatNumber,
  orders,
  ordersTrend,
  sellers,
  statusDistribution,
  transactions,
} from "@/lib/mock-data";

const sellerOrders = orders.filter((_, i) => i % 2 === 0);
const ccOrders = orders.filter((_, i) => i % 3 !== 0);

/* ============ Seller ============ */
export function SellerDashboard() {
  const me = sellers[0]!;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <KpiCard title="إجمالي الطلبات" value={formatNumber(me.orders)} icon={ShoppingCart} />
        <KpiCard title="الطلبات الجديدة" value={formatNumber(48)} icon={TrendingUp} tone="info" />
        <KpiCard title="الطلبات المكتملة" value={formatNumber(312)} icon={CheckCircle2} tone="success" />
        <KpiCard title="الطلبات المعلقة" value={formatNumber(27)} icon={Clock} tone="warning" />
        <KpiCard title="إجمالي المبيعات" value={formatMoney(me.sales)} icon={TrendingUp} tone="success" />
        <KpiCard title="رصيد المحفظة" value={formatMoney(me.wallet)} icon={Wallet} />
        <KpiCard title="التقييم Score" value={`${me.score}%`} icon={Gauge} tone="info" />
        <KpiCard title="المنتجات النشطة" value={formatNumber(12)} icon={Package} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="أداء المبيعات">
          <TrendSummary data={ordersTrend} xKey="name" yKey="sales" name="المبيعات" />
        </SectionCard>
        <SectionCard title="الطلبات خلال الفترة">
          <TrendSummary data={ordersTrend} xKey="name" yKey="orders" name="الطلبات" />
        </SectionCard>
        <SectionCard title="حالات الطلبات" className="lg:col-span-2">
          <DistributionList data={statusDistribution} />
        </SectionCard>
      </div>
      <SectionCard title="أحدث الطلبات">
        <OrdersTable data={sellerOrders.slice(0, 10)} />
      </SectionCard>
    </div>
  );
}

export function SellerOrders() {
  return <OrdersTable data={sellerOrders} />;
}

export function SellerProducts() {
  return <SellerProductsTable />;
}

export function SellerComplaints() {
  return <ComplaintsTable data={complaints.filter((_, i) => i % 2 === 0)} />;
}

/* ============ Call center ============ */
export function CallCenterDashboard() {
  const me = callCenters[0]!;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <KpiCard title="إجمالي الطلبات" value={formatNumber(me.orders)} icon={ShoppingCart} />
        <KpiCard title="الطلبات الجديدة" value={formatNumber(96)} icon={TrendingUp} tone="info" />
        <KpiCard title="قيد المعالجة" value={formatNumber(54)} icon={Clock} tone="warning" />
        <KpiCard title="الطلبات المكتملة" value={formatNumber(720)} icon={CheckCircle2} tone="success" />
        <KpiCard title="إجمالي الشكاوى" value={formatNumber(complaints.length)} icon={MessageSquareWarning} tone="danger" />
        <KpiCard title="رصيد المحفظة" value={formatMoney(me.wallet)} icon={Wallet} />
        <KpiCard title="Performance Score" value={`${me.score}%`} icon={Gauge} tone="info" />
        <KpiCard title="عدد الموظفين" value={formatNumber(me.employees)} icon={TrendingUp} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="الطلبات خلال الفترة">
          <TrendSummary data={ordersTrend} xKey="name" yKey="orders" name="الطلبات" />
        </SectionCard>
        <SectionCard title="المكتمل مقابل المعلق">
          <DistributionList
            data={[
              { name: "مكتملة", value: 720 },
              { name: "معلقة", value: 132 },
            ]}
          />
        </SectionCard>
        <SectionCard title="أداء الموظفين" className="lg:col-span-2">
          <RankedList data={employeePerformance} xKey="name" bars={[{ key: "score", name: "Score" }]} />
        </SectionCard>
      </div>
      <SectionCard title="أحدث الطلبات">
        <OrdersTable data={ccOrders.slice(0, 10)} />
      </SectionCard>
    </div>
  );
}

export function CallCenterOrders() {
  return <OrdersTable data={ccOrders} />;
}

export function CallCenterComplaints() {
  return <ComplaintsTable data={complaints} />;
}

/* ============ Shared wallet / settings ============ */
export function RoleWallet({ balance }: { balance: number }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <KpiCard title="الرصيد الحالي" value={formatMoney(balance)} icon={Wallet} />
        <KpiCard title="إجمالي الإيداعات" value={formatMoney(184000)} icon={TrendingUp} tone="success" />
        <KpiCard title="طلبات السحب المعلقة" value={3} icon={Clock} tone="warning" />
      </div>
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <p className="text-sm text-muted-foreground">يمكنك طلب سحب رصيدك المتاح في أي وقت.</p>
          <Button onClick={() => toast.success("تم إرسال طلب السحب للمراجعة")}>طلب سحب رصيد</Button>
        </CardContent>
      </Card>
      <SectionCard title="سجل المعاملات">
        <TransactionsTable data={transactions.slice(0, 20)} />
      </SectionCard>
    </div>
  );
}

export function AccountSettings() {
  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">البيانات الشخصية</TabsTrigger>
        <TabsTrigger value="security">الأمان</TabsTrigger>
        <TabsTrigger value="prefs">التفضيلات</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {["الاسم بالكامل", "البريد الإلكتروني", "رقم الهاتف", "المدينة"].map((f) => (
            <Card key={f}>
              <CardContent className="space-y-2 p-4">
                <Label>{f}</Label>
                <Input placeholder={f} />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => toast.success("تم حفظ البيانات")}>حفظ التغييرات</Button>
        </div>
      </TabsContent>
      <TabsContent value="security" className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {["كلمة المرور الحالية", "كلمة المرور الجديدة", "تأكيد كلمة المرور"].map((f) => (
            <Card key={f}>
              <CardContent className="space-y-2 p-4">
                <Label>{f}</Label>
                <Input type="password" placeholder="••••••••" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={() => toast.success("تم تحديث كلمة المرور")}>تحديث كلمة المرور</Button>
        </div>
      </TabsContent>
      <TabsContent value="prefs">
        <div className="grid gap-3">
          {["إشعارات البريد الإلكتروني", "إشعارات الطلبات الجديدة", "إشعارات الشكاوى", "تقرير أسبوعي"].map((f, i) => (
            <Card key={f}>
              <CardContent className="flex items-center justify-between p-4">
                <Label className="font-normal">{f}</Label>
                <Switch defaultChecked={i % 2 === 0} />
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

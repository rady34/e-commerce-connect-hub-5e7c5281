// بيانات تجريبية واقعية للنظام (Frontend only)

export type Status =
  | "active"
  | "inactive"
  | "pending"
  | "new"
  | "processing"
  | "completed"
  | "cancelled"
  | "resolved"
  | "closed";

const arabicNames = [
  "أحمد محمود",
  "سارة عبد الرحمن",
  "محمد الشريف",
  "نور الهدى سالم",
  "خالد العتيبي",
  "مريم فاروق",
  "يوسف الديب",
  "هند مصطفى",
  "عمر الجندي",
  "ليلى حسن",
  "طارق بدر",
  "دينا رشاد",
  "زياد النجار",
  "رانيا سمير",
  "باسم قاسم",
  "شيماء عادل",
];

const companies = [
  "متجر النخبة",
  "دار الأناقة",
  "سوق الرياض",
  "بيت العطور",
  "تكنو ستور",
  "الوفاء للتجارة",
  "لمسة جمال",
  "المدينة للإلكترونيات",
];

const products = [
  "ساعة ذكية",
  "سماعات لاسلكية",
  "عطر شرقي",
  "حقيبة جلد",
  "مكنسة روبوت",
  "هاتف ذكي",
  "جهاز لوحي",
  "طقم عناية بالبشرة",
];

const centers = [
  "مركز الاتصال الذهبي",
  "كول سنتر المستقبل",
  "مركز التواصل الأول",
  "خدمة الرواد",
  "مركز الشرق للاتصالات",
];

const cities = ["القاهرة", "الرياض", "جدة", "الإسكندرية", "الدوحة", "دبي", "عمّان"];

function rnd(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function pick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.floor(rnd(seed) * arr.length) % arr.length] as T;
}
function at<T>(arr: readonly T[], i: number): T {
  return arr[((i % arr.length) + arr.length) % arr.length] as T;
}
function num(seed: number, min: number, max: number) {
  return Math.floor(min + rnd(seed) * (max - min));
}
function dateAt(seed: number) {
  const d = new Date(2026, 6, 1 + num(seed, 0, 58), num(seed * 2, 8, 20), num(seed * 3, 0, 59));
  return d.toISOString();
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatMoney(v: number) {
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 }).format(v) + " ج.م";
}

export function formatNumber(v: number) {
  return new Intl.NumberFormat("ar-EG").format(v);
}

export interface Seller {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  status: Status;
  orders: number;
  sales: number;
  score: number;
  wallet: number;
  city: string;
  createdAt: string;
}

export const sellers: Seller[] = Array.from({ length: 24 }, (_, i) => ({
  id: `SEL-${1000 + i}`,
  name: pick(arabicNames, i + 1),
  company: pick(companies, i + 7),
  phone: `01${num(i + 3, 0, 3)}${num(i + 11, 10000000, 99999999)}`,
  email: `seller${i + 1}@kassebni.com`,
  status: (i % 7 === 0 ? "pending" : i % 5 === 0 ? "inactive" : "active") as Status,
  orders: num(i + 21, 40, 900),
  sales: num(i + 31, 20000, 480000),
  score: num(i + 41, 55, 99),
  wallet: num(i + 51, 500, 90000),
  city: pick(cities, i + 5),
  createdAt: dateAt(i + 61),
}));

export interface CallCenter {
  id: string;
  name: string;
  manager: string;
  phone: string;
  status: Status;
  employees: number;
  orders: number;
  performance: number;
  score: number;
  wallet: number;
  createdAt: string;
}

export const callCenters: CallCenter[] = Array.from({ length: 12 }, (_, i) => ({
  id: `CC-${200 + i}`,
  name: `${pick(centers, i + 2)} ${i + 1}`,
  manager: pick(arabicNames, i + 9),
  phone: `010${num(i + 13, 1000000, 9999999)}`,
  status: (i % 6 === 0 ? "pending" : i % 4 === 0 ? "inactive" : "active") as Status,
  employees: num(i + 23, 5, 80),
  orders: num(i + 33, 120, 4000),
  performance: num(i + 43, 60, 98),
  score: num(i + 53, 58, 97),
  wallet: num(i + 63, 1000, 120000),
  createdAt: dateAt(i + 73),
}));

export interface Employee {
  id: string;
  name: string;
  callCenter: string;
  role: string;
  phone: string;
  status: Status;
  orders: number;
  score: number;
  createdAt: string;
}

export const employees: Employee[] = Array.from({ length: 30 }, (_, i) => ({
  id: `EMP-${3000 + i}`,
  name: pick(arabicNames, i + 4),
  callCenter: at(callCenters, i).name,
  role: pick(["موظف مبيعات", "مشرف فريق", "خدمة عملاء", "متابعة شكاوى"], i + 6),
  phone: `011${num(i + 17, 1000000, 9999999)}`,
  status: (i % 8 === 0 ? "inactive" : "active") as Status,
  orders: num(i + 27, 10, 620),
  score: num(i + 37, 50, 99),
  createdAt: dateAt(i + 47),
}));

export interface Order {
  id: string;
  customer: string;
  phone: string;
  seller: string;
  callCenter: string;
  employee: string;
  product: string;
  status: Status;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export const orders: Order[] = Array.from({ length: 60 }, (_, i) => ({
  id: `ORD-${50000 + i}`,
  customer: pick(arabicNames, i + 8),
  phone: `012${num(i + 19, 1000000, 9999999)}`,
  seller: at(sellers, i).company,
  callCenter: at(callCenters, i).name,
  employee: at(employees, i).name,
  product: pick(products, i + 3),
  status: at(["new", "processing", "completed", "pending", "cancelled"] as Status[], i),
  amount: num(i + 29, 250, 12000),
  createdAt: dateAt(i + 39),
  updatedAt: dateAt(i + 49),
}));

export interface Complaint {
  id: string;
  customer: string;
  orderId: string;
  seller: string;
  callCenter: string;
  priority: "عالية" | "متوسطة" | "منخفضة";
  status: Status;
  employee: string;
  subject: string;
  createdAt: string;
}

export const complaints: Complaint[] = Array.from({ length: 26 }, (_, i) => ({
  id: `CMP-${700 + i}`,
  customer: pick(arabicNames, i + 12),
  orderId: at(orders, i).id,
  seller: at(sellers, i).company,
  callCenter: at(callCenters, i).name,
  priority: at(["عالية", "متوسطة", "منخفضة"] as const, i),
  status: at(["new", "processing", "resolved", "closed"] as Status[], i),
  employee: at(employees, i).name,
  subject: pick(
    ["تأخر في التسليم", "منتج مختلف عن الوصف", "سوء تعامل", "طلب استرجاع", "مشكلة في الدفع"],
    i + 15,
  ),
  createdAt: dateAt(i + 55),
}));

export interface DistributionRule {
  id: string;
  name: string;
  priority: number;
  condition: string;
  target: string;
  source: string;
  status: Status;
  createdAt: string;
}

export const distributionRules: DistributionRule[] = Array.from({ length: 9 }, (_, i) => ({
  id: `RULE-${100 + i}`,
  name: pick(
    [
      "توزيع طلبات القاهرة",
      "توزيع الطلبات عالية القيمة",
      "توزيع تلقائي بالتساوي",
      "توزيع حسب الأداء",
      "توزيع طلبات الخليج",
    ],
    i + 2,
  ),
  priority: i + 1,
  condition: pick(
    ["المدينة = القاهرة", "المبلغ > 5000", "المصدر = فيسبوك", "التقييم > 80", "المنتج = إلكترونيات"],
    i + 4,
  ),
  target: pick(callCenters, i + 6).name,
  source: pick(["نموذج الموقع", "فيسبوك", "استيراد ملف", "API خارجي"], i + 8),
  status: (i % 4 === 0 ? "inactive" : "active") as Status,
  createdAt: dateAt(i + 66),
}));

export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: Status;
  records: number;
  createdAt: string;
}

export const dataSources: DataSource[] = Array.from({ length: 8 }, (_, i) => ({
  id: `DS-${400 + i}`,
  name: pick(
    ["نموذج الموقع", "حملة فيسبوك", "حملة جوجل", "استيراد Excel", "API شريك", "واتساب بيزنس"],
    i + 1,
  ),
  type: pick(["Webhook", "API", "ملف CSV", "نموذج", "تكامل"], i + 3),
  status: (i % 5 === 0 ? "inactive" : "active") as Status,
  records: num(i + 25, 300, 42000),
  createdAt: dateAt(i + 35),
}));

export interface Incentive {
  id: string;
  name: string;
  target: string;
  condition: string;
  goal: string;
  reward: string;
  start: string;
  end: string;
  status: Status;
}

export const incentives: Incentive[] = Array.from({ length: 7 }, (_, i) => ({
  id: `INC-${900 + i}`,
  name: pick(
    ["حافز المبيعات الشهري", "مكافأة الجودة", "تحدي الطلبات المكتملة", "حافز أفضل موظف"],
    i + 2,
  ),
  target: pick(["السيلرز", "مراكز الاتصال", "الموظفون"], i + 5),
  condition: pick(["إتمام 100 طلب", "تقييم أعلى من 90", "مبيعات > 100 ألف"], i + 7),
  goal: `${num(i + 9, 50, 500)} طلب`,
  reward: formatMoney(num(i + 11, 1000, 20000)),
  start: dateAt(i + 13),
  end: dateAt(i + 44),
  status: (i % 3 === 0 ? "pending" : "active") as Status,
}));

export interface Transaction {
  id: string;
  account: string;
  type: "إيداع" | "سحب" | "عمولة" | "تسوية";
  amount: number;
  balanceAfter: number;
  status: Status;
  createdAt: string;
}

export const transactions: Transaction[] = Array.from({ length: 34 }, (_, i) => ({
  id: `TRX-${80000 + i}`,
  account: i % 2 === 0 ? at(sellers, i).company : at(callCenters, i).name,
  type: at(["إيداع", "سحب", "عمولة", "تسوية"] as const, i),
  amount: num(i + 21, 200, 45000),
  balanceAfter: num(i + 31, 1000, 200000),
  status: at(["completed", "pending", "cancelled"] as Status[], i),
  createdAt: dateAt(i + 41),
}));

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "طلب" | "شكوى" | "مالي" | "نظام";
  read: boolean;
  createdAt: string;
}

export const notifications: Notification[] = Array.from({ length: 18 }, (_, i) => ({
  id: `NOTE-${600 + i}`,
  title: pick(
    ["طلب جديد بانتظار التوزيع", "شكوى جديدة عالية الأولوية", "طلب سحب رصيد", "تحديث إعدادات النظام"],
    i + 1,
  ),
  body: pick(
    [
      "تم استلام طلب جديد من مصدر البيانات: حملة فيسبوك.",
      "قام العميل بتقديم شكوى بخصوص تأخر التسليم.",
      "تم تقديم طلب سحب رصيد بقيمة 12,000 ج.م.",
      "تم تعديل قواعد التوزيع بواسطة أحد المشرفين.",
    ],
    i + 2,
  ),
  type: at(["طلب", "شكوى", "مالي", "نظام"] as const, i),
  read: i % 3 === 0,
  createdAt: dateAt(i + 71),
}));

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "مدير عام" | "مشرف" | "عضو إدارة";
  status: Status;
  lastLogin: string;
}

export const adminUsers: AdminUser[] = Array.from({ length: 14 }, (_, i) => ({
  id: `USR-${10 + i}`,
  name: pick(arabicNames, i + 6),
  email: `admin${i + 1}@kassebni.com`,
  phone: `015${num(i + 5, 1000000, 9999999)}`,
  role: at(["مدير عام", "مشرف", "عضو إدارة"] as const, i),
  status: (i % 6 === 0 ? "inactive" : "active") as Status,
  lastLogin: dateAt(i + 81),
}));

export interface RoleItem {
  id: string;
  name: string;
  description: string;
  users: number;
  status: Status;
}

export const roles: RoleItem[] = [
  { id: "R-1", name: "مدير عام", description: "صلاحيات كاملة على النظام", users: 2, status: "active" },
  { id: "R-2", name: "مشرف", description: "إدارة الطلبات والشكاوى والتوزيع", users: 6, status: "active" },
  { id: "R-3", name: "عضو إدارة", description: "عرض التقارير والمتابعة", users: 9, status: "active" },
  { id: "R-4", name: "محاسب", description: "إدارة المحافظ والمعاملات المالية", users: 3, status: "active" },
  { id: "R-5", name: "مراقب جودة", description: "متابعة التقييم والشكاوى", users: 4, status: "inactive" },
];

export const permissionModules = [
  "المستخدمون",
  "السيلرز",
  "مراكز الاتصال",
  "الموظفون",
  "الطلبات",
  "الشكاوى",
  "المحافظ",
  "الإشعارات",
  "التقارير",
  "الإعدادات",
  "سجل النشاط",
  "سجل التدقيق",
];

export const permissionActions = ["عرض", "إنشاء", "تعديل", "حذف", "اعتماد", "تصدير"];

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  module: string;
  description: string;
  ip: string;
  createdAt: string;
}

export const activityLog: ActivityItem[] = Array.from({ length: 28 }, (_, i) => ({
  id: `ACT-${5000 + i}`,
  user: pick(arabicNames, i + 3),
  action: pick(["تسجيل دخول", "إنشاء", "تعديل", "حذف", "تصدير"], i + 5),
  module: pick(permissionModules, i + 7),
  description: pick(
    ["تم تحديث حالة طلب", "تم إنشاء مستخدم إداري جديد", "تم تصدير تقرير المبيعات", "تم تعطيل حساب سيلر"],
    i + 9,
  ),
  ip: `197.${num(i + 2, 1, 250)}.${num(i + 4, 1, 250)}.${num(i + 6, 1, 250)}`,
  createdAt: dateAt(i + 91),
}));

export interface AuditItem {
  id: string;
  user: string;
  action: string;
  resource: string;
  oldValue: string;
  newValue: string;
  createdAt: string;
}

export const auditLog: AuditItem[] = Array.from({ length: 24 }, (_, i) => ({
  id: `AUD-${9000 + i}`,
  user: pick(arabicNames, i + 10),
  action: pick(["تعديل", "إنشاء", "حذف", "اعتماد"], i + 12),
  resource: pick(["الطلب ORD-50012", "السيلر SEL-1004", "قاعدة توزيع RULE-102", "المستخدم USR-14"], i + 14),
  oldValue: pick(["قيد المعالجة", "غير مفعل", "50%", "مشرف"], i + 16),
  newValue: pick(["مكتمل", "مفعل", "70%", "مدير عام"], i + 18),
  createdAt: dateAt(i + 101),
}));

export const ordersTrend = [
  { name: "يناير", orders: 420, sales: 180000 },
  { name: "فبراير", orders: 510, sales: 226000 },
  { name: "مارس", orders: 480, sales: 205000 },
  { name: "أبريل", orders: 620, sales: 288000 },
  { name: "مايو", orders: 700, sales: 331000 },
  { name: "يونيو", orders: 660, sales: 302000 },
  { name: "يوليو", orders: 780, sales: 389000 },
  { name: "أغسطس", orders: 850, sales: 431000 },
];

export const statusDistribution = [
  { name: "جديدة", value: 320 },
  { name: "قيد المعالجة", value: 210 },
  { name: "مكتملة", value: 640 },
  { name: "معلقة", value: 120 },
  { name: "ملغاة", value: 90 },
];

export const sellerPerformance = sellers.slice(0, 6).map((s) => ({
  name: s.company,
  score: s.score,
  sales: s.sales,
}));

export const callCenterPerformance = callCenters.slice(0, 6).map((c) => ({
  name: c.name,
  score: c.score,
  orders: c.orders,
}));

export const employeePerformance = employees.slice(0, 6).map((e) => ({
  name: e.name,
  score: e.score,
  orders: e.orders,
}));

export const sellerProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `PRD-${300 + i}`,
  name: pick(products, i + 1),
  sku: `SKU-${num(i + 3, 10000, 99999)}`,
  price: num(i + 5, 150, 8000),
  stock: num(i + 7, 0, 400),
  sold: num(i + 9, 5, 900),
  status: (i % 6 === 0 ? "inactive" : "active") as Status,
}));

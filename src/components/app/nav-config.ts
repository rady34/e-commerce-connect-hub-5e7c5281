import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  KeySquare,
  Store,
  Headphones,
  UserCog,
  ShoppingCart,
  MessageSquareWarning,
  Share2,
  Database,
  Gauge,
  Gift,
  Wallet,
  Bell,
  Activity,
  FileSearch,
  Settings,
  Package,
  type LucideIcon,
} from "lucide-react";
import type { AppRole } from "@/lib/session";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  children?: { label: string; to: string }[];
}

export const adminNav: NavItem[] = [
  { label: "الرئيسية", to: "/admin", icon: LayoutDashboard },
  {
    label: "المستخدمون",
    to: "/admin/users",
    icon: Users,
    children: [
      { label: "المشرفون", to: "/admin/users" },
      { label: "أعضاء الإدارة", to: "/admin/users" },
      { label: "إنشاء مستخدم إداري", to: "/admin/users" },
    ],
  },
  { label: "الأدوار", to: "/admin/roles", icon: ShieldCheck },
  { label: "الصلاحيات", to: "/admin/permissions", icon: KeySquare },
  { label: "السيلرز", to: "/admin/sellers", icon: Store },
  { label: "مراكز الاتصال", to: "/admin/call-centers", icon: Headphones },
  { label: "الموظفون", to: "/admin/employees", icon: UserCog },
  { label: "الطلبات", to: "/admin/orders", icon: ShoppingCart },
  { label: "الشكاوى", to: "/admin/complaints", icon: MessageSquareWarning },
  { label: "قواعد التوزيع", to: "/admin/distribution-rules", icon: Share2 },
  { label: "مصادر البيانات", to: "/admin/data-sources", icon: Database },
  { label: "التقييم والـ Score", to: "/admin/scoring", icon: Gauge },
  { label: "الحوافز", to: "/admin/incentives", icon: Gift },
  { label: "المحافظ والمعاملات", to: "/admin/wallets", icon: Wallet },
  { label: "الإشعارات", to: "/admin/notifications", icon: Bell },
  { label: "سجل النشاط", to: "/admin/activity-log", icon: Activity },
  { label: "سجل التدقيق", to: "/admin/audit-log", icon: FileSearch },
  { label: "إعدادات النظام", to: "/admin/settings", icon: Settings },
];

export const sellerNav: NavItem[] = [
  { label: "الرئيسية", to: "/seller", icon: LayoutDashboard },
  { label: "الطلبات", to: "/seller/orders", icon: ShoppingCart },
  { label: "المنتجات", to: "/seller/products", icon: Package },
  { label: "الشكاوى", to: "/seller/complaints", icon: MessageSquareWarning },
  { label: "المحفظة", to: "/seller/wallet", icon: Wallet },
  { label: "الإشعارات", to: "/seller/notifications", icon: Bell },
  { label: "إعدادات الحساب", to: "/seller/settings", icon: Settings },
];

export const callCenterNav: NavItem[] = [
  { label: "الرئيسية", to: "/call-center", icon: LayoutDashboard },
  { label: "الطلبات", to: "/call-center/orders", icon: ShoppingCart },
  { label: "الشكاوى", to: "/call-center/complaints", icon: MessageSquareWarning },
  { label: "المحفظة", to: "/call-center/wallet", icon: Wallet },
  { label: "الإشعارات", to: "/call-center/notifications", icon: Bell },
  { label: "إعدادات الحساب", to: "/call-center/settings", icon: Settings },
];

export function navFor(role: AppRole): NavItem[] {
  if (role === "seller") return sellerNav;
  if (role === "call-center") return callCenterNav;
  return adminNav;
}

export function homeFor(role: AppRole) {
  if (role === "seller") return "/seller";
  if (role === "call-center") return "/call-center";
  return "/admin";
}

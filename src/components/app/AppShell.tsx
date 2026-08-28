import * as React from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Eye,
  LogOut,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  Search,
  Settings,
  ShieldAlert,
  Store,
  Headphones,
  UserCircle2,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navFor, homeFor, type NavItem } from "./nav-config";
import { useSession, type AppRole, roleLabel } from "@/lib/session";
import { notifications } from "@/lib/mock-data";

const AnyLink = Link as unknown as React.FC<Record<string, unknown>>;

function SidebarNav({
  items,
  collapsed,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <nav className="space-y-0.5 p-2">
      {items.map((item) => {
        const active = pathname === item.to || (item.to !== "/admin" && pathname.startsWith(item.to + "/"));
        const isOpen = open === item.label;
        return (
          <div key={item.label}>
            <div className="flex items-center gap-1">
              <AnyLink
                to={item.to}
                onClick={onNavigate}
                className={cn(
                  "flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-[12.5px] font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2",
                )}

                title={item.label}
              >
                <item.icon className="size-[18px] shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </AnyLink>
              {!collapsed && item.children ? (
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.label)}
                  className="rounded-md p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent"
                  aria-label="فتح القائمة الفرعية"
                >
                  <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
                </button>
              ) : null}
            </div>
            {!collapsed && item.children && isOpen ? (
              <div className="my-1 space-y-1 border-e-2 border-sidebar-border pe-3 me-4">
                {item.children.map((c) => (
                  <AnyLink
                    key={c.label}
                    to={c.to}
                    onClick={onNavigate}
                    className="block rounded-md px-3 py-2 text-[13px] text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    {c.label}
                  </AnyLink>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

function UserFooter({ collapsed }: { collapsed: boolean }) {
  const { user, effectiveRole, signOut } = useSession();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="border-t border-sidebar-border p-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-lg p-2 text-start hover:bg-sidebar-accent",
              collapsed && "justify-center",
            )}
          >
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">{user.name}</p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                  {effectiveRole ? roleLabel(effectiveRole) : ""}
                </p>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate({ to: homeFor(effectiveRole ?? "admin") + "/settings" } as never)}>
            <Settings className="size-4" /> إعدادات الحساب
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              signOut();
              navigate({ to: "/login" } as never);
            }}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="size-4" /> تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function PreviewSwitcher() {
  const { canPreview, previewRole, startPreview, endPreview } = useSession();
  const navigate = useNavigate();
  if (!canPreview) return null; // authorization: admins only

  const go = (role: AppRole) => {
    startPreview(role);
    navigate({ to: homeFor(role) } as never);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="size-4" />
          <span className="hidden sm:inline">معاينة النظام</span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>معاينة النظام</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => go("admin")}>
          {previewRole === null ? <Check className="size-4 text-primary" /> : <span className="size-4" />}
          <UserCircle2 className="size-4" /> كأدمن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => go("seller")}>
          {previewRole === "seller" ? <Check className="size-4 text-primary" /> : <span className="size-4" />}
          <Store className="size-4" /> كسيلر
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => go("call-center")}>
          {previewRole === "call-center" ? <Check className="size-4 text-primary" /> : <span className="size-4" />}
          <Headphones className="size-4" /> كول سنتر
        </DropdownMenuItem>
        {previewRole ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                endPreview();
                navigate({ to: "/admin" } as never);
              }}
            >
              <LogOut className="size-4" /> العودة إلى حساب الأدمن
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PreviewBanner() {
  const { previewRole, endPreview } = useSession();
  const navigate = useNavigate();
  if (!previewRole) return null;
  return (
    <div className="flex flex-col items-start gap-2 border-b border-amber-500/30 bg-amber-500/12 px-4 py-2.5 text-amber-800 sm:flex-row sm:items-center sm:justify-between dark:text-amber-200">
      <div className="flex items-center gap-2 text-sm">
        <ShieldAlert className="size-4 shrink-0" />
        <span className="font-semibold">وضع المعاينة</span>
        <span className="hidden sm:inline">
          — أنت تشاهد النظام الآن بصلاحيات {roleLabel(previewRole)} (الحساب الأصلي: مدير النظام)
        </span>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="border-amber-600/40 bg-background"
        onClick={() => {
          endPreview();
          navigate({ to: "/admin" } as never);
        }}
      >
        العودة إلى حساب الأدمن
      </Button>
    </div>
  );
}

function NotificationsMenu() {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 end-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.slice(0, 5).map((n) => (
          <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5">
            <div className="flex w-full items-center justify-between gap-2">
              <span className="text-sm font-medium">{n.title}</span>
              {!n.read && <Badge variant="secondary">جديد</Badge>}
            </div>
            <span className="line-clamp-1 text-xs text-muted-foreground">{n.body}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ role, children }: { role: AppRole; children: React.ReactNode }) {
  const { user, effectiveRole, ready, signOut } = useSession();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!ready) return;
    if (!user) {
      navigate({ to: "/login" } as never);
      return;
    }
    if (effectiveRole && effectiveRole !== role) {
      navigate({ to: homeFor(effectiveRole) } as never);
    }
  }, [ready, user, effectiveRole, role, navigate]);

  React.useEffect(() => setMobileOpen(false), [pathname]);

  const items = navFor(role);
  const crumbLabel =
    items.flatMap((i) => [i, ...(i.children ?? []).map((c) => ({ ...c, icon: i.icon }))]).find((i) => i.to === pathname)
      ?.label ?? "التفاصيل";

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        جارٍ التحميل...
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
          ك
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Kassebni Contact</p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">منصة إدارة الطلبات</p>
          </div>
        )}
        <button
          className="ms-auto rounded-md p-1.5 hover:bg-sidebar-accent lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>
      </div>
      <ScrollArea className="flex-1">
        <SidebarNav items={items} collapsed={collapsed} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
      </ScrollArea>
      <UserFooter collapsed={collapsed} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-muted/40" dir="rtl">
      {/* Desktop sidebar (RTL: يفتح من جهة اليمين) */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-e border-sidebar-border transition-all duration-200 lg:block",
          collapsed ? "w-[60px]" : "w-[12.5rem]",
        )}
      >
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-overlay" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-[13.5rem] shadow-xl">{sidebar}</div>
        </div>
      )}


      <div className="flex min-w-0 flex-1 flex-col">
        <PreviewBanner />
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-card/90 px-3 backdrop-blur md:px-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={() => setCollapsed((c) => !c)}
            aria-label="طي القائمة"
          >
            {collapsed ? <PanelRightOpen className="size-5" /> : <PanelRightClose className="size-5" />}
          </Button>
          <div className="min-w-0">
            <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <span>Kassebni Contact</span>
              <span>/</span>
              <span className="text-foreground">{crumbLabel}</span>
            </div>
            <h1 className="truncate text-base font-bold">{crumbLabel}</h1>
          </div>
          <div className="relative mx-auto hidden w-full max-w-sm md:block">
            <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="بحث في النظام..." className="pe-9" />
          </div>
          <div className="ms-auto flex items-center gap-1.5">
            <NotificationsMenu />
            <PreviewSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                      {user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-start text-xs leading-tight lg:block">
                    <span className="block font-semibold">{user.name}</span>
                    <span className="block text-muted-foreground">
                      {effectiveRole ? roleLabel(effectiveRole) : ""}
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: homeFor(role) + "/settings" } as never)}>
                  <Settings className="size-4" /> إعدادات الحساب
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => {
                    signOut();
                    navigate({ to: "/login" } as never);
                  }}
                >
                  <LogOut className="size-4" /> تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Headset, ShieldCheck, Sparkles } from "lucide-react";

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="surface-gradient relative hidden flex-col justify-between p-10 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
            ك
          </div>
          <div>
            <p className="text-lg font-bold">Kassebni Contact</p>
            <p className="text-xs opacity-70">منصة إدارة الطلبات ومراكز الاتصال</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="max-w-md text-3xl leading-relaxed font-bold">
            اربط السيلرز بمراكز الاتصال وأدر دورة تأكيد الطلبات بالكامل من مكان واحد.
          </h2>
          <ul className="space-y-4 text-sm opacity-90">
            <li className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary" /> توزيع ذكي للطلبات حسب قواعد قابلة للتخصيص
            </li>
            <li className="flex items-center gap-3">
              <Headset className="size-5 text-primary" /> متابعة أداء الموظفين والمراكز عبر نظام Score
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-primary" /> محافظ ومعاملات مالية وسجلات تدقيق كاملة
            </li>
          </ul>
        </div>

        <p className="text-xs opacity-60">© {new Date().getFullYear()} Kassebni Contact</p>
      </div>

      <div className="flex items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
              ك
            </div>
            <p className="text-base font-bold">Kassebni Contact</p>
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            بالمتابعة أنت توافق على{" "}
            <Link to="/login" className="underline underline-offset-4">
              شروط الاستخدام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

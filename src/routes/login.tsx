import * as React from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/app/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "@/lib/session";
import { homeFor } from "@/components/app/nav-config";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — Kassebni Contact" },
      { name: "description", content: "سجّل الدخول إلى منصة Kassebni Contact بحساب واحد لجميع الأدوار." },
      { property: "og:title", content: "تسجيل الدخول — Kassebni Contact" },
      { property: "og:description", content: "بوابة دخول موحدة للسيلرز ومراكز الاتصال والإدارة." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى إدخال البريد وكلمة المرور");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = signIn(email);
      setLoading(false);
      toast.success(`مرحبًا بك، ${user.name}`);
      navigate({ to: homeFor(user.role) });
    }, 600);
  };

  return (
    <AuthLayout
      title="تسجيل الدخول"
      description="بوابة دخول موحدة لجميع أنواع الحسابات: الإدارة، السيلرز، ومراكز الاتصال."
      footer={
        <span>
          ليس لديك حساب؟{" "}
          <Link to="/signup/seller" className="font-medium text-primary underline underline-offset-4">
            تسجيل سيلر
          </Link>{" "}
          ·{" "}
          <Link to="/signup/call-center" className="font-medium text-primary underline underline-offset-4">
            تسجيل مركز اتصال
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني أو اسم المستخدم</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@kassebni.com"
            autoComplete="username"
          />
          <p className="text-xs text-muted-foreground">
            للتجربة: أي بريد يبدأ بـ seller ← سيلر، بـ cc ← مركز اتصال، غير ذلك ← أدمن.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">كلمة المرور</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" defaultChecked />
          <Label htmlFor="remember" className="text-sm font-normal">
            تذكرني على هذا الجهاز
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          تسجيل الدخول
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          أول مرة تستخدم النظام؟{" "}
          <Link to="/initial-setup" className="text-primary hover:underline">
            إعداد أول حساب أدمن
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

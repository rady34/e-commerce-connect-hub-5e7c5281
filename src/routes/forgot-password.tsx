import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/app/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "استعادة كلمة المرور — Kassebni Contact" },
      { name: "description", content: "أرسل رابط استعادة كلمة المرور لحسابك في Kassebni Contact." },
      { property: "og:title", content: "استعادة كلمة المرور — Kassebni Contact" },
      { property: "og:description", content: "استعد الوصول إلى حسابك عبر البريد الإلكتروني." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("تم إرسال رابط الاستعادة إلى بريدك");
    }, 700);
  };

  return (
    <AuthLayout
      title="استعادة كلمة المرور"
      description="أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور."
      footer={
        <Link to="/login" className="font-medium text-primary underline underline-offset-4">
          العودة إلى تسجيل الدخول
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border bg-card p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
          <p className="mt-3 font-semibold">تم إرسال الرابط بنجاح</p>
          <p className="mt-1 text-sm text-muted-foreground">راجع بريدك {email} لإكمال إعادة التعيين.</p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link to="/reset-password">فتح صفحة إعادة التعيين</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            إرسال رابط الاستعادة
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}

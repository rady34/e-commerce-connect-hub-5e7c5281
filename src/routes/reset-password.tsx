import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/app/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "إعادة تعيين كلمة المرور — Kassebni Contact" },
      { name: "description", content: "قم بتعيين كلمة مرور جديدة لحسابك في Kassebni Contact." },
      { property: "og:title", content: "إعادة تعيين كلمة المرور — Kassebni Contact" },
      { property: "og:description", content: "اختر كلمة مرور قوية لحماية حسابك." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }
    if (password !== confirm) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("تم تحديث كلمة المرور بنجاح");
    }, 700);
  };

  return (
    <AuthLayout
      title="إعادة تعيين كلمة المرور"
      description="اختر كلمة مرور جديدة وقوية لحسابك."
      footer={
        <Link to="/login" className="font-medium text-primary underline underline-offset-4">
          العودة إلى تسجيل الدخول
        </Link>
      }
    >
      {done ? (
        <div className="rounded-xl border bg-card p-6 text-center">
          <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
          <p className="mt-3 font-semibold">تمت العملية بنجاح</p>
          <p className="mt-1 text-sm text-muted-foreground">يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
          <Button asChild className="mt-5 w-full">
            <Link to="/login">تسجيل الدخول</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="pw">كلمة المرور الجديدة</Label>
            <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpw">تأكيد كلمة المرور</Label>
            <Input id="cpw" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            إعادة تعيين كلمة المرور
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}

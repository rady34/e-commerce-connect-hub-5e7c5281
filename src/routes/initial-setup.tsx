import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/app/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/session";

const SETUP_KEY = "kassebni.setup.completed";

export const Route = createFileRoute("/initial-setup")({
  head: () => ({
    meta: [
      { title: "الإعداد الأولي — Kassebni Contact" },
      { name: "description", content: "إنشاء أول حساب أدمن لتأسيس منصة Kassebni Contact." },
      { property: "og:title", content: "الإعداد الأولي — Kassebni Contact" },
      { property: "og:description", content: "خطوة واحدة لتأسيس النظام وإنشاء حساب الإدارة الرئيسي." },
    ],
  }),
  component: InitialSetup,
});

function InitialSetup() {
  const navigate = useNavigate();
  const { signIn } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [cpw, setCpw] = React.useState("");

  React.useEffect(() => {
    setCompleted(localStorage.getItem(SETUP_KEY) === "1");
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("يرجى استكمال البيانات");
      return;
    }
    if (pw.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }
    if (pw !== cpw) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(SETUP_KEY, "1");
      signIn(email);
      setLoading(false);
      toast.success("تم إنشاء حساب الأدمن الأول بنجاح");
      navigate({ to: "/admin" });
    }, 800);
  };

  if (completed) {
    return (
      <AuthLayout
        title="تم تأسيس النظام مسبقًا"
        description="تم إنشاء حساب الأدمن الأول من قبل، ولا يمكن الوصول إلى صفحة الإعداد مرة أخرى."
      >
        <div className="rounded-xl border bg-card p-6 text-center">
          <ShieldCheck className="mx-auto size-10 text-primary" />
          <p className="mt-3 text-sm text-muted-foreground">
            لإضافة مستخدمين إداريين جدد استخدم لوحة الأدمن ← المستخدمون.
          </p>
          <Button asChild className="mt-5 w-full">
            <Link to="/login">الذهاب لتسجيل الدخول</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="مرحبًا بك في Kassebni Contact"
      description="هذه الخطوة تُنفَّذ مرة واحدة فقط لإنشاء حساب الأدمن الأول للنظام."
      footer={
        <Link to="/login" className="font-medium text-primary underline underline-offset-4">
          لدي حساب بالفعل
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">اسم الأدمن</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="مدير النظام" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@kassebni.com"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pw">كلمة المرور</Label>
            <Input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpw">تأكيد كلمة المرور</Label>
            <Input id="cpw" type="password" value={cpw} onChange={(e) => setCpw(e.target.value)} />
          </div>
        </div>
        <p className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          لا يتم تخزين كلمة المرور داخل الواجهة أو الكود المصدري؛ سيتم تمريرها لنظام المصادقة الآمن عند ربط الـ
          Backend.
        </p>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          إنشاء حساب Admin
        </Button>
      </form>
    </AuthLayout>
  );
}

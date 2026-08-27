import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/app/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/signup/call-center")({
  head: () => ({
    meta: [
      { title: "تسجيل مركز اتصال — Kassebni Contact" },
      { name: "description", content: "سجّل مركز الاتصال الخاص بك واستقبل طلبات السيلرز للتأكيد." },
      { property: "og:title", content: "تسجيل مركز اتصال — Kassebni Contact" },
      { property: "og:description", content: "انضم كمزود خدمة كول سنتر وابدأ باستقبال الطلبات." },
    ],
  }),
  component: CallCenterSignup,
});

function CallCenterSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      toast.error("يجب الموافقة على الشروط والأحكام");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("تم إنشاء حساب مركز الاتصال، بانتظار الاعتماد");
      navigate({ to: "/login" });
    }, 800);
  };

  return (
    <AuthLayout
      title="تسجيل مركز اتصال"
      description="أنشئ حساب مركز الاتصال وابدأ باستقبال وتأكيد طلبات السيلرز."
      footer={
        <span>
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="font-medium text-primary underline underline-offset-4">
            تسجيل الدخول
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="manager">اسم المسؤول</Label>
            <Input id="manager" required placeholder="خالد العتيبي" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="center">اسم مركز الاتصال</Label>
            <Input id="center" required placeholder="مركز الاتصال الذهبي" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" required placeholder="cc@center.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input id="phone" required placeholder="01xxxxxxxxx" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw">كلمة المرور</Label>
            <Input id="pw" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpw">تأكيد كلمة المرور</Label>
            <Input id="cpw" type="password" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="details">بيانات مركز الاتصال</Label>
          <Textarea id="details" rows={3} placeholder="عدد الموظفين، ساعات العمل، اللغات المدعومة، التخصص..." />
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
          <Label htmlFor="terms" className="text-sm leading-relaxed font-normal">
            أوافق على الشروط والأحكام وسياسة الخصوصية
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          إنشاء حساب Call Center
        </Button>
      </form>
    </AuthLayout>
  );
}

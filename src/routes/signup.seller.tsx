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

export const Route = createFileRoute("/signup/seller")({
  head: () => ({
    meta: [
      { title: "تسجيل حساب سيلر — Kassebni Contact" },
      { name: "description", content: "أنشئ حساب سيلر لإدارة طلباتك وتوزيعها على مراكز الاتصال." },
      { property: "og:title", content: "تسجيل حساب سيلر — Kassebni Contact" },
      { property: "og:description", content: "ابدأ بإدارة طلبات متجرك وتأكيدها باحترافية." },
    ],
  }),
  component: SellerSignup,
});

function SellerSignup() {
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
      toast.success("تم إنشاء حساب السيلر، بانتظار المراجعة");
      navigate({ to: "/login" });
    }, 800);
  };

  return (
    <AuthLayout
      title="تسجيل حساب سيلر"
      description="أنشئ حساب متجرك وابدأ بإرسال طلباتك لمراكز الاتصال المعتمدة."
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
            <Label htmlFor="name">الاسم بالكامل</Label>
            <Input id="name" required placeholder="أحمد محمود" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">اسم الشركة / النشاط</Label>
            <Input id="company" required placeholder="متجر النخبة" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" required placeholder="seller@company.com" />
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
          <Label htmlFor="extra">بيانات إضافية عن النشاط</Label>
          <Textarea id="extra" rows={3} placeholder="نوع المنتجات، متوسط الطلبات اليومية، المدن المستهدفة..." />
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="terms" checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
          <Label htmlFor="terms" className="text-sm leading-relaxed font-normal">
            أوافق على الشروط والأحكام وسياسة الخصوصية
          </Label>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          إنشاء حساب Seller
        </Button>
      </form>
    </AuthLayout>
  );
}

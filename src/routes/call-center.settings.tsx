import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AccountSettings } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/call-center/settings")({
  head: () => ({
    meta: [
      { title: "إعدادات حساب مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "تحديث بيانات المركز وكلمة المرور." },
      { property: "og:title", content: "إعدادات حساب مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "تحديث بيانات المركز وكلمة المرور." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="call-center">
      <AccountSettings />
    </AppShell>
  );
}

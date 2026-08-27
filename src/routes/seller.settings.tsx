import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AccountSettings } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/seller/settings")({
  head: () => ({
    meta: [
      { title: "إعدادات حساب السيلر — Kassebni Contact" },
      { name: "description", content: "تحديث بيانات حسابك وكلمة المرور." },
      { property: "og:title", content: "إعدادات حساب السيلر — Kassebni Contact" },
      { property: "og:description", content: "تحديث بيانات حسابك وكلمة المرور." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <AccountSettings />
    </AppShell>
  );
}

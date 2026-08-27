import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminSettings } from "@/components/app/pages/admin-core";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "إعدادات النظام — Kassebni Contact" },
      { name: "description", content: "الإعدادات العامة والأمان والطلبات والتوزيع والحوافز." },
      { property: "og:title", content: "إعدادات النظام — Kassebni Contact" },
      { property: "og:description", content: "الإعدادات العامة والأمان والطلبات والتوزيع والحوافز." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminSettings />
    </AppShell>
  );
}

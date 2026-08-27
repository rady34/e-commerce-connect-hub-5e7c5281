import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminDashboard } from "@/components/app/pages/admin-core";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم الإدارة — Kassebni Contact" },
      { name: "description", content: "نظرة شاملة على الطلبات والمبيعات والأداء في منصة Kassebni Contact." },
      { property: "og:title", content: "لوحة تحكم الإدارة — Kassebni Contact" },
      { property: "og:description", content: "نظرة شاملة على الطلبات والمبيعات والأداء في منصة Kassebni Contact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminDashboard />
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminActivityLog } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/activity-log")({
  head: () => ({
    meta: [
      { title: "سجل النشاط — Kassebni Contact" },
      { name: "description", content: "سجل عمليات المستخدمين داخل المنصة." },
      { property: "og:title", content: "سجل النشاط — Kassebni Contact" },
      { property: "og:description", content: "سجل عمليات المستخدمين داخل المنصة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminActivityLog />
    </AppShell>
  );
}

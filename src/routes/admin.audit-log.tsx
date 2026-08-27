import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminAuditLog } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/audit-log")({
  head: () => ({
    meta: [
      { title: "سجل التدقيق — Kassebni Contact" },
      { name: "description", content: "سجل تفصيلي للتغييرات والقيم القديمة والجديدة." },
      { property: "og:title", content: "سجل التدقيق — Kassebni Contact" },
      { property: "og:description", content: "سجل تفصيلي للتغييرات والقيم القديمة والجديدة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminAuditLog />
    </AppShell>
  );
}

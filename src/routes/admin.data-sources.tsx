import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminDataSources } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/data-sources")({
  head: () => ({
    meta: [
      { title: "مصادر البيانات — Kassebni Contact" },
      { name: "description", content: "إدارة مصادر بيانات الطلبات الواردة إلى المنصة." },
      { property: "og:title", content: "مصادر البيانات — Kassebni Contact" },
      { property: "og:description", content: "إدارة مصادر بيانات الطلبات الواردة إلى المنصة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminDataSources />
    </AppShell>
  );
}

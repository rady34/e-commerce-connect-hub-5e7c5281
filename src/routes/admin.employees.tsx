import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminEmployees } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/employees")({
  head: () => ({
    meta: [
      { title: "الموظفون — Kassebni Contact" },
      { name: "description", content: "إدارة موظفي مراكز الاتصال وأدوارهم وأدائهم." },
      { property: "og:title", content: "الموظفون — Kassebni Contact" },
      { property: "og:description", content: "إدارة موظفي مراكز الاتصال وأدوارهم وأدائهم." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminEmployees />
    </AppShell>
  );
}

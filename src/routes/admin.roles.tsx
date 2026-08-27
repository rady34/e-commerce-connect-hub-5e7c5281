import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminRoles } from "@/components/app/pages/admin-core";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      { title: "الأدوار — Kassebni Contact" },
      { name: "description", content: "إنشاء وتعديل أدوار المستخدمين في Kassebni Contact." },
      { property: "og:title", content: "الأدوار — Kassebni Contact" },
      { property: "og:description", content: "إنشاء وتعديل أدوار المستخدمين في Kassebni Contact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminRoles />
    </AppShell>
  );
}

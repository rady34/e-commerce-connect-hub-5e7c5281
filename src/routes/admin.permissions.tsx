import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminPermissions } from "@/components/app/pages/admin-core";

export const Route = createFileRoute("/admin/permissions")({
  head: () => ({
    meta: [
      { title: "الصلاحيات — Kassebni Contact" },
      { name: "description", content: "مصفوفة صلاحيات الوحدات والإجراءات في Kassebni Contact." },
      { property: "og:title", content: "الصلاحيات — Kassebni Contact" },
      { property: "og:description", content: "مصفوفة صلاحيات الوحدات والإجراءات في Kassebni Contact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminPermissions />
    </AppShell>
  );
}

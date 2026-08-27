import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { NotificationsPage } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({
    meta: [
      { title: "الإشعارات — Kassebni Contact" },
      { name: "description", content: "إشعارات النظام المقروءة وغير المقروءة." },
      { property: "og:title", content: "الإشعارات — Kassebni Contact" },
      { property: "og:description", content: "إشعارات النظام المقروءة وغير المقروءة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <NotificationsPage />
    </AppShell>
  );
}

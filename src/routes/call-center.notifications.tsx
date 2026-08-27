import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { NotificationsPage } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/call-center/notifications")({
  head: () => ({
    meta: [
      { title: "إشعارات مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "إشعارات المركز والطلبات الجديدة." },
      { property: "og:title", content: "إشعارات مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "إشعارات المركز والطلبات الجديدة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="call-center">
      <NotificationsPage />
    </AppShell>
  );
}

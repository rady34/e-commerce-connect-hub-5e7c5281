import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { NotificationsPage } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/seller/notifications")({
  head: () => ({
    meta: [
      { title: "إشعارات السيلر — Kassebni Contact" },
      { name: "description", content: "إشعارات حسابك وطلباتك." },
      { property: "og:title", content: "إشعارات السيلر — Kassebni Contact" },
      { property: "og:description", content: "إشعارات حسابك وطلباتك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <NotificationsPage />
    </AppShell>
  );
}

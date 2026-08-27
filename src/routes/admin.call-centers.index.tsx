import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminCallCenters } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/call-centers/")({
  head: () => ({
    meta: [
      { title: "مراكز الاتصال — Kassebni Contact" },
      { name: "description", content: "إدارة مراكز الاتصال وموظفيها وأدائها." },
      { property: "og:title", content: "مراكز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "إدارة مراكز الاتصال وموظفيها وأدائها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminCallCenters />
    </AppShell>
  );
}

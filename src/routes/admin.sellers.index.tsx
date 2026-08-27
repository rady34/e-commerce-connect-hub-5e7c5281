import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminSellers } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/sellers/")({
  head: () => ({
    meta: [
      { title: "السيلرز — Kassebni Contact" },
      { name: "description", content: "قائمة السيلرز وأدائهم ومبيعاتهم في Kassebni Contact." },
      { property: "og:title", content: "السيلرز — Kassebni Contact" },
      { property: "og:description", content: "قائمة السيلرز وأدائهم ومبيعاتهم في Kassebni Contact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminSellers />
    </AppShell>
  );
}

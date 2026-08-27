import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminWallets } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/wallets")({
  head: () => ({
    meta: [
      { title: "المحافظ والمعاملات — Kassebni Contact" },
      { name: "description", content: "أرصدة المحافظ والإيداعات والسحوبات والمعاملات المالية." },
      { property: "og:title", content: "المحافظ والمعاملات — Kassebni Contact" },
      { property: "og:description", content: "أرصدة المحافظ والإيداعات والسحوبات والمعاملات المالية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminWallets />
    </AppShell>
  );
}

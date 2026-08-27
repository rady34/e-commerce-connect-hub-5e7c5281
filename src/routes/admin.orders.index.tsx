import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminOrders } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/orders/")({
  head: () => ({
    meta: [
      { title: "الطلبات — Kassebni Contact" },
      { name: "description", content: "إدارة وتوزيع ومتابعة طلبات التجارة الإلكترونية." },
      { property: "og:title", content: "الطلبات — Kassebni Contact" },
      { property: "og:description", content: "إدارة وتوزيع ومتابعة طلبات التجارة الإلكترونية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminOrders />
    </AppShell>
  );
}

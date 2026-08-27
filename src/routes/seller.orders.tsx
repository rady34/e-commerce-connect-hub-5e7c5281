import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SellerOrders } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/seller/orders")({
  head: () => ({
    meta: [
      { title: "طلبات السيلر — Kassebni Contact" },
      { name: "description", content: "متابعة حالة طلباتك وتفاصيلها." },
      { property: "og:title", content: "طلبات السيلر — Kassebni Contact" },
      { property: "og:description", content: "متابعة حالة طلباتك وتفاصيلها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <SellerOrders />
    </AppShell>
  );
}

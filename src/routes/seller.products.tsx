import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SellerProducts } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/seller/products")({
  head: () => ({
    meta: [
      { title: "منتجات السيلر — Kassebni Contact" },
      { name: "description", content: "إدارة منتجاتك وأسعارها ومخزونها." },
      { property: "og:title", content: "منتجات السيلر — Kassebni Contact" },
      { property: "og:description", content: "إدارة منتجاتك وأسعارها ومخزونها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <SellerProducts />
    </AppShell>
  );
}

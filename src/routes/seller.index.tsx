import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SellerDashboard } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/seller/")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم السيلر — Kassebni Contact" },
      { name: "description", content: "متابعة طلباتك ومبيعاتك ورصيد محفظتك وتقييمك." },
      { property: "og:title", content: "لوحة تحكم السيلر — Kassebni Contact" },
      { property: "og:description", content: "متابعة طلباتك ومبيعاتك ورصيد محفظتك وتقييمك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <SellerDashboard />
    </AppShell>
  );
}

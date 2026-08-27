import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SellerComplaints } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/seller/complaints")({
  head: () => ({
    meta: [
      { title: "شكاوى السيلر — Kassebni Contact" },
      { name: "description", content: "متابعة شكاوى العملاء الخاصة بطلباتك." },
      { property: "og:title", content: "شكاوى السيلر — Kassebni Contact" },
      { property: "og:description", content: "متابعة شكاوى العملاء الخاصة بطلباتك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <SellerComplaints />
    </AppShell>
  );
}

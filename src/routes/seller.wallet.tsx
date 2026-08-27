import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { RoleWallet } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/seller/wallet")({
  head: () => ({
    meta: [
      { title: "محفظة السيلر — Kassebni Contact" },
      { name: "description", content: "رصيد محفظتك ومعاملاتك المالية داخل المنصة." },
      { property: "og:title", content: "محفظة السيلر — Kassebni Contact" },
      { property: "og:description", content: "رصيد محفظتك ومعاملاتك المالية داخل المنصة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="seller">
      <RoleWallet balance={48250} />
    </AppShell>
  );
}

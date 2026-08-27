import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { RoleWallet } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/call-center/wallet")({
  head: () => ({
    meta: [
      { title: "محفظة مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "رصيد المركز والمعاملات المالية والمستحقات." },
      { property: "og:title", content: "محفظة مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "رصيد المركز والمعاملات المالية والمستحقات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="call-center">
      <RoleWallet balance={76400} />
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminIncentives } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/incentives")({
  head: () => ({
    meta: [
      { title: "الحوافز — Kassebni Contact" },
      { name: "description", content: "برامج الحوافز والمكافآت المستهدفة داخل المنصة." },
      { property: "og:title", content: "الحوافز — Kassebni Contact" },
      { property: "og:description", content: "برامج الحوافز والمكافآت المستهدفة داخل المنصة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminIncentives />
    </AppShell>
  );
}

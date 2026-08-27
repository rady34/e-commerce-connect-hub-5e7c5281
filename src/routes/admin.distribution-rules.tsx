import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminDistributionRules } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/distribution-rules")({
  head: () => ({
    meta: [
      { title: "قواعد التوزيع — Kassebni Contact" },
      { name: "description", content: "إعداد قواعد توزيع الطلبات على السيلرز ومراكز الاتصال." },
      { property: "og:title", content: "قواعد التوزيع — Kassebni Contact" },
      { property: "og:description", content: "إعداد قواعد توزيع الطلبات على السيلرز ومراكز الاتصال." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminDistributionRules />
    </AppShell>
  );
}

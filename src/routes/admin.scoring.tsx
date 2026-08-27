import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminScoring } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/scoring")({
  head: () => ({
    meta: [
      { title: "التقييم والـ Score — Kassebni Contact" },
      { name: "description", content: "مؤشرات الأداء وترتيب السيلرز ومراكز الاتصال والموظفين." },
      { property: "og:title", content: "التقييم والـ Score — Kassebni Contact" },
      { property: "og:description", content: "مؤشرات الأداء وترتيب السيلرز ومراكز الاتصال والموظفين." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminScoring />
    </AppShell>
  );
}

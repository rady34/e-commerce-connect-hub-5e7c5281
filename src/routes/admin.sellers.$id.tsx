import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminSellerDetail } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/sellers/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل السيلر — Kassebni Contact" },
      { name: "description", content: "بيانات السيلر وطلباته ومنتجاته ومحفظته وتقييمه." },
      { property: "og:title", content: "تفاصيل السيلر — Kassebni Contact" },
      { property: "og:description", content: "بيانات السيلر وطلباته ومنتجاته ومحفظته وتقييمه." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell role="admin">
      <AdminSellerDetail id={id} />
    </AppShell>
  );
}

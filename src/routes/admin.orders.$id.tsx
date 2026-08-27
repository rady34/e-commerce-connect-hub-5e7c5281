import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminOrderDetail } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/orders/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل الطلب — Kassebni Contact" },
      { name: "description", content: "بيانات الطلب وحالته وملاحظاته وإجراءاته." },
      { property: "og:title", content: "تفاصيل الطلب — Kassebni Contact" },
      { property: "og:description", content: "بيانات الطلب وحالته وملاحظاته وإجراءاته." },
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
      <AdminOrderDetail id={id} />
    </AppShell>
  );
}

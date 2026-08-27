import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminCallCenterDetail } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/call-centers/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "بيانات مركز الاتصال وموظفيه وطلباته وأدائه." },
      { property: "og:title", content: "تفاصيل مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "بيانات مركز الاتصال وموظفيه وطلباته وأدائه." },
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
      <AdminCallCenterDetail id={id} />
    </AppShell>
  );
}

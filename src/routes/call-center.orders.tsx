import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { CallCenterOrders } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/call-center/orders")({
  head: () => ({
    meta: [
      { title: "طلبات مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "الطلبات الموزعة على مركز الاتصال." },
      { property: "og:title", content: "طلبات مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "الطلبات الموزعة على مركز الاتصال." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="call-center">
      <CallCenterOrders />
    </AppShell>
  );
}

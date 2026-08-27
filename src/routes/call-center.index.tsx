import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { CallCenterDashboard } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/call-center/")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "متابعة الطلبات والشكاوى وأداء الموظفين." },
      { property: "og:title", content: "لوحة تحكم مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "متابعة الطلبات والشكاوى وأداء الموظفين." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="call-center">
      <CallCenterDashboard />
    </AppShell>
  );
}

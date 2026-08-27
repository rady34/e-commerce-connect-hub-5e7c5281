import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { CallCenterComplaints } from "@/components/app/pages/role-pages";

export const Route = createFileRoute("/call-center/complaints")({
  head: () => ({
    meta: [
      { title: "شكاوى مركز الاتصال — Kassebni Contact" },
      { name: "description", content: "متابعة شكاوى العملاء ومعالجتها." },
      { property: "og:title", content: "شكاوى مركز الاتصال — Kassebni Contact" },
      { property: "og:description", content: "متابعة شكاوى العملاء ومعالجتها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="call-center">
      <CallCenterComplaints />
    </AppShell>
  );
}

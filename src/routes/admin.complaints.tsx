import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AdminComplaints } from "@/components/app/pages/admin-entities";

export const Route = createFileRoute("/admin/complaints")({
  head: () => ({
    meta: [
      { title: "الشكاوى — Kassebni Contact" },
      { name: "description", content: "متابعة شكاوى العملاء وحالتها وأولويتها." },
      { property: "og:title", content: "الشكاوى — Kassebni Contact" },
      { property: "og:description", content: "متابعة شكاوى العملاء وحالتها وأولويتها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell role="admin">
      <AdminComplaints />
    </AppShell>
  );
}

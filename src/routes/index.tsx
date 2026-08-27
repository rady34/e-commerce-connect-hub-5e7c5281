import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSession } from "@/lib/session";
import { homeFor } from "@/components/app/nav-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kassebni Contact — منصة إدارة طلبات الكول سنتر" },
      {
        name: "description",
        content:
          "منصة تربط السيلرز بمراكز الاتصال لإدارة وتأكيد طلبات التجارة الإلكترونية، مع التوزيع والتقييم والحوافز والمحافظ.",
      },
      { property: "og:title", content: "Kassebni Contact — منصة إدارة طلبات الكول سنتر" },
      {
        property: "og:description",
        content: "إدارة الطلبات والتوزيع ومتابعة الأداء والحوافز والمحافظ والشكاوى في مكان واحد.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { user, effectiveRole, ready } = useSession();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!ready) return;
    if (user && effectiveRole) {
      navigate({ to: homeFor(effectiveRole), replace: true } as never);
    } else {
      navigate({ to: "/login", replace: true } as never);
    }
  }, [ready, user, effectiveRole, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
      جارٍ التحويل...
    </div>
  );
}

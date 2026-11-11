import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { Splash } from "@/components/splash";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [App, setApp] = useState<ComponentType | null>(null);

  useEffect(() => {
    void import("@/components/app-shell").then((mod) => setApp(() => mod.AppShell));
  }, []);

  if (!App) return <Splash />;
  return <App />;
}

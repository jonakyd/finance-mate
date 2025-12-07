import { StrictMode, type ComponentProps } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NavigationProvider from "../shared/ui/NavigationProvider";
import AppTabs from "./AppTabs";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const root = document.getElementById("root");

const initialTabLevels = [
  {
    key: "level-1",
    tabType: "home",
    activeKey: "banks-1",
    order: [
      { key: "banks-1", tabType: "banks" as const },
      { key: "trans-1", tabType: "transactions" as const },
    ],
  },
];

if (root) {
  createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <div>wtf</div>
        <NavigationProvider initialTabLevels={initialTabLevels}>
          <AppTabs tabKey={["home"]} />
        </NavigationProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

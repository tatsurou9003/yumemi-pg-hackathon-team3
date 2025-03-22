import { GroupProvider } from "@/contexts/group-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <GroupProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </GroupProvider>
  ),
});

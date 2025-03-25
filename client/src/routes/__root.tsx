import { GroupProvider } from "@/contexts/group-provider";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <GroupProvider>
      <ToastContainer />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </GroupProvider>
  ),
});

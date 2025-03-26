import { createRootRoute, Outlet } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <ToastContainer />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});

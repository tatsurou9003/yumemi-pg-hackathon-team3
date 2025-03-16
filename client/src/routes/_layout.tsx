import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Layout as LayoutComponent } from "@/components/layout/layout";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

function Layout() {
  const location = useLocation();
  const path = location.pathname ?? "";

  return (
    <LayoutComponent
      path={path}
      version="v1.0.0"
      avatar="https://files.oaiusercontent.com/file-XnoNCA2LDeVesnCJaEWhk1?se=2025-03-15T17%3A54%3A19Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd3b66fe6-6f9e-4720-b5db-31b1a4f99363.webp&sig=S2qtcRkxoEmnQp6KlcMr048lJVMvNQXItsD%2B5NzMVpU%3D"
      onLogout={() => {}}
    >
      <Outlet />
    </LayoutComponent>
  );
}

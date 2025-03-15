import { createFileRoute } from "@tanstack/react-router";
import { Route as LayoutRoute } from "./_layout";

export const Route = createFileRoute("/")({
  getParentRoute: () => LayoutRoute,
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}

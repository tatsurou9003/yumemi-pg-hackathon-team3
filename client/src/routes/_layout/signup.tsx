import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/signup"!</div>;
}

import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/title")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[url('/src/assets/icons/title-page.svg')] bg-no-repeat bg-cover bg-center"></div>
  );
}

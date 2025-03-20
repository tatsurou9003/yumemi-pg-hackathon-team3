import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/title")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <div className="relative w-[393px] h-[852px] left-[75px] top-[102px] bg-[#FF9350]"></div>
    </div>
  );
}

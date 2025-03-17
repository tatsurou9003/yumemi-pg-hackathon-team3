import RoomForm from "@/features/room/room-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/room")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col justify-end bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <RoomForm />
    </div>
  );
}

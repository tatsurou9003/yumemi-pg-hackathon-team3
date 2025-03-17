import CloseOogiri from "@/features/room/close-oogiri";
import RoomForm from "@/features/room/room-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/room")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <div>
        <CloseOogiri theme="ゆめみハッカソンから飛んだエンジニア。何があった？" />
      </div>
      <div>
        <RoomForm />
      </div>
    </div>
  );
}

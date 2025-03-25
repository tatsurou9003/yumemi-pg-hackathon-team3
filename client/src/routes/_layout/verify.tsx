import { createFileRoute } from "@tanstack/react-router";
import VerifyForm from "@/features/verify/verify-form";

export const Route = createFileRoute("/_layout/verify")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[url(/src/assets/icons/character.svg)]">
      <div className="w-full flex justify-center">
        <VerifyForm />
      </div>
    </div>
  );
}

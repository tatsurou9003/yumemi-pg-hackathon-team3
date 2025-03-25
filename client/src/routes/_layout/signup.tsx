import { createFileRoute } from "@tanstack/react-router";
import LginBackButton from "@/features/signup/login-back-button";
import SignupForm from "@/features/signup/signup-form";

export const Route = createFileRoute("/_layout/signup")({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center ">
      <SignupForm />
      <div className="h-3" />
      <LginBackButton />
    </div>
  );
}

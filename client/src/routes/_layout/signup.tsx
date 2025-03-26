import { createFileRoute } from "@tanstack/react-router";
import LoginBackButton from "@/features/signup/login-back-button";
import SignupForm from "@/features/signup/signup-form";

export const Route = createFileRoute("/_layout/signup")({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="h-full bg-[url(/src/assets/icons/character.svg)]">
      <SignupForm />
      <div className="h-3" />
      <LoginBackButton />
    </div>
  );
}

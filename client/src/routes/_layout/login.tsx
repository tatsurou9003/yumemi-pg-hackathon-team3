import LoginForm from "@/components/common/form/loginform";
import GoogleButton from "@/components/common/button/google-login-button";
import SignUpButton from "@/components/common/button/sign-up-button";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const isVisible = true; // or set this based on your logic

  return (
    <div
      className={`min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <LoginForm />
      <div className="text-black font-inter font-normal flex flex-col justify-center items-center top-[109px] relative">
        <SignUpButton />
      </div>
      <GoogleButton />
    </div>
  );
}

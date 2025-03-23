import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "@/components/common/form/loginform";
import SignBackButton from "@/components/common/button/login-back-button";
import SignUpSettingButton from "@/components/common/button/sign-up-setting";
export const Route = createFileRoute("/_layout/signup")({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center ">
      <LoginForm />
      <SignUpSettingButton />
      <SignBackButton />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "@/components/common/form/loginform";
import SignBackButton from "@/features/signup/login-back-button";
import SignUpSettingButton from "@/features/signup/sign-up-setting";
export const Route = createFileRoute("/_layout/sigunp")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center">
      <div className="absolute mb-4 top-[40px] ">
        <LoginForm />
      </div>
      <div className="absolute mb-4  top-[160px] w-[152px] h-[27px]  ">
        <SignUpSettingButton />
      </div>
      <div className="absolute mb-4  top-[285px] w-[152px] h-[27px]  ">
        <SignBackButton />
      </div>
    </div>
  );
}

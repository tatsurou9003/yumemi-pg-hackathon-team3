import LoginForm from "@/components/common/form/loginform";
import GoogleButton from "@/components/common/button/google-login-button"
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <LoginForm />
      <section className="w-40 text-black">
      <p >新規登録</p>
      </section>
      <section className="absolute w-[152px] h-[27px] left-[120px] top-[301px] bg-white rounded-[4px]">
      <GoogleButton/>
      </section>
    </div>
  );
}

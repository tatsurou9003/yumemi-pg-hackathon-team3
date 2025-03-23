import LoginForm from "@/components/common/form/loginform";
import GoogleButton from "@/components/common/button/google-login-button";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import LoginButton from "@/components/common/button/login-button";
import GoogleButton from "@/components/common/button/google-login-button";
import SignUpButton from "@/components/common/button/sign-up-button";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされた直後は透明
    // 少し遅延させてからフェードイン開始
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <LoginForm />
      <section className="w-40 text-black">
        <p>新規登録</p>
      </section>
      <section className="absolute w-[152px] h-[27px] left-[120px] top-[301px] bg-white rounded-[4px]">
        <GoogleButton />
      </section>
  return (
    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center ">
      <LoginForm />
      <LoginButton />
      <div className="text-black font-inter font-normal flex flex-col justify-center items-center top-[109px] relative">
        <SignUpButton />
      </div>
      <GoogleButton />
    </div>
  );
}

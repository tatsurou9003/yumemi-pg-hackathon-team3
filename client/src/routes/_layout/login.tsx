import LoginForm from "@/components/common/form/loginform";
import LoginButton from "@/components/common/button/login-button";
import GoogleButton from "@/components/common/button/google-login-button";
import SignUpButton from "@/components/common/button/sign-up-button";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
      <LoginButton />
      <div className="text-black font-inter font-normal flex flex-col justify-center items-center top-[109px] relative">
        <SignUpButton />
      </div>
      <GoogleButton />
    </div>
  );
}

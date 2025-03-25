import { useState, useEffect } from "react";
import LoginForm from "@/components/common/form/loginform";
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
      className={`h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <LoginForm />
        <SignUpButton />
        <GoogleButton />
      </div>
    </div>
  );
}

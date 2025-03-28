import { useState, useEffect } from "react";
import LoginForm from "@/features/login/login-form";
import ToSignUpButton from "@/features/login/to-signup-button";
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
      className={`h-full bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
    >
      <LoginForm />
      <div className="text-black font-inter font-normal flex flex-col justify-center items-center top-[109px] relative">
        <ToSignUpButton />
      </div>
    </div>
  );
}

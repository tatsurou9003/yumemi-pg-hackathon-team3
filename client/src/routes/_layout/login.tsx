import LoginForm from "@/components/common/form/loginform";
import GoogleButton from "@/components/common/button/google-login-button";
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
<<<<<<< HEAD
    <div
      className={`min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
=======

    <div className="min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center ">
>>>>>>> login-dom
      <LoginForm />
      <section className="w-40 text-black">
        <p>新規登録</p>
      </section>
      <section className="absolute w-[152px] h-[27px] left-[120px] top-[301px] bg-white rounded-[4px]">
        <GoogleButton />
      </section>
    </div>
  );
}

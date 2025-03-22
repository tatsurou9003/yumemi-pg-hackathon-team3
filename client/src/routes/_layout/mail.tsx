import { createFileRoute } from "@tanstack/react-router";
import SignUpMailButton from "@/components/common/button/sign-up-mail-button";
export const Route = createFileRoute("/_layout/mail")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)] bg-no-repeat bg-contain bg-center">
      <div className="absolute mb-4 top-[40px] font-inter font-bold text-[12px] leading-[15px] text-black ">
        <p>入力されたメールアドレスに登録メールをお送りしました。</p>
        <p>○分以内にクリックして登録を完了してください。</p>
      </div>
      <div className="absolute mb-4  top-[20px] w-[152px] h-[27px]  ">
        <SignUpMailButton />
      </div>
    </div>
  );
}

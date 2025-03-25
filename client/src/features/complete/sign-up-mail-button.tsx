import { useNavigate } from "@tanstack/react-router";
const SignUpMailButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => {
          navigate({ to: "/login" });
        }}
        type="submit"
        className="relative w-[152px] h-[27px]  top-[104px] rounded
                     bg-white text-black text-sm font-medium cursor-pointer  "
      >
        ログイン画面へ
      </button>
    </div>
  );
};

export default SignUpMailButton;

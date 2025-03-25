import { useNavigate } from "@tanstack/react-router";
const SignUpSettingButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => {
          navigate({ to: "/complete" });
        }}
        type="submit"
        className="relative w-[152px] h-[27px]  top-[104px] rounded
                   bg-white text-black text-sm font-medium cursor-pointer  "
      >
        新規登録
      </button>
    </div>
  );
};

export default SignUpSettingButton;

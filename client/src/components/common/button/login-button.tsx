import { useNavigate } from "@tanstack/react-router";
const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <button
      onClick={() => {
        navigate({ to: "/home" });
      }}
        type="submit"
        className="relative w-[152px] h-[27px]  top-[104px] border-radius
                 bg-white text-black text-sm font-medium cursor-pointer  "
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginButton;

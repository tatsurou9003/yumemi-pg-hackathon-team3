import { useNavigate } from "@tanstack/react-router";

const ToSignUpButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => {
          navigate({ to: "/signup" });
        }}
        type="submit"
        className="relative w-[152px] h-[27px] top-[5px] text-black text-sm font-medium cursor-pointer"
      >
        新規登録
      </button>
    </div>
  );
};
export default ToSignUpButton;

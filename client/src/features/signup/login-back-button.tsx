import { useNavigate } from "@tanstack/react-router";
const LginBackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => {
          navigate({ to: "/login" });
        }}
        type="submit"
        className="relative w-[152px] h-[27px]  top-[104px] rounded-[4px] text-black text-sm font-medium cursor-pointer"
      >
        ログイン
      </button>
    </div>
  );
};

export default LginBackButton;

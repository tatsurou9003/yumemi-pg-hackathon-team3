import { useNavigate } from "@tanstack/react-router";
const GoogleButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => {
          navigate({ to: "/home" });
        }}
        className="relative w-[152px] h-[27px]  top-[140px] 
                 bg-white rounded-[4px] cursor-pointer 
                 text-black text-sm font-medium 
                 "
      >
        認証スキップボタン
      </button>
    </div>
  );
};

export default GoogleButton;

import { LoadingIndicatorProps } from "@/types/common";

const LoadingIndicator = ({
  message = "大喜利準備中",
}: LoadingIndicatorProps) => {
  return (
    <div
      className={`h-full flex flex-col items-center justify-center bg-[#FFBC92]`}
    >
      <div className="w-16 h-16 relative mb-4 animate-bounce">
        <img
          src="/src/assets/icons/character.svg"
          alt="キャラクター"
          className="w-full h-full"
        />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] animate-pulse">
          <span>?</span>
        </div>
      </div>
      <div className="text-[#743E3E] font-bold text-lg">{message}</div>
      <div className="mt-2 flex space-x-1">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className="w-2 h-2 bg-[#743E3E] rounded-full animate-pulse"
            style={{ animationDelay: `${dot * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingIndicator;

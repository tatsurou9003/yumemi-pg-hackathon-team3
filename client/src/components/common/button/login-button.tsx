import React from "react";

const LoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute w-[152px] h-[27px] left-[120px] top-[210px] 
                 bg-white rounded-[4px] border border-gray-300 
                 text-black text-sm font-medium flex items-center justify-center 
                 hover:bg-gray-100 transition"
    >
      ログイン
    </button>
  );
};

export default LoginButton;

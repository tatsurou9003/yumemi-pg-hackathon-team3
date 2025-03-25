import { useNavigate } from "@tanstack/react-router";
const LoginButton = () => {
  const navigate = useNavigate();
  
  function signUp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    // Implement your sign-up logic here
    // For example, navigate to a different page after sign-up
    navigate({ to: "/home" });
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={signUp}
        type="submit"
        className="relative w-[152px] h-[27px]  top-[104px] rounded-[4px] bg-white text-black text-sm font-medium cursor-pointer  "
      >
        ログイン
      </button>
    </div>
  );
};

export default LoginButton;

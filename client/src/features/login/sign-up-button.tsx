import { useNavigate } from "@tanstack/react-router";
const SignUpButton = () => {
  const navigate = useNavigate();
  function displayLocalStorage() {
    console.log(localStorage.getItem('CognitoIdentityServiceProvider.62p2moq06chrr2116tnph73rjl.lotus1759@gmail.com.idToken'))
  }

  displayLocalStorage();

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
export default SignUpButton;

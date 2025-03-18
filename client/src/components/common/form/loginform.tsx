import { useForm } from "react-hook-form";

const LoginForm = () => {
  // useFormフックの呼び出し
  const { handleSubmit} = useForm();

  // フォーム送信時の処理
  const onSubmit = (data: any) => {
    console.log("フォームデータ: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="emailaddress"
        placeholder="メールアドレス"
      />
      <input
        type="text"
        id="password"
        placeholder="パスワード"
      />
      
    </form>
  );
}

export default LoginForm;

import React from "react";
import LoginButton from "../button/login-button";
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import awsConfiguration from "@/awsConfiguration";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const LoginForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const changedEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const changedPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const signUp = () => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];
    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error(err);
        console.error(result);
        alert("Error, signUp");
        return;
      }
      setEmail("");
      setPassword("");
      console.log("conmplete, SignUp !!");
    });
  };

  return (
    <form className="flex flex-col justify-center items-center">
      <input
        type="email"
        value={email}
        onChange={changedEmailHandler}
        placeholder="メールアドレス"
        className="w-[310px] h-[48px] mb-4 bg-white border border-gray-300 rounded px-4 text-gray-500"
      />
      <input
        type="password"
        value={password}
        onChange={changedPasswordHandler}
        placeholder="パスワード"
        className="w-[310px] h-[48px] mb-4 bg-white border border-gray-300 rounded px-4 text-gray-500"
      />
      
      <LoginButton onClick={signUp} />
    </form>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from "amazon-cognito-identity-js";
import { useNavigate } from "@tanstack/react-router";
import awsConfiguration from "@/awsConfiguration";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); 

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log("ログイン成功: ", result);
        navigate({to : "/home"});
      },
      onFailure: (err) => {
        console.error("ログイン失敗: ", err);
      },
    });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        className="w-[310px] h-[48px] mb-4 bg-white border border-gray-300 rounded px-4 text-gray-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        className="w-[310px] h-[48px] mb-4 bg-white border border-gray-300 rounded px-4 text-gray-500"
      />
    </form>
  );
};

export default LoginForm;

import React from "react";
import LoginButton from "@/components/common/button/login-button";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import awsConfiguration from "@/awsConfiguration";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const LoginForm = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const changedEmailHaldler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const changedPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("result: " + result);
        const accessToken = result.getAccessToken().getJwtToken();
        console.log("AccessToken: " + accessToken);
        setEmail("");
        setPassword("");
        console.log("OK, signIn");
      },
      onFailure: (err) => {
        alert("NG, Login please check email, password");
        console.log("NG, signIn:onFailure");
        console.error(err);
      },
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center mt-[80px]"
      onSubmit={signIn}
    >
      <input
        type="email"
        value={email}
        onChange={changedEmailHaldler}
        placeholder="メールアドレス"
        className="w-[310px] h-[48px] mb-4 bg-white border border-gray-300 rounded px-4 text-gray-500 "
      />
      <input
        type="password"
        value={password}
        onChange={changedPasswordHandler}
        placeholder="パスワード"
        className="w-[310px] h-[48px] mb-4 bg-white border border-gray-300 rounded px-4 text-gray-500"
      />
      <LoginButton />
    </form>
  );
};

export default LoginForm;

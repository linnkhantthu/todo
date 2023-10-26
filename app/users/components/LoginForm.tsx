import { AuthResults, FlashMessage } from "@/lib/models";
import React, { useState } from "react";
import Legend from "./Legend";
import Loading from "./Loading";
import Submit from "@/app/components/Submit";

const LoginForm = ({
  handler,
  handleLogin,
  flashMessage,
  isSubmitting,
}: {
  handler: any;
  handleLogin: any;
  flashMessage: FlashMessage | undefined;
  isSubmitting: boolean;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex flex-row justify-center m-2 w-screen">
        <fieldset className="flex flex-col w-1/3">
          <Legend title={"Login"} flashMessage={flashMessage} />
          <form
            className="flex flex-col flex-none form form-control text-lg"
            onSubmit={handleLogin}
          >
            <label className="label label-text" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="input input-bordered"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <label className="label label-text" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input input-bordered"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <Submit isSubmitting={isSubmitting} />
          </form>
          <a href="#" className="link link-success" onClick={handler}>
            Do not have an account?
          </a>
          <a href="/users/auth/forgotPassword" className="link link-success">
            Forgot Password?
          </a>
        </fieldset>
      </div>
    </>
  );
};

export default LoginForm;

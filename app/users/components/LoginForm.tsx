import { AuthResults } from "@/lib/models";
import React, { useState } from "react";

const LoginForm = ({
  handler,
  handleLogin,
  flashMessage,
}: {
  handler: any;
  handleLogin: any;
  flashMessage: AuthResults | undefined;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="flex flex-row justify-center m-2 w-screen">
        <fieldset className="flex flex-col w-1/3">
          <legend>
            <h1>Login</h1>
            {flashMessage ? (
              <small className="text text-red-600">{flashMessage}</small>
            ) : (
              ""
            )}
          </legend>
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
            <input
              className="my-2 btn btn-info w-20"
              type="submit"
              value={"Submit"}
            />
          </form>
          <a href="#" onClick={handler}>
            Do not have an account?
          </a>
        </fieldset>
      </div>
    </>
  );
};

export default LoginForm;

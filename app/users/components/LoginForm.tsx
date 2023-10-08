import React, { useState } from "react";

const LoginForm = ({ handler, handleLogin} : any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  return (
    <>
      <div className="mx-auto">
        <fieldset>
          <legend>
            <h1>Login</h1>
          </legend>
          <form className=" form form-control text-lg" onSubmit={handleLogin}>
            <label className="label label-text" htmlFor="username">
              Username
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
              required
            />
            <label className="label label-text" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              required
            />
            <input
              className="my-2 btn btn-info w-20"
              type="submit"
              value={"Submit"}
            />
          </form>
        </fieldset>
        <a href="#" onClick={handler}>
          Do not have an account?
        </a>
      </div>
    </>
  );
};

export default LoginForm;

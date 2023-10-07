import Link from "next/link";
import React from "react";

const LoginForm = ({ handler }: any) => {
  return (
    <>
      <div className="container mx-auto py-4 px-4 max-w-sm">
        <fieldset>
          <legend>
            <h1>Login</h1>
          </legend>
          <form className=" form form-control text-lg">
            <label className="label label-text" htmlFor="username">
              Username
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="username"
            />
            <label className="label label-text" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered"
              type="password"
              name="password"
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

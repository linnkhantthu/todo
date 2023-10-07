import React from "react";

const UserRegister = () => {
  return (
    <>
      <div className="container mx-auto py-4 px-4 max-w-sm">
        <fieldset>
          <legend>
            <h1>Register Form</h1>
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

            <label className="label label-text" htmlFor="email">
              email
            </label>
            <input className="input input-bordered" type="email" name="email" />

            <label className="label label-text" htmlFor="bod">
              Birth Date
            </label>
            <input className="input input-bordered" type="date" name="bod" />

            <label className="label label-text" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered"
              type="password"
              name="password"
            />

            <label className="label label-text" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="input input-bordered"
              type="password"
              name="confirmPassword"
            />

            <input
              className="my-2 btn btn-info w-20"
              type="submit"
              value={"Submit"}
            />
          </form>
        </fieldset>
      </div>
    </>
  );
};

export default UserRegister;

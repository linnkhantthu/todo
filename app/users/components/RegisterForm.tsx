import { AuthResults, FlashMessage } from "@/lib/models";
import React, { useState } from "react";
import Legend from "./Legend";
import Submit from "@/app/components/Submit";

const RegisterForm = ({
  handler,
  handleRegister,
  flashMessage,
  isSubmitting,
}: {
  handler: any;
  handleRegister: any;
  flashMessage: FlashMessage | undefined;
  isSubmitting: boolean;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(Date.now().toString());
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <Legend title={"Register"} flashMessage={flashMessage} />
      <form className=" form form-control text-lg" onSubmit={handleRegister}>
        <label className="label label-text" htmlFor="username">
          Username
        </label>
        <input
          className="input input-bordered"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label label-text" htmlFor="email">
          email
        </label>
        <input
          className="input input-bordered"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label label-text" htmlFor="dob">
          Birth Date
        </label>
        <input
          className="input input-bordered"
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <label className="label label-text" htmlFor="password">
          Password
        </label>
        <input
          className="input input-bordered"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="label label-text" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="input input-bordered"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {confirmPassword !== password ? (
          <small className="text-red-600">
            Confirm Password much equal to Password
          </small>
        ) : (
          ""
        )}
        <Submit isSubmitting={isSubmitting} />
      </form>
      <a href="#" onClick={handler}>
        Already have an account?
      </a>
    </>
  );
};

export default RegisterForm;

import { AuthResults, FlashMessage, Rules } from "@/lib/models";
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

  function getDate(lessThan?: number): string {
    let now = new Date();
    now.setFullYear(now.getFullYear() - (lessThan ? lessThan : 18));
    const date = now.toLocaleString().split(",")[0].split("/");
    console.log(date);
    const year = date[2].toString();
    const month = parseInt(date[1]);
    const strMonth = month > 10 ? month.toString() : "0" + month.toString();
    const day = date[0].toString();
    return year + "-" + strMonth + "-" + day;
  }

  return (
    <>
      <Legend title={"Register"} flashMessage={flashMessage} />
      <form className=" form form-control text-lg" onSubmit={handleRegister}>
        <label className="label label-text" htmlFor="username">
          Username
        </label>
        0{" "}
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
          max={getDate()}
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
          onChange={(e) => setPassword(e.target.value)}
          minLength={Rules.MIN_PWD_LEN}
          required
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
          minLength={Rules.MIN_PWD_LEN}
          required
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

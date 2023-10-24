import { FlashMessage } from "@/lib/models";
import React, { useState } from "react";

function PasswordResetForm({
  flashMessage,
  handleSubmit,
}: {
  flashMessage: FlashMessage | undefined;
  handleSubmit: any;
}) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-row justify-center m-2 w-screen">
      <fieldset className="flex flex-col w-1/3">
        <legend className="flex flex-col w-full">
          {flashMessage ? (
            <small
              className={
                "mb-2 rounded p-1 pl-2 w-full " + flashMessage.category
              }
            >
              {flashMessage.message}
            </small>
          ) : (
            ""
          )}
          <h1>Reset Passsword</h1>
        </legend>
        <form
          className="flex flex-col flex-none form form-control text-lg"
          onSubmit={handleSubmit}
        >
          <label className="label label-text" htmlFor="email">
            New Password
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
            id="confirmPassword"
            className="input input-bordered"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          {confirmPassword !== password ? (
            <small className="text-red-600">
              Confirm Password much equal to Password
            </small>
          ) : (
            ""
          )}

          <input
            className="my-2 btn btn-info w-20"
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
          />
        </form>
      </fieldset>
    </div>
  );
}

export default PasswordResetForm;

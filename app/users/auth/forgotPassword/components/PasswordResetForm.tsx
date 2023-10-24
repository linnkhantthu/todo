import { FlashMessage } from "@/lib/models";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";

function PasswordResetForm({
  flashMessage,
  handleSubmit,
  fetchedToken,
}: {
  flashMessage: FlashMessage | undefined;
  handleSubmit: (e: FormEvent, token: string) => Promise<void>;
  fetchedToken: string | undefined;
}) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitLocal = (e: FormEvent) => {
    e.preventDefault();
    if (fetchedToken !== undefined) {
      setIsSubmitting(true);
      handleSubmit(e, fetchedToken).then(() => {
        setIsSubmitting(false);
      });
    }
  };
  return fetchedToken !== undefined ? (
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
          onSubmit={handleSubmitLocal}
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

          <label className="label label-text" htmlFor="email">
            Confirm Password
          </label>
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
            className="my-2 btn btn-info w-24"
            type="submit"
            value={isSubmitting ? "Submitting..." : "Submit"}
          />
        </form>
      </fieldset>
    </div>
  ) : (
    redirect("/users/auth")
  );
}

export default PasswordResetForm;

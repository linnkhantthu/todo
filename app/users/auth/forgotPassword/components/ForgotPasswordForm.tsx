import { FlashMessage } from "@/lib/models";
import React, { FormEvent, useState } from "react";

function ForgotPasswordForm({
  flashMessage,
  handleSubmit,
}: {
  flashMessage: FlashMessage | undefined;
  handleSubmit: (e: FormEvent) => Promise<void>;
}) {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitLocal = (e: FormEvent) => {
    setIsSubmitting(true);
    handleSubmit(e).then(() => setIsSubmitting(false));
  };
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
          <h1>Enter Email</h1>
        </legend>
        <form
          className="flex flex-col flex-none form form-control text-lg"
          onSubmit={handleSubmitLocal}
        >
          <label className="label label-text" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input input-bordered"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
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

export default ForgotPasswordForm;

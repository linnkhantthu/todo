import Submit from "@/app/components/Submit";
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
    <>
      <legend className="flex flex-col w-full">
        {flashMessage ? (
          <small
            className={"mb-2 rounded p-1 pl-2 w-full " + flashMessage.category}
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
        <Submit isSubmitting={isSubmitting} />
      </form>
    </>
  );
}

export default ForgotPasswordForm;

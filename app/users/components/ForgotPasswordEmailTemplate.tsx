interface ForgotPasswordEmailTemplateProps {
  username: string;
  token: string;
}

import React from "react";

function ForgotPasswordEmailTemplate({
  username,
  token,
}: ForgotPasswordEmailTemplateProps) {
  return (
    <div>
      <h1>
        Hello, {username}, please click the following button to reset the
        password
      </h1>
      <button className="btn btn-error">Reset Password</button>
    </div>
  );
}

export default ForgotPasswordEmailTemplate;

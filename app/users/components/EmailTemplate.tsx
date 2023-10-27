interface EmailTemplateProps {
  description: string;
  username: string;
  token: string;
  path: string;
}

import React from "react";

function EmailTemplate({
  description,
  username,
  token,
  path,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>
        Hello, {username}, please click the following button {description}.
      </h1>
      <button className="btn btn-error">
        <a href={"http://localhost:3000" + path + token}>Reset Password</a>
      </button>
    </div>
  );
}

export default EmailTemplate;

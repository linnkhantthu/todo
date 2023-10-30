interface EmailTemplateProps {
  description: string;
  username: string;
  token: string;
  host: string;
  path: string;
  buttonValue: string;
}

import React from "react";

function EmailTemplate({
  description,
  username,
  token,
  host,
  path,
  buttonValue,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>
        Hello, {username}, please click the following button {description}.
      </h1>
      <button className="btn btn-error">
        <a href={"http://" + host + path + token}>{buttonValue}</a>
      </button>
    </div>
  );
}

export default EmailTemplate;

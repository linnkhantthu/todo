import React from "react";

function VerifyResetPasswordToken({ params }: { params: any }) {
  return <div>{params.token}</div>;
}

export default VerifyResetPasswordToken;

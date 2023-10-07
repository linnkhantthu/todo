"use client";

import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const Auth = () => {
  const [register, setRegister] = useState(false);
  const handleSetRegister = () => {
    setRegister((register) => !register);
  };
  return (
    <>
      {register ? (
        <RegisterForm handler={handleSetRegister} />
      ) : (
        <LoginForm handler={handleSetRegister} />
      )}
    </>
  );
};

export default Auth;

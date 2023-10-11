"use client";

import React, { FormEvent, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { User } from "@/lib/models";
import { redirect } from "next/navigation";

const isAuthenticated = async () => {
  const data = {
    passcode: process.env.COOKIE_PASSCODE,
  };
  const res = await fetch("/api/auth/getCookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  const user: User | undefined = await resData.user;
  return user;
};

const Auth = () => {
  const [register, setRegister] = useState(false);
  const handleSetRegister = () => {
    setRegister((register) => !register);
  };
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username");
    const password = formData.get("password");
    if (username && password) {
      const loginData = {
        type: "LOGIN",
        username: username,
        password: password,
      };
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
    }
  };
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username");
    const email = formData.get("email");
    const dob = formData.get("dob");
    const password = formData.get("password");

    if (username && password && email && dob && password) {
      console.log("Got Data");
      const registerData = {
        type: "REGISTER",
        username: username,
        email: email,
        dob: dob,
        password: password,
      };
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
    }
  };
  const isAuth = isAuthenticated();
  console.log(isAuth);
  if (isAuth === undefined) {
    redirect("/todos");
  }
  return (
    <>
      {register ? (
        <RegisterForm
          handler={handleSetRegister}
          handleRegister={handleRegister}
        />
      ) : (
        <LoginForm handler={handleSetRegister} handleLogin={handleLogin} />
      )}
    </>
  );
};

export default Auth;

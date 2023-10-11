"use client";

import React, { FormEvent, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
// import useSWR from "swr";
import { redirect } from "next/navigation";
import useUser from "@/lib/useUser";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const Auth = () => {
  // const { data } = useUser({ redirectTo: "/todos" });
  // const { data, error, isLoading } = useSWR("/api/auth/getcookie", fetcher);
  const { user, isError, isLoading } = useUser();

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
  // console.log(data);
  // if (!data || data?.isLoggedIn === false) {
  //   return <h1>Loading...</h1>;
  // }
  // if (data || data?.isLoggedIn === true) {
  //   redirect("/todos");
  // }

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

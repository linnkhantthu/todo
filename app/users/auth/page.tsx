"use client";

import React, { FormEvent, useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
// import useSWR from "swr";
import { redirect } from "next/navigation";
import useUser from "@/lib/useUser";
import { User } from "@/lib/models";

const Auth = () => {
  const { user, isError, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
  if (isLoading || isError) {
    return <h1>Loading...</h1>;
  } else {
    if (currentUser === undefined) {
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
    } else {
      redirect("/todos");
    }
  }
};

export default Auth;

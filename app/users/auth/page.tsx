"use client";

import React, { FormEvent, useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { redirect, useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import { AuthResults, User } from "@/lib/models";
import Loading from "../components/Loading";

const Auth = () => {
  const { user, isError, isLoading } = useUser();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isRegistered, setIsRegistered] = useState<AuthResults>();
  const [registerFlashMessage, setRegisterFlashMessage] =
    useState<AuthResults>();
  const [loginFlashMessage, setLoginFlashMessage] = useState<AuthResults>();
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  useEffect(() => {
    if (isRegistered === AuthResults.REGISTERED) {
      redirect("/users/auth");
    }
  }, [isRegistered]);

  const [register, setRegister] = useState(false);
  const handleSetRegister = () => {
    setRegister((register) => !register);
  };
  const handleLogin = async (e: FormEvent) => {
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
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      const user: User | undefined = data.user;
      if (user) {
        setCurrentUser(user);
      } else {
        setLoginFlashMessage(AuthResults.LOGINFAILED);
      }
    }
  };

  // Registeration handler
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username");
    const email = formData.get("email");
    const dob = formData.get("dob");
    const password = formData.get("password");

    if (username && password && email && dob && password) {
      const registerData = {
        type: "REGISTER",
        username: username,
        email: email,
        dob: dob,
        password: password,
      };
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      const message: AuthResults = data?.message;
      console.log(message);
      if (message === AuthResults.REGISTERED) {
        setIsRegistered(message);
      } else {
        setRegisterFlashMessage(message);
      }
    }
  };
  if (isLoading || isError) {
    return <Loading />;
  } else {
    if (currentUser === undefined) {
      return (
        <>
          {register ? (
            <RegisterForm
              handler={handleSetRegister}
              handleRegister={handleRegister}
              flashMessage={registerFlashMessage}
            />
          ) : (
            <LoginForm
              handler={handleSetRegister}
              handleLogin={handleLogin}
              flashMessage={loginFlashMessage}
            />
          )}
        </>
      );
    } else {
      redirect("/todos");
    }
  }
};

export default Auth;

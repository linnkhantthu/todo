"use client";

import React, { FormEvent, useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { redirect } from "next/navigation";
import useUser from "@/lib/useUser";
import { FlashMessage, Results, User } from "@/lib/models";
import Loading from "../components/Loading";

const Auth = () => {
  const { data, isError, isLoading, mutateUser } = useUser();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [registerFlashMessage, setRegisterFlashMessage] =
    useState<FlashMessage>();
  const [loginFlashMessage, setLoginFlashMessage] = useState<FlashMessage>();

  useEffect(() => {
    if (isRegistered) {
      redirect("/users/auth");
    }
  }, [isRegistered]);

  const [register, setRegister] = useState(false);
  const handleSetRegister = () => {
    setRegister((register) => !register);
  };

  // Handle Login Submit
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
      if (res.ok) {
        const data = await res.json();
        const { user, message }: { user: User | undefined; message: Results } =
          data;
        if (message === Results.SUCCESS && user) {
          mutateUser({ ...data, user: user });
        } else {
          setLoginFlashMessage({
            message: message,
            category: "bg-error",
          });
        }
      } else {
        setLoginFlashMessage({
          message: Results.CONNECTION_ERROR,
          category: "bg-error",
        });
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
      if (res.ok) {
        const data = await res.json();
        const { message }: { message: Results } = data;

        if (message === Results.SUCCESS) {
          setIsRegistered(true);
          setLoginFlashMessage({
            message: "Registered successfully" + registerData.email,
            category: "bg-success",
          });
        } else {
          setRegisterFlashMessage({ message: message, category: "bg-error" });
        }
      } else {
        setRegisterFlashMessage({
          message: Results.CONNECTION_ERROR,
          category: "bg-info",
        });
      }
    }
  };
  if (isLoading || isError) {
    return <Loading />;
  } else {
    if (data?.user === undefined) {
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

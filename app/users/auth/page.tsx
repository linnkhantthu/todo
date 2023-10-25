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
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);
  const [registerFlashMessage, setRegisterFlashMessage] =
    useState<FlashMessage>();
  const [loginFlashMessage, setLoginFlashMessage] = useState<FlashMessage>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showRegisterForm = () => {
    setIsShowRegisterForm((register) => !register);
  };

  // Handle Login Submit
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get("username");
    const password = formData.get("password");
    if (username && password) {
      const loginData = {
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
    setIsSubmitting(false);
  };

  // Registeration handler
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
          setIsShowRegisterForm(false);
          setLoginFlashMessage({
            message: "Registered successfully as " + registerData.email,
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
    setIsSubmitting(false);
  };
  return isError ? (
    Results.CONNECTION_ERROR
  ) : isLoading ? (
    <Loading />
  ) : data?.user === undefined ? (
    isShowRegisterForm ? (
      <RegisterForm
        handler={showRegisterForm}
        handleRegister={handleRegister}
        flashMessage={registerFlashMessage}
        isSubmitting={isSubmitting}
      />
    ) : (
      <LoginForm
        handler={showRegisterForm}
        handleLogin={handleLogin}
        flashMessage={loginFlashMessage}
        isSubmitting={isSubmitting}
      />
    )
  ) : (
    redirect("/todos")
  );
};

export default Auth;

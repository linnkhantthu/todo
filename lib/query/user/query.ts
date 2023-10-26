import prisma from "@/db";
import { User } from "@/lib/models";
import { HashPassword, generateToken, getExpireDate } from "@/lib/utils";
import crypto from "crypto";

export async function getUserByEmail(email?: string) {
  if (email) {
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function insertTokenByEmail(email?: string) {
  let token: string | undefined = undefined;
  if (email) {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetPasswordToken: generateToken(),
        resetPasswordTokenExpire: getExpireDate(),
      },
    });
    if (user && user.resetPasswordToken) {
      token = user.resetPasswordToken;
    }
  }
  return { token };
}

export async function getUserByUsername(username?: string) {
  if (username) {
    const data = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function insertUser(
  username?: string,
  email?: string,
  dob?: string,
  password?: string
) {
  const hashPassword = new HashPassword();
  if (username && email && dob && password) {
    const isUserExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      },
    });
    if (isUserExists === null) {
      const encryptedPassword = hashPassword.encrypt(password);
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          dob: new Date(dob),
          password: encryptedPassword,
        },
      });
      return user as User;
    }
  }
  return undefined;
}

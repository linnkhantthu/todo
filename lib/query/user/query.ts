import prisma from "@/db";
import { User } from "@/lib/models";
import { generateToken, getExpireDate } from "@/lib/utils";

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
  if (username && email && dob && password) {
    const checkUsernameData = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    const checkEmailData = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUsernameData === null && checkEmailData === null) {
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          dob: new Date(dob),
          password: password,
        },
      });
      return user as User;
    }
  }
  return undefined;
}

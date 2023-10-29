import EmailTemplate from "@/emails/EmailTemplate";
import prisma from "@/db";
import { User } from "@/lib/models";
import {
  HashPassword,
  generateToken,
  getExpireDate,
  sendMail,
} from "@/lib/utils";

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

export async function insertResetPasswordTokenByEmail(email?: string) {
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

export async function insertVerifyTokenByEmail(email?: string) {
  let token: string | undefined = undefined;
  if (email) {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verifyToken: generateToken(),
        verifyTokenExpire: getExpireDate(1440),
      },
    });
    if (user && user.verifyToken) {
      token = user.verifyToken;
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
          verifyToken: generateToken(),
          verifyTokenExpire: getExpireDate(1440),
        },
      });
      if (user) {
        const sentEmailId = await sendMail(
          user.email,
          "Todo: Verify your email",
          EmailTemplate({
            description: "to complete the verification",
            username: user.username,
            token: user.verifyToken!,
            path: "/users/verify/",
            buttonValue: "Verify",
          })
        );
        return sentEmailId ? (user as User) : undefined;
      }
    }
  }
  return undefined;
}

export async function getUserByResetPasswordToken(resetToken?: string) {
  if (resetToken) {
    const data = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordTokenExpire: {
          gt: new Date(),
        },
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function getUserByVerifyTokenAndVerified(
  verifyToken?: string,
  verified?: boolean
) {
  if (verifyToken && verified !== undefined) {
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: verifyToken,
        verified: verified,
        verifyTokenExpire: {
          gt: new Date(),
        },
      },
    });
    return user;
  }
  return undefined;
}

export async function updateVerifiedByVerifyToken(verifyToken?: string) {
  if (
    verifyToken &&
    (await getUserByVerifyTokenAndVerified(verifyToken, false))
  ) {
    const data = await prisma.user.update({
      where: {
        verifyToken: verifyToken,
        verifyTokenExpire: {
          gt: new Date(),
        },
        verified: false,
      },
      data: {
        verified: true,
        verifyTokenExpire: new Date(),
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function updatePasswordByResetPasswordToken(
  token?: string,
  password?: string
) {
  const hashPassword = new HashPassword();
  if (token && password) {
    const encryptedPassword = hashPassword.encrypt(password);
    const user = await prisma.user.update({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpire: {
          gt: new Date(),
        },
      },
      data: {
        password: encryptedPassword,
        resetPasswordTokenExpire: new Date(),
      },
    });
    if (user) {
      return user;
    }
  }
  return undefined;
}

export async function fetchUserByResetPasswordToken(token?: string) {
  if (token) {
    const data = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpire: {
          gt: new Date(),
        },
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

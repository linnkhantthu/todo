import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function login(username?: string) {
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

async function register(
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
      return user;
    }
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  const loginData = await req.json();
  let status = 403;
  if (loginData.type === "LOGIN") {
    status = 200;
    const user = await login(loginData.username);
    if (user !== undefined && user.password === loginData.password) {
      console.log("Logged in");
    } else {
      console.log("Not logged in");
    }
  }

  if (loginData.type === "REGISTER") {
    status = 200;
    const registerData = await register(
      loginData.username,
      loginData.email,
      loginData.dob,
      loginData.password
    );
    if (registerData) {
      console.log(registerData);
    } else {
      console.log("Registeration Failed");
    }
  }

  return NextResponse.json({ message: true, status: 200 });
}

login()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

register()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

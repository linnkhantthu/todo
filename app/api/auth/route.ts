import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { User } from "../models";

const prisma = new PrismaClient()

async function login(username?: string) {
  if(username !== undefined){
    const data = await prisma.user.findFirst({
      where: {
        username: username,
      }
    })
    if(data !== null){
      return data
    }
  }
  return undefined;
}

export async function POST(req: NextRequest) {
    const loginData = await req.json();
    const user = await login(loginData.username);
    if(user !== undefined && user.password === loginData.password){
      console.log("Logged in");
    }
    else{
      console.log("Not logged in");
    }
    return NextResponse.json({ message: true, status: 200 });
}

login()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
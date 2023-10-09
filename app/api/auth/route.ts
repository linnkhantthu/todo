import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  return users;
}

export async function POST(req: NextRequest) {
    const loginData = await req.json();
    console.log(loginData);
    const users = await main();
    console.log(users);
    return NextResponse.json({ message: true, status: 200 });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
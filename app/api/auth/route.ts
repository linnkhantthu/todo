import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const loginData = await req.json();
    console.log(loginData);
    return NextResponse.json({ message: true, status: 200 });
}


import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === expectedPassword) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_session", "debashis-admin-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

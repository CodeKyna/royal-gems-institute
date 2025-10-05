import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/security/middleware";

export async function GET(request: NextRequest) {
  const { user } = await authenticate(request);
  console.log("user is", user);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    },
  });
}

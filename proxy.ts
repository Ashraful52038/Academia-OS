import { NextResponse } from "next/server";

// Role-based route gating for the (dashboard) route group.
// TODO: implement session/role checks for student, teacher, dept-head.
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/dept-head/:path*"],
};

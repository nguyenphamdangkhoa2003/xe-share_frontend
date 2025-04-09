import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/sessions"];
const publicRoutes = [
  "/sign-up",
  "/sign-in",
  "/confirm-account",
  "/forgot-password",
  "/reset-password",
  "/verify-mfa",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}
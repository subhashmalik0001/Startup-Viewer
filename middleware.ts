import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    // Protected routes pattern
    const isProtectedRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/home") ||
        pathname.startsWith("/search") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/founderdetails")

    if (isProtectedRoute) {
        if (isLoggedIn) return
        return Response.redirect(new URL("/login", req.nextUrl))
    } else if (isLoggedIn && (pathname === "/" || pathname === "/login" || pathname === "/signup")) {
        // Redirect to home if already logged in
        return Response.redirect(new URL("/home", req.nextUrl))
    }
    return
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

import {NextResponse, NextRequest} from "next/server";
import {cookies} from "next/headers";

// This function can be marked `async` if using `await` inside
async function middleware(request: NextRequest) {
    const token = cookies().get("token")?.value;
    const isAuthenticated = token;
    const {pathname} = request.nextUrl;

    if (
        pathname.startsWith("/signin") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/createpin") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password")
    ) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    }

    if (!isAuthenticated) {
        if (pathname === "/") {
            return NextResponse.redirect(new URL("/signin", request.url));
        } else if (pathname === "/deposit") {
            return NextResponse.redirect(new URL("/signin", request.url));
        } else if (pathname === "/transfer") {
            return NextResponse.redirect(new URL("/signin", request.url));
        } else if (pathname === "/transactions") {
            return NextResponse.redirect(new URL("/signin", request.url));
        } else if (pathname === "/notifications") {
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|AuthImage.webp).*)"],
};

export default middleware;

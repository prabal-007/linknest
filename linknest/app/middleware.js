// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/signin",
//   },
// });

// export const config = {
//   matcher: ['/create/*', '/dashboard*'],
// };


import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/handle/:path*"], // Protect these routes
    // matcher: ['/create/*', '/dashboard*'],
};

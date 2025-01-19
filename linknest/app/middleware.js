// /app/middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin", // Redirect to this page if not authenticated
  },
});

export const config = {
  matcher: ['/generate/*'],  // Matches /generate and all subpaths
};

import {
  clerkMiddleware,
  createRouteMatcher,
  auth,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// we are making sign in sign up and / public routes 
// so that logged in users can access them
// and redirect to dashboard if they try to access them
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const user = auth();
  const userId = (await user).userId;
  const url = new URL(request.url);

    // Case 1: Logged-in user is trying to access a public route (like /sign-in)
  if (userId && isPublicRoute(request) && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Case 2: Route is protected
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
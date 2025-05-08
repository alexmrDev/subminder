import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/user(.*)"]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId } = auth();

  if (!userId && isProtectedRoute(context.request)) {
    return Response.redirect(new URL('/login', context.url), 302);
  }
});

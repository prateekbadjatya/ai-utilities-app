import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

// https://dashboard.clerk.com/apps/new?signed_up=true



// IMPORTANT:
/*
The actual redirection to the sign-in page is not written in your code—it is handled internally by Clerk’s library.

When you call await auth.protect() in the middleware, Clerk automatically checks if the user is authenticated:

If authenticated, the request continues as normal.
If not authenticated, Clerk’s middleware automatically redirects the user to the sign-in page and adds the redirect_url parameter.
You do not need to write the redirect logic yourself. It’s built into Clerk’s auth.protect() method. That’s why you don’t see any explicit redirect code in your project.
*/

/*Creates a function that checks if a route matches /dashboard or /admin (including any subpaths).

Exports the middleware function.
For every request, it checks if the route is protected.
If yes, it calls auth.protect(), which ensures the user is authenticated. If not, Clerk redirects to the sign-in page.
*/

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

// Configures which routes the middleware should run on.
// The first pattern skips static files and Next.js internals.
// This tells the middleware to ignore (not run on) requests for:

// Next.js internal files (like anything under /_next)
// Static files (like .js, .css, .jpg, .png, .svg, .ico, etc.)
// This way, the middleware only runs on your app’s actual pages/routes, not on static assets.

/* The second pattern ensures the middleware runs for all API and trpc routes.

This ensures the middleware always runs for any route starting with /api or /trpc (your API endpoints), so you can protect API routes as well.
*/

//Trpc:

/* tRPC is a library for building typesafe APIs in TypeScript and JavaScript projects. It allows you to create API endpoints and call them directly from your frontend code—without needing to write separate API routes or schemas.

Key points about tRPC:

It provides end-to-end type safety: the types you define on the server are automatically available on the client.
No need for REST or GraphQL schemas—just call your backend functions as if they were local.
It’s commonly used in modern full-stack apps to simplify API development and reduce boilerplate. */

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// In summary:
// This code protects /dashboard and /admin routes using Clerk authentication, and configures the middleware to ignore static files and internal routes. If a user is not authenticated, they are redirected to sign in.

/* The code that redirects you to the sign-in page when you try to access /dashboard is in your middleware.js file.

Here’s how it works:

The middleware uses Clerk’s clerkMiddleware and createRouteMatcher to protect routes like /dashboard and /admin.
When you visit /dashboard, the middleware checks if you are authenticated.
If you are not authenticated, Clerk automatically redirects you to the sign-in page and appends the redirect_url query parameter, so you return to /dashboard after signing in.
This logic is handled by Clerk’s middleware and not by custom redirect code in your app. If you want to change this behavior, you would update your Clerk or middleware configuration. Let me know if you want to customize this!
 */

import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
publicRoutes:['/api/webhooks/clerk']
//this means we are allowing public access to this url
});

export const config={
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
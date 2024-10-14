import {authMiddleware} from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: ['/', '/auth(.*)', '/portal(.*)', '/images(.*)'],
    afterAuth(auth,req,evt){
        if(!auth.userId && !auth.isPublicRoute && req.nextUrl.pathname === "/dashboard"){
            const signInUrl = new URL('/auth/sign-in',req.url);
            signInUrl.searchParams.set('redirect_url',req.url);
            return Response.redirect(signInUrl)
        }
    },
    ignoredRoutes:['/chatbot'],

})
export const config={
    matcher:[
        '/((?!.+.[w]+$|_next).*)',
        '/dashboard',
        '/(api|trpc)(.*)'],
}
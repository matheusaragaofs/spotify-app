import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    //token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/_next')) return NextResponse.next()

    // if the user has the token and he's trying to go to /login page
    if (pathname === '/login' && token) { 
        const homeUrl = req.nextUrl.clone()
        homeUrl.pathname = '/'
        return NextResponse.redirect(homeUrl)
    }

    //allow the requests if the following is true
    // 1) Its a request for next-auth session & provider fetching
    // 2) the token exists

    if (pathname.includes('/api/auth') || token) return NextResponse.next()
    // Redirect them to login if they dont have token and are requesting a protected route
    if (!token && pathname !== '/login') {
        const loginUrl = req.nextUrl.clone()
        loginUrl.pathname = '/login'
        console.log('Entrou 444')
        return NextResponse.redirect(loginUrl)
    }
}
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/home', '/sessions'];

const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/confirm-account',
    '/forgot-password',
    '/reset-password',
    '/verify-mfa',
];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);
    const accessToken = req.cookies.get('accessToken')?.value;

    if (isProtectedRoute && !accessToken) {
        const response = NextResponse.redirect(new URL('/login', req.nextUrl));
        response.cookies.delete('accessToken');
        return response;
    }

    if (isPublicRoute && accessToken) {
        if (path === '/login' || path === '/signup') {
            return NextResponse.redirect(new URL('/home', req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};

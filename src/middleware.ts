import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { i18n, Locale } from './types/i18n';

function env(name: string) {
    return process.env[name];
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Dashboard Authentication
    if (pathname.startsWith('/dashboard')) {
        const authToken = env('ADMIN_AUTH_TOKEN');
        const token = request.cookies.get('mb_auth_token')?.value;

        if (!authToken || !token || token !== authToken) {
            // Redirect to login if unauthorized
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 2. Locale Settings
    // Check if there's an explicit cookie
    const cookieLocale = request.cookies.get('mb-locale')?.value;
    let locale: Locale = 'fr';

    if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
        locale = cookieLocale as Locale;
    }
    // Browser Accept-Language header parsing is removed.
    // The language defaults strictly to 'fr' (French) for all new visitors.

    // Pass the detected locale securely to Server Components via custom header
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Also set it in the response for good measure (client side detection)
    response.headers.set('x-locale', locale);
    return response;
}

export const config = {
    matcher: [
        // Skip all internal paths
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};

import createIntlMiddleware from 'next-intl/middleware';

import {NextRequest, NextResponse} from 'next/server';
import {pathnames, locales, localePrefix} from './config';


export default async function middleware(request: NextRequest) {
  const protectedRoutes = ['/portal'];
  for (const element of protectedRoutes) {
    if (request.nextUrl.pathname.includes(element)) {
      if (!request.cookies.has('payload-token')) {
        return NextResponse.redirect(request.nextUrl.origin);
      }
    }
  }
  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: 'en',
    locales,
    pathnames,
    localePrefix
  });
  const response = handleI18nRouting(request);
  return response;
}



export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|es|tl|zh)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};

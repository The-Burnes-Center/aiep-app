import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import {NextRequest} from 'next/server';
import {pathnames, locales, localePrefix} from './config';
import useUserStore from '@/stores/userStore';


export default async function middleware(request: NextRequest) {
  const { user_id, user_token } = useUserStore.getState();
  const protectedRoutes = ['/home'];

  // Check if the user is trying to access a protected route
  for (const element of protectedRoutes) {
    if (request.nextUrl.pathname.includes(element)) {
    // If the user is not logged in, redirect to the login page
      if (!user_id) {
        return NextResponse.redirect(new URL('/', request.url));
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

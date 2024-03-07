import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { log } from './lib/log'

export const middleware = (req: NextRequest) => {
  const requestedURL = req.nextUrl.pathname
  log(req.cookies)
  const authToken = cookies().get('auth-token')?.value || ''

  if (!authToken)
    // if there is no token then we redirecting user to signin with redirect url as search params
    return NextResponse.redirect(
      new URL(`/auth/signin?redirect=${requestedURL}`, req.url)
    )
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|auth).*)',
  ],
}

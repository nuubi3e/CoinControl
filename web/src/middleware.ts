import { NextRequest, NextResponse } from 'next/server'
import { log } from './lib/log'

export const middleware = async (req: NextRequest) => {
  try {
    log(req.nextUrl)
    const res = await fetch('http://localhost:3000/api/verify')

    if (!res.ok) throw new Error('in valid request')

    const data = await res.json()
    log(data)
  } catch (err) {
    log('ERROR: ', err)
    return NextResponse.redirect(new URL('/signin', req.url))
  }
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
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|signup|signin|lib).*)',
  ],
}

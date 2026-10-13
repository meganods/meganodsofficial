import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // 1. Never redirect ads.txt, robots.txt, or sitemap.xml
  // Serve directly on whatever host requested them (including apex domain meganods.com)
  if (
    pathname === '/ads.txt' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next()
  }

  // 2. Canonical redirect: meganods.com -> www.meganods.com (with 301 for SEO)
  if (host === 'meganods.com') {
    return NextResponse.redirect(`https://www.meganods.com${pathname}${request.nextUrl.search}`, {
      status: 301,
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

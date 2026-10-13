import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  const content = 'google.com, pub-5266755800049907, DIRECT, f08c47fec0942fa0\n'
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

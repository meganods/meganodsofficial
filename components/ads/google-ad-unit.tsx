'use client'

import React, { useEffect } from 'react'

interface GoogleAdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}

/**
 * Reusable Google AdSense Ad Unit Component
 * Usage: <GoogleAdUnit slot="1234567890" format="auto" responsive={true} />
 */
export function GoogleAdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
}: GoogleAdUnitProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('AdSense ad render notice:', err)
      }
    }
  }, [])

  return (
    <div className={`overflow-hidden my-4 text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-5266755800049907"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}

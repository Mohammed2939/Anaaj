import React, { useEffect, useRef, useState } from 'react'

const TINT_GRADIENTS = {
  cream: 'bg-gradient-to-b from-cream/60 via-cream/30 to-cream/75',
  ivory: 'bg-gradient-to-b from-ivory/60 via-ivory/30 to-ivory/75',
  forest: 'bg-gradient-to-b from-forest-green/75 via-forest-green/55 to-dark-forest/80',
}

/**
 * Renders a subtle, looping muted background video with a tonal scrim.
 * Defers downloading until the section approaches the viewport so hero media
 * gets full mobile/iOS bandwidth on initial page load.
 */
export default function BackgroundVideo({ src, poster, opacity = 0.16, tint = 'cream' }) {
  const wrapperRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const target = wrapperRef.current
    if (!target || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad) return
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.playsInline = true
    el.play().catch(() => {})
  }, [shouldLoad, src])

  const scrim = TINT_GRADIENTS[tint] || TINT_GRADIENTS.cream

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload={shouldLoad ? 'auto' : 'none'}
        className="w-full h-full object-cover"
        style={{ opacity }}
      />
      <div className={`absolute inset-0 ${scrim}`} />
    </div>
  )
}

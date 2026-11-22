import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import droneVideo from '../assets/video/drone.mp4'

/**
 * MainHero – full-screen video hero shown after the intro transition.
 * Uses the same drone video element to avoid reloading.
 */
export default function MainHero({ videoRef: sharedVideoRef }) {
  const localVideoRef = useRef(null)
  const videoRef = sharedVideoRef || localVideoRef
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.playsInline = true
    vid.loop = true
    if (vid.paused) {
      vid.play().catch(() => {})
    }
  }, [videoRef])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-charcoal">
      {/* Background video */}
      <video
        ref={videoRef}
        src={droneVideo}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          className="font-sans text-xs tracking-[0.5em] uppercase text-cream/70 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Palwancha · Telangana · India
        </motion.p>

        <motion.h1
          className="font-serif-heading text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          ANAAJ<br />
          <span className="font-display font-normal italic text-4xl md:text-6xl lg:text-7xl text-brand-orange">
            Rice Industry
          </span>
        </motion.h1>

        <motion.p
          className="font-sans text-sm md:text-base tracking-[0.3em] uppercase text-cream/80 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Quality You Can Trust
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/50">Scroll</span>
          <div className="w-px h-10 bg-cream/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-cream/70"
              style={{ height: '50%' }}
              animate={{ y: ['0%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

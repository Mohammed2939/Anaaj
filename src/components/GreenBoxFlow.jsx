import React from 'react'
import { motion } from 'framer-motion'
import logoWhite from '../assets/images/logo_white.png'

/**
 * GreenBoxFlow
 * A continuous, smooth-flowing watermark animation of official ARI logo icons,
 * golden stars, and delicate paddy grain stalks moving across the green background.
 */
export default function GreenBoxFlow() {
  const motifs = [
    { type: 'logo' },
    { type: 'text', text: 'ANAAJ RICE INDUSTRY' },
    { type: 'paddy' },
    { type: 'text', text: 'PALWANCHA · TELANGANA' },
    { type: 'star' },
    { type: 'logo' },
    { type: 'text', text: 'THE TASTE OF QUALITY' },
    { type: 'paddy' },
    { type: 'text', text: 'ESTD. PALWANCHA' },
    { type: 'star' },
  ]

  const renderItem = (item, key) => {
    if (item.type === 'logo') {
      return (
        <div key={key} className="flex items-center gap-2 shrink-0 px-6 opacity-25">
          <img
            src={logoWhite}
            alt=""
            className="h-7 md:h-8 w-auto object-contain brightness-125"
          />
        </div>
      )
    }

    if (item.type === 'paddy') {
      return (
        <div key={key} className="flex items-center gap-2 shrink-0 px-5 opacity-25">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 2v20M12 4c2.5 1 4 3 4 5s-2 3-4 3M12 8c-2.5 1-4 3-4 5s2 3 4 3M12 12c2.5 1 4 3 4 5s-2 3-4 3" />
          </svg>
        </div>
      )
    }

    if (item.type === 'star') {
      return (
        <span key={key} className="shrink-0 px-4 text-brand-orange opacity-40 text-sm select-none">
          ✦
        </span>
      )
    }

    return (
      <span
        key={key}
        className="shrink-0 px-6 font-sans text-[11px] md:text-xs font-bold tracking-[0.35em] uppercase text-white/20 whitespace-nowrap select-none"
      >
        {item.text}
      </span>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Top Stream - drifting smoothly to the left */}
      <div
        className="absolute top-4 sm:top-6 left-0 w-full flex"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <motion.div
          className="flex shrink-0 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {motifs.map((item, i) => renderItem(item, `top-1-${i}`))}
          {motifs.map((item, i) => renderItem(item, `top-2-${i}`))}
        </motion.div>
      </div>

      {/* Bottom Stream - drifting smoothly to the right */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-0 w-full flex"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <motion.div
          className="flex shrink-0 items-center"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
        >
          {motifs.map((item, i) => renderItem(item, `bot-1-${i}`))}
          {motifs.map((item, i) => renderItem(item, `bot-2-${i}`))}
        </motion.div>
      </div>
    </div>
  )
}

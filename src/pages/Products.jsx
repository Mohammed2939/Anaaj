import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import logoImg from '../assets/images/logo.png'
import sonaImg from '../assets/images/product_sona_masoori.jpg'
import hmtImg from '../assets/images/product_hmt_steam.jpg'
import sonaVideo from '../assets/video/ad_sona_masoori.mp4'
import hmtVideo from '../assets/video/ad_hmt_steam.mp4'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

function IconLeaf({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function IconGrain({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22 16 8" />
      <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
      <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
      <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    </svg>
  )
}

function IconChef({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  )
}

function IconShield({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconPlay({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

function IconBag({ color = 'currentColor' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function IconLock({ color = 'currentColor' }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

const PRODUCTS = [
  {
    id: 'sona-masoori',
    name: 'ANAAJ Sona Masoori Rice',
    tagline: 'Pure Goodness in Every Grain',
    description:
      'Carefully selected long-grain Sona Masoori rice from Telangana — 100% natural and processed for soft, fluffy everyday meals.',
    image: sonaImg,
    video: sonaVideo,
    accent: '#246D0B',
    accentLight: '#F0F7EC',
    accentBorder: '#C5DFB8',
    highlights: [
      { label: '100% Natural', Icon: IconLeaf },
      { label: 'Long Grain', Icon: IconGrain },
      { label: 'Easy to Cook', Icon: IconChef },
      { label: 'Sortex Cleaned', Icon: IconShield },
    ],
  },
  {
    id: 'hmt-steam',
    name: 'ANAAJ HMT Steam Rice',
    tagline: 'Bold Grain. Rich Aroma.',
    description:
      'Steam-parboiled HMT rice crafted to lock in natural nutrients and aroma — ideal for biryanis, pulao, and daily dining.',
    image: hmtImg,
    video: hmtVideo,
    accent: '#B87100',
    accentLight: '#FFF8EC',
    accentBorder: '#F0D9A0',
    highlights: [
      { label: '100% Natural', Icon: IconLeaf },
      { label: 'Long Grain', Icon: IconGrain },
      { label: 'Easy to Cook', Icon: IconChef },
      { label: 'Sortex Cleaned', Icon: IconShield },
    ],
  },
]

function isVideoFullscreen(video) {
  if (!video) return false
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement
  return Boolean(fsEl === video || fsEl?.contains(video) || video.webkitDisplayingFullscreen)
}

function isElementMostlyVisible(el, minRatio = 0.35) {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const vw = window.innerWidth || document.documentElement.clientWidth
  if (rect.width <= 0 || rect.height <= 0 || vw <= 0 || vh <= 0) return false
  // Account for fixed top Navbar (~72px) when video scrolls behind header
  const topBound = Math.min(72, vh * 0.2)
  const visibleW = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0))
  const visibleH = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, topBound))
  const referenceArea = Math.min(rect.width * rect.height, vw * Math.max(1, vh - topBound))
  return referenceArea > 0 && (visibleW * visibleH) / referenceArea >= minRatio
}

function ProductMedia({ product }) {
  const [mode, setMode] = useState('photo')
  const frameRef = useRef(null)
  const playerRef = useRef(null)
  const thumbRef = useRef(null)

  // Automatically stop main product video whenever the user scrolls away, switches tabs, or minimizes on any PC or mobile device
  useEffect(() => {
    if (mode !== 'video') return
    const frameEl = frameRef.current
    const videoEl = playerRef.current
    if (!frameEl || !videoEl) return

    const stopIfAway = () => {
      if (isVideoFullscreen(videoEl)) return
      if (document.visibilityState === 'hidden' || !isElementMostlyVisible(frameEl, 0.35)) {
        if (!videoEl.paused) {
          videoEl.pause()
        }
      }
    }

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0]
              if (entry && (!entry.isIntersecting || entry.intersectionRatio < 0.35)) {
                stopIfAway()
              }
            },
            { threshold: [0, 0.35, 0.5] }
          )
        : null

    observer?.observe(frameEl)
    window.addEventListener('scroll', stopIfAway, { passive: true })
    window.addEventListener('resize', stopIfAway, { passive: true })
    document.addEventListener('visibilitychange', stopIfAway)
    document.addEventListener('fullscreenchange', stopIfAway)
    document.addEventListener('webkitfullscreenchange', stopIfAway)
    videoEl.addEventListener('webkitendfullscreen', stopIfAway)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', stopIfAway)
      window.removeEventListener('resize', stopIfAway)
      document.removeEventListener('visibilitychange', stopIfAway)
      document.removeEventListener('fullscreenchange', stopIfAway)
      document.removeEventListener('webkitfullscreenchange', stopIfAway)
      videoEl.removeEventListener('webkitendfullscreen', stopIfAway)
    }
  }, [mode])

  // Pause muted thumbnail preview while card is scrolled off-screen
  useEffect(() => {
    const thumbEl = thumbRef.current
    if (!thumbEl || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          thumbEl.play().catch(() => {})
        } else if (!thumbEl.paused) {
          thumbEl.pause()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(thumbEl)
    return () => observer.disconnect()
  }, [])

  const handlePlayerPlay = () => {
    const activePlayer = playerRef.current
    document.querySelectorAll('video[data-product-player]').forEach((vid) => {
      if (vid !== activePlayer && !vid.paused) {
        vid.pause()
      }
    })
  }

  return (
    <div ref={frameRef} className="relative">
      <div
        className="absolute inset-4 rounded-3xl opacity-20 blur-2xl -z-10"
        style={{ background: product.accent }}
      />

      {/* Main Photo / Video Showcase Frame */}
      <div
        className="relative rounded-2xl overflow-hidden border shadow-lg group"
        style={{ borderColor: product.accentBorder, background: product.accentLight }}
      >
        {mode === 'photo' ? (
          <div className="relative aspect-square">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Out of Stock Badge */}
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase shadow-sm"
                style={{ background: 'rgba(255,255,255,0.93)', color: '#70482B', border: '1px solid #C8956A' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8956A]" />
                Out of Stock
              </span>
            </div>

            {/* Watch Product Video pill */}
            <button
              type="button"
              onClick={() => setMode('video')}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
              style={{ background: 'rgba(23, 36, 22, 0.78)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.22)' }}
            >
              <IconPlay size={11} color="#FFFFFF" />
              <span>Watch Video</span>
            </button>
          </div>
        ) : (
          <div className="relative aspect-square bg-[#12100C] flex items-center justify-center">
            <video
              ref={playerRef}
              data-product-player="true"
              src={product.video}
              poster={product.image}
              autoPlay
              loop
              controls
              playsInline
              preload="auto"
              onPlay={handlePlayerPlay}
              className="w-full h-full object-contain"
            />

            {/* Switch back to Photo pill */}
            <button
              type="button"
              onClick={() => setMode('photo')}
              className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white shadow-md hover:scale-105 transition-transform cursor-pointer"
              style={{ background: 'rgba(0, 0, 0, 0.72)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span>Photo</span>
            </button>
          </div>
        )}
      </div>

      {/* Live Photo / Auto-playing Video Thumbnail Switcher */}
      <div className="mt-3.5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMode('photo')}
          className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${mode === 'photo' ? 'shadow-md scale-105' : 'opacity-65 hover:opacity-100'
            }`}
          style={{ borderColor: mode === 'photo' ? product.accent : '#DFEAE0' }}
          aria-label={`View ${product.name} photo`}
        >
          <img src={product.image} alt="" className="w-full h-full object-cover" />
        </button>

        <button
          type="button"
          onClick={() => setMode('video')}
          className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#12100C] ${mode === 'video' ? 'shadow-md scale-105' : 'opacity-75 hover:opacity-100'
            }`}
          style={{ borderColor: mode === 'video' ? product.accent : '#DFEAE0' }}
          aria-label={`Play ${product.name} advertisement video`}
        >
          <video
            ref={thumbRef}
            src={product.video}
            poster={product.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span className="w-7 h-7 rounded-full bg-white/90 text-charcoal flex items-center justify-center shadow">
              <IconPlay size={11} color="#172416" />
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <div className="bg-cream min-h-screen flex flex-col">
      <Navbar />

      {/* ── Page Hero (Matches About / Industry / Contact proportions, no extra divider line) ── */}
      <section className="relative pt-32 pb-16 px-6 md:px-10 bg-ivory overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="font-sans text-xs tracking-[0.45em] uppercase text-forest-green font-bold mb-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Our Collection
          </motion.p>
          <motion.h1
            className="font-serif-heading text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Our <span className="font-display italic font-normal text-brand-orange">Products</span>
          </motion.h1>
          <motion.p
            className="font-sans text-base text-warm-gray max-w-xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Carefully selected rice, bringing quality and tradition to every meal.
          </motion.p>
        </div>

        {/* Flowing ARI Logo Marquee — consistent with About, Industry, Contact */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
          <div className="absolute bottom-0 left-0 w-full flex items-end pb-4 opacity-[0.06]">
            <div className="animate-marquee-flow items-center">
              {[...Array(14)].map((_, i) => (
                <img
                  key={i}
                  src={logoImg}
                  alt=""
                  className="h-24 md:h-32 lg:h-40 w-auto object-contain mx-10 flex-shrink-0"
                  draggable={false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Showcase ── */}
      <section className="pt-14 pb-20 px-6 md:px-10 bg-cream">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {PRODUCTS.map((product, idx) => {
            const flip = idx % 2 !== 0

            return (
              <motion.article
                key={product.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={idx * 0.2}
              >
                <div className={flip ? 'lg:order-2' : ''}>
                  <ProductMedia product={product} />
                </div>

                <div className={flip ? 'lg:order-1' : ''}>
                  <p
                    className="font-sans text-xs font-bold tracking-[0.25em] uppercase mb-3"
                    style={{ color: product.accent }}
                  >
                    ANAAJ Rice Industry
                  </p>
                  <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-charcoal mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <p className="font-display italic text-lg mb-4" style={{ color: product.accent }}>
                    {product.tagline}
                  </p>
                  <p className="font-sans text-sm sm:text-base text-warm-gray leading-relaxed mb-7">
                    {product.description}
                  </p>

                  {/* Clean Modern Icon Highlights */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    {product.highlights.map(({ label, Icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 p-3 rounded-xl border"
                        style={{ background: product.accentLight, borderColor: product.accentBorder }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${product.accent}18` }}
                        >
                          <Icon color={product.accent} />
                        </div>
                        <span className="font-sans text-xs font-semibold text-charcoal">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pre-launch Note */}
                  <div
                    className="rounded-xl px-4 py-3 flex items-center gap-3 border mb-5"
                    style={{ background: '#FDF8F3', borderColor: '#E8C9A0' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B07030" strokeWidth="1.8" strokeLinecap="round" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p className="font-sans text-xs text-[#7A4D1E]">
                      Our rice bags are coming soon. Stay tuned!
                    </p>
                  </div>

                  {/* Disabled Ordering Controls */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <IconBag color="currentColor" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <IconLock color="currentColor" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}

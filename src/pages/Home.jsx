import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ExploreSlider from '../components/ExploreSlider'
import GreenBoxFlow from '../components/GreenBoxFlow'
import BackgroundVideo from '../components/BackgroundVideo'
import HorizontalGalleryFlow from '../components/HorizontalGalleryFlow'

// Official Logo
import logoImg from '../assets/images/logo.png'
import dronePoster from '../assets/images/drone_poster.jpg'

// Videos
import grassVideo from '../assets/video/text_golden_green.mp4'
import droneVideo from '../assets/video/drone.mp4'
import hmtVideo from '../assets/video/ad_hmt_steam.mp4'
import bgAmbientVideo from '../assets/video/bg_ambient.mp4'
import { initialTextPoster } from '../assets/video/initialTextPoster'

// Industry Photographs
import photo1 from '../assets/images/photo1.jpg'
import photo2 from '../assets/images/photo2.jpg'
import photo3 from '../assets/images/photo3.jpg'
import photo4 from '../assets/images/photo4.jpg'
import photo5 from '../assets/images/photo5.jpg'
import photo6 from '../assets/images/photo6.jpg'

export default function Home({ introComplete, onIntroComplete }) {
  const grassVideoRef = useRef(null)
  const droneVideoRef = useRef(null)
  const canvasRef = useRef(null)
  const svgImageRef = useRef(null)
  const lastDrawTimeRef = useRef(0)
  const rafRef = useRef(null)
  const exploreTimerRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const [isZooming, setIsZooming] = useState(false)

  // ── Autoplay golden wheat & green grass video for text mask ───
  useEffect(() => {
    const vid = grassVideoRef.current
    if (!vid) return
    vid.muted = true
    vid.playsInline = true
    vid.loop = true
    const tryPlay = () => vid.play().catch(() => { })
    if (vid.readyState >= 2) tryPlay()
    else vid.addEventListener('canplay', tryPlay, { once: true })
  }, [])

  // ── Pre-buffer & play industry drone video seamlessly ──────
  useEffect(() => {
    const droneVid = droneVideoRef.current
    if (!droneVid) return
    droneVid.muted = true
    droneVid.playsInline = true
    droneVid.loop = true
    if (introComplete) {
      droneVid.play().catch(() => { })
    }
  }, [introComplete])

  // ── Animate canvas from golden-brown & green grass video for SVG mask ────
  // Uses direct DOM image attribute mutation (zero React re-renders = 60fps locked)
  const drawFrame = useCallback((now) => {
    // Throttle to 30fps (matching source video framerate to eliminate dropped frames)
    if (!now || now - lastDrawTimeRef.current >= 32) {
      lastDrawTimeRef.current = now || performance.now()
      const video = grassVideoRef.current
      const canvas = canvasRef.current
      const imgElem = svgImageRef.current
      if (video && canvas && imgElem && video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
        const ctx = canvas.getContext('2d', { alpha: false })
        const vw = video.videoWidth
        const vh = video.videoHeight
        const cropH = Math.min(vh, vw * (canvas.height / canvas.width))
        const cropY = Math.max(0, (vh - cropH) * 0.45)
        ctx.drawImage(video, 0, cropY, vw, cropH, 0, 0, canvas.width, canvas.height)
        // High quality 0.92 (crisp, near-lossless)
        const url = canvas.toDataURL('image/jpeg', 0.92)
        imgElem.setAttribute('href', url)
      }
    }
    rafRef.current = requestAnimationFrame(drawFrame)
  }, [])

  useEffect(() => {
    if (introComplete || prefersReduced) return
    const vid = grassVideoRef.current
    const start = () => {
      rafRef.current = requestAnimationFrame(drawFrame)
    }
    if (vid && vid.readyState >= 2) start()
    else vid?.addEventListener('playing', start, { once: true })
    return () => {
      cancelAnimationFrame(rafRef.current)
      vid?.removeEventListener('playing', start)
    }
  }, [drawFrame, introComplete, prefersReduced])

  // Stop canvas loop after intro completes
  useEffect(() => {
    if (introComplete) {
      cancelAnimationFrame(rafRef.current)
    }
  }, [introComplete])

  // ── Clear intro zoom timer if unmounted early ─────────
  useEffect(() => {
    return () => clearTimeout(exploreTimerRef.current)
  }, [])

  // ── Handle cinematic zoom & transition ──────────────
  const handleExplore = useCallback(() => {
    if (isZooming || introComplete) return
    setIsZooming(true)

    // Start playing drone video immediately
    droneVideoRef.current?.play().catch(() => { })

    // Zoom-through duration
    clearTimeout(exploreTimerRef.current)
    exploreTimerRef.current = setTimeout(() => {
      onIntroComplete()
    }, 1300)
  }, [isZooming, introComplete, onIntroComplete])

  // ── Lock body scroll only when intro is active ────────
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [introComplete])

  return (
    <div className="relative bg-cream min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════
          BACKGROUND HERO VIDEO (The Industry Drone Video)
          Stays underneath so it reveals seamlessly during the zoom!
      ═══════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-forest-night pointer-events-none select-none">
        <video
          ref={droneVideoRef}
          src={droneVideo}
          poster={dronePoster}
          muted
          playsInline
          loop
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-forest-night/85" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          INTRO SCREEN OVERLAY (Fresh Luxury Pearl White Palette)
      ═══════════════════════════════════════════════════════════════ */}
      {!introComplete && (
        <motion.div
          key="intro-screen"
          className={`fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-6 overflow-hidden ${isZooming ? 'pointer-events-none' : ''}`}
          animate={isZooming ? {
            opacity: 0,
            transition: { delay: 0.6, duration: 0.7, ease: 'easeOut' }
          } : { opacity: 1 }}
        >
            {/* Unified Cohesive Centerpiece */}
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">

              {/* 1. Official Brand Logo — Perfectly Aligned */}
              <motion.div
                className="flex justify-center mb-3"
                initial={{ opacity: 0, y: -20 }}
                animate={isZooming ? {
                  opacity: 0,
                  y: -30,
                  transition: { duration: 0.35 }
                } : {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2 }
                }}
              >
                <img
                  src={logoImg}
                  alt="ANAAJ Rice Industry"
                  className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-sm transition-all"
                />
              </motion.div>

              {/* 2. Location Eyebrow — In Signature Forest Green */}
              <motion.p
                className="font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.45em] uppercase text-forest-green font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={isZooming ? {
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.3 }
                } : {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.4 }
                }}
              >
                Palwancha · Telangana · India
              </motion.p>

              {/* 3. ANAAJ RICE INDUSTRY Headline in ONE SINGLE LINE with Green Paddy Crop Mask */}
              <motion.div
                className="w-full transform-gpu origin-center mb-4 sm:mb-5"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={isZooming ? {
                  scale: [1, 2.8, 24],
                  opacity: [1, 1, 0],
                  transition: {
                    duration: 1.3,
                    times: [0, 0.35, 1],
                    ease: [0.7, 0, 0.2, 1]
                  }
                } : {
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
                }}
              >
                <svg
                  viewBox="0 0 1600 160"
                  className="w-full h-auto block select-none pointer-events-none max-h-[18vh]"
                  aria-label="ANAAJ RICE INDUSTRY"
                >
                  <defs>
                    <clipPath id="heroTextClipOneLine">
                      <text
                        x="800"
                        y="114"
                        textAnchor="middle"
                        fontFamily="'Playfair Display', Georgia, serif"
                        fontSize="84"
                        fontWeight="800"
                        letterSpacing="12"
                      >
                        ANAAJ RICE INDUSTRY
                      </text>
                    </clipPath>
                    <linearGradient id="goldenGreenFallback" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2E6B18" />
                      <stop offset="25%" stopColor="#9C7728" />
                      <stop offset="50%" stopColor="#C89A38" />
                      <stop offset="75%" stopColor="#8C6212" />
                      <stop offset="100%" stopColor="#246D0B" />
                    </linearGradient>
                  </defs>

                  {/* Golden-brown wheat & lush green grass video frame clipped to the letterforms */}
                  {!prefersReduced ? (
                    <image
                      ref={svgImageRef}
                      x="0"
                      y="0"
                      width="1600"
                      height="160"
                      preserveAspectRatio="none"
                      clipPath="url(#heroTextClipOneLine)"
                      href={initialTextPoster}
                    />
                  ) : (
                    <text
                      x="800"
                      y="114"
                      textAnchor="middle"
                      fontFamily="'Playfair Display', Georgia, serif"
                      fontSize="84"
                      fontWeight="800"
                      letterSpacing="12"
                      fill="url(#goldenGreenFallback)"
                    >
                      ANAAJ RICE INDUSTRY
                    </text>
                  )}
                </svg>
              </motion.div>

              {/* 4. Tagline — In Warm Brand Saffron Amber */}
              <motion.p
                className="font-display italic text-brand-orange-deep text-lg sm:text-xl md:text-2xl tracking-[0.2em] mb-8 sm:mb-10 font-semibold"
                initial={{ opacity: 0, y: 15 }}
                animate={isZooming ? {
                  opacity: 0,
                  y: 20,
                  transition: { duration: 0.3 }
                } : {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.8 }
                }}
              >
                Seamless quality. Endless production.
              </motion.p>

              {/* 5. Horizontal Slide to Explore Control */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isZooming ? {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.3 }
                } : {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 1.0 }
                }}
              >
                <ExploreSlider onExplore={handleExplore} disabled={isZooming} />
              </motion.div>

            </div>

            {/* Hidden canvas for video frames (high-definition 1600x160 matching SVG exactly) */}
            <canvas
              ref={canvasRef}
              width={1600}
              height={160}
              className="hidden"
              aria-hidden="true"
            />

            {/* Off-screen (non-display:none so iOS Safari decodes frames cleanly for SVG text mask) */}
            <video
              ref={grassVideoRef}
              src={grassVideo}
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              disablePictureInPicture
              className="fixed -top-10 -left-10 w-1 h-1 opacity-[0.001] pointer-events-none"
              aria-hidden="true"
            />
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MAIN HOMEPAGE CONTENT (Reveals after cinematic zoom)
      ═══════════════════════════════════════════════════════════════ */}
      {introComplete && (
        <React.Fragment key="main-homepage-wrapper">
            {/* Top Navigation - Global z-50 floating above all page content */}
            <Navbar transparent light />

            <motion.div
              key="main-homepage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="relative z-10"
            >
              {/* Full-screen Hero Section with Industry Drone Video */}
              <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center text-center px-6">
                <motion.p
                  className="font-sans text-xs sm:text-sm tracking-[0.5em] uppercase text-white mb-4 font-bold drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Palwancha · Telangana · India
                </motion.p>

                <motion.h1
                  className="font-serif-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight drop-shadow-md"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  ANAAJ
                  <br />
                  <span className="font-display font-normal italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-orange">
                    Rice Industry
                  </span>
                </motion.h1>

                <motion.p
                  className="font-sans text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase text-cream/90 mt-5 font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Seamless Quality · Endless Production
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/60 font-medium">
                    Scroll
                  </span>
                  <div className="w-px h-8 bg-cream/30 relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1/2 bg-brand-green-light"
                      animate={{ y: ['0%', '200%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              </section>

              {/* ── About Section Teaser ── */}
              <AboutTeaser />

              {/* ── Infrastructure Gallery Teaser ── */}
              <GalleryTeaser />

              {/* ── Brand Values ── */}
              <ValuesStrip />

              {/* ── Contact CTA Banner ── */}
              <ContactCtaBanner />

              {/* ── Footer ── */}
              <Footer />
            </motion.div>
        </React.Fragment>
      )}
    </div>
  )
}

/* ─────────────────────────── About Teaser ─────────────────────────── */
function AboutTeaser() {
  return (
    <section className="bg-ivory py-24 px-6 md:px-10 relative overflow-hidden">
      <BackgroundVideo src={bgAmbientVideo} tint="ivory" opacity={0.15} />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green mb-4 font-bold">
            About Us
          </p>
          <h2 className="font-serif-heading text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
            Rooted in Tradition,<br />
            <span className="font-display italic font-normal text-forest-green">Built for Excellence</span>
          </h2>
          <p className="font-sans text-base text-warm-gray leading-relaxed mb-6">
            ANAAJ Rice Industry is a modern rice manufacturing enterprise based in Palwancha, Telangana.
            Built with modern milling infrastructure and an unwavering commitment to quality, we bring
            the finest rice from the fertile paddy fields of Telangana to families across India.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-sans text-xs md:text-sm font-bold tracking-widest uppercase text-forest-green border-b-2 border-brand-green pb-1 hover:text-brand-green transition-all duration-200"
          >
            Discover Our Story
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#4CAE19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="relative group">
          <img
            src={photo1}
            alt="ANAAJ Rice Industry facility in Palwancha"
            className="w-full h-80 md:h-[420px] object-cover rounded-sm shadow-md transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute -bottom-4 -left-4 w-32 h-20 bg-brand-green/10 border border-brand-green/20 rounded-sm hidden md:block -z-10" />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Gallery Teaser ─────────────────────────── */
function GalleryTeaser() {
  const photos = [
    { src: photo2, title: 'Processing Units' },
    { src: photo3, title: 'Milling & Storage' },
    { src: photo4, title: 'Main Plant Facility' },
  ]
  return (
    <section className="bg-cream py-24 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10 md:mb-14 flex items-end justify-between">
          <div>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green mb-3 font-bold">
              Our Industry
            </p>
            <h2 className="font-serif-heading text-3xl md:text-5xl font-bold text-charcoal">
              Modern Industrial<br />
              <span className="font-display italic font-normal text-warm-gray">Infrastructure</span>
            </h2>
          </div>
          <Link
            to="/industry"
            className="hidden md:inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-forest-green border-b-2 border-brand-green pb-1 hover:text-brand-green transition-colors font-bold relative z-10 cursor-pointer"
          >
            View All Facilities
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#4CAE19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Desktop: 3 horizontal balanced cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {photos.map(({ src, title }, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-sm group shadow-sm"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/industry" draggable={false} className="block relative w-full h-72 cursor-pointer">
                <img
                  src={src}
                  alt={title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-night/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="font-sans text-xs tracking-widest uppercase text-cream font-medium">
                    {title}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Auto-flowing gallery preview (locked against manual horizontal dragging/swiping) */}
        <div className="md:hidden -mx-6">
          <HorizontalGalleryFlow
            items={photos}
            showTitles
            itemTo="/industry"
            interactive={false}
            cardClassName="w-72 h-72 mx-2.5 rounded-xl"
          />
          <div className="mt-6 text-center px-6">
            <Link
              to="/industry"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-forest-green border-b-2 border-brand-green py-1.5 hover:text-brand-green transition-colors font-bold relative z-10 cursor-pointer"
            >
              View All Facilities
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="#4CAE19" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Values Strip ─────────────────────────── */
function ValuesStrip() {
  const values = [
    { title: 'Quality', desc: 'Every grain reflects our dedication to pristine milling and consistent grading.' },
    { title: 'Integrity', desc: 'Transparent relations with local farmers, distributors and business partners.' },
    { title: 'Heritage', desc: 'Rooted in the agricultural wealth and tradition of Palwancha, Telangana.' },
    { title: 'Innovation', desc: 'High-grade machinery ensuring efficient processing and zero contamination.' },
  ]

  return (
    <section className="bg-gradient-to-r from-forest-green via-[#2C7A0E] to-brand-green py-12 sm:py-14 lg:py-20 px-6 md:px-10 relative shadow-xl overflow-hidden">
      {/* Animated Horizontal Watermark Stream */}
      <GreenBoxFlow />

      <div className="max-w-6xl mx-auto relative z-10">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-brand-orange mb-7 sm:mb-8 lg:mb-12 text-center font-bold">
          Our Principles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {values.map(({ title, desc }) => (
            <div
              key={title}
              className="text-center bg-white/10 backdrop-blur-sm px-5 py-4 sm:p-5 lg:px-6 lg:py-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all shadow-md"
            >
              <div className="w-8 h-0.5 bg-brand-orange mx-auto mb-2.5 sm:mb-3 lg:mb-4 rounded-full" />
              <h3 className="font-serif-heading text-lg lg:text-xl font-bold text-white mb-1.5 lg:mb-2.5">{title}</h3>
              <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Contact CTA Banner ─────────────────────────── */
function ContactCtaBanner() {
  return (
    <section className="bg-ivory py-20 px-6 md:px-10 border-t border-beige/60 relative overflow-hidden">
      <BackgroundVideo src={hmtVideo} tint="ivory" opacity={0.16} />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">
          Partner With Us
        </p>
        <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mb-5">
          Have an Enquiry or Order?
        </h2>
        <p className="font-sans text-base text-warm-gray max-w-xl mx-auto mb-8 leading-relaxed">
          We welcome trade inquiries from distributors, wholesalers, and retail chains across India.
          Connect directly with our team in Palwancha, Telangana.
        </p>
        <Link
          to="/contact"
          className="inline-block px-9 py-4 rounded-full bg-gradient-to-r from-forest-green to-brand-green hover:from-dark-forest hover:to-forest-green text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:scale-105"
        >
          Contact Our Team →
        </Link>
      </div>
    </section>
  )
}

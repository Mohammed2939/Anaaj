import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import logoImg from '../assets/images/logo.png'

import photo1 from '../assets/images/photo1.jpg'
import photo2 from '../assets/images/photo2.jpg'
import photo3 from '../assets/images/photo3.jpg'
import photo4 from '../assets/images/photo4.jpg'
import photo5 from '../assets/images/photo5.jpg'
import photo6 from '../assets/images/photo6.jpg'

const GALLERY = [
  { src: photo1 },
  { src: photo2 },
  { src: photo3 },
  { src: photo4 },
  { src: photo5 },
  { src: photo6 },
]

export default function Industry() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const containerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const lastMouseXRef = useRef(0)
  const hasDraggedRef = useRef(false)

  // 6 repeated sets ensure endless, smooth horizontal loop in both directions
  const duplicatedGallery = [
    ...GALLERY,
    ...GALLERY,
    ...GALLERY,
    ...GALLERY,
    ...GALLERY,
    ...GALLERY,
  ]

  // Continuous non-stop slow auto-flow — NEVER stops, even when moving left or right
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Position scroll midway initially so moving left is immediately possible
    const initTimer = setTimeout(() => {
      if (container && container.scrollWidth > 0) {
        const setWidth = container.scrollWidth / 6
        container.scrollLeft = setWidth * 2
      }
    }, 120)

    let animationFrameId
    let lastTime = performance.now()
    let fractionalScroll = 0

    const autoFlow = (now) => {
      const elapsed = now - lastTime
      lastTime = now

      if (container) {
        // Keep fractional position in sync with any user swipe / drag movement
        if (Math.abs(container.scrollLeft - fractionalScroll) > 2) {
          fractionalScroll = container.scrollLeft
        }

        // Continuous smooth glide (~21px per second) — NEVER stops
        const delta = elapsed / 16.666
        fractionalScroll += 0.35 * delta
        container.scrollLeft = fractionalScroll

        // Seamless infinite loop wrap boundaries
        const setWidth = container.scrollWidth / 6
        if (setWidth > 0) {
          if (container.scrollLeft >= setWidth * 4) {
            container.scrollLeft -= setWidth * 2
            fractionalScroll = container.scrollLeft
          } else if (container.scrollLeft <= setWidth) {
            container.scrollLeft += setWidth * 2
            fractionalScroll = container.scrollLeft
          }
        }
      }

      animationFrameId = requestAnimationFrame(autoFlow)
    }

    animationFrameId = requestAnimationFrame(autoFlow)

    return () => {
      clearTimeout(initTimer)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Desktop mouse drag to move photos left / right without stopping the continuous flow
  const handleMouseDown = (e) => {
    isDraggingRef.current = true
    hasDraggedRef.current = false
    lastMouseXRef.current = e.pageX
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const deltaX = e.pageX - lastMouseXRef.current
    lastMouseXRef.current = e.pageX
    if (Math.abs(deltaX) > 1) {
      hasDraggedRef.current = true
    }
    containerRef.current.scrollLeft -= deltaX
  }

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setTimeout(() => {
        hasDraggedRef.current = false
      }, 60)
    }
  }

  // Mobile touch handlers to swipe photos left / right without stopping the flow
  const handleTouchStart = () => {
    hasDraggedRef.current = false
  }

  const handleTouchMove = () => {
    hasDraggedRef.current = true
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      hasDraggedRef.current = false
    }, 60)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <div className="bg-cream min-h-screen">
      <Navbar />

      {/* Page hero */}
      <section className="pt-32 pb-16 px-6 md:px-10 bg-ivory relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="font-sans text-xs tracking-[0.45em] uppercase text-forest-green font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Our Infrastructure
          </motion.p>
          <motion.h1
            className="font-serif-heading text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Our Industry
            <br />
            <span className="font-display italic font-normal text-brand-orange">& Facilities</span>
          </motion.h1>
          <motion.p
            className="font-sans text-base text-warm-gray max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            A visual panoramic tour inside ANAAJ Rice Industry — built with modern engineering
            and cutting-edge milling infrastructure in Palwancha, Telangana.
          </motion.p>
        </div>

        {/* Flowing ARI Logo Marquee — decorative background watermark */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <div className="absolute bottom-0 left-0 w-full flex items-end pb-4 opacity-[0.07]">
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

      {/* ── Continuous Horizontal Moving Gallery Flow Section ── */}
      <section className="py-14 md:py-18 overflow-hidden bg-cream relative">
        <div className="max-w-6xl mx-auto px-6 mb-8 text-center sm:text-left">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-2">
            Infrastructure Showcase
          </p>
          <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-charcoal">
            Plant Infrastructure Gallery
          </h2>
        </div>

        {/* Horizontal Moving Ribbon with Non-Stop Smooth Flow & Drag Support */}
        <div
          className="relative w-full overflow-hidden py-2"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
          }}
        >
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex items-center overflow-x-auto py-2 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {duplicatedGallery.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!hasDraggedRef.current) {
                    setLightboxIndex(index % GALLERY.length)
                  }
                }}
                className="relative flex-shrink-0 w-72 sm:w-80 md:w-[420px] h-[280px] sm:h-[340px] md:h-[380px] mx-3 rounded-2xl overflow-hidden cursor-pointer shadow-md select-none bg-forest-night"
              >
                <img
                  src={item.src}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Infrastructure highlights ── */}
      <section className="bg-ivory py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">At a Glance</p>
            <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-charcoal">
              Built for<br />
              <span className="font-display italic font-normal text-forest-green">Scale & Quality</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Modern Milling Plant', desc: 'High-capacity rice milling machinery engineered for precision and efficiency.' },
              { label: 'Large-Scale Storage', desc: 'Climate-appropriate storage silos and warehouses to preserve grain quality.' },
              { label: 'Boiler & Power', desc: 'Dedicated boiler systems and power infrastructure for uninterrupted operations.' },
            ].map(({ label, desc }) => (
              <div key={label} className="p-8 border border-border-green rounded-sm bg-white shadow-sm hover:border-brand-green transition-colors">
                <div className="w-8 h-0.5 bg-brand-green mx-auto mb-5" />
                <h3 className="font-serif-heading text-lg font-bold text-charcoal mb-3">{label}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-width feature image ── */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={photo3}
          alt="ANAAJ Rice Industry aerial overview"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-forest-night/60 flex items-center justify-center">
          <div className="text-center">
            <p className="font-display italic text-brand-orange text-lg mb-2 font-medium">Palwancha · Telangana · India</p>
            <h2 className="font-serif-heading text-3xl md:text-5xl font-bold text-white">
              ANAAJ Rice Industry
            </h2>
          </div>
        </div>
      </section>

      {/* ── Interactive Lightbox Modal (Clean Photo Only, No Green on Click) ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar with Close Button Only */}
          <div
            className="w-full max-w-6xl flex items-center justify-end py-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/35 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/15 outline-none focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Close photo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Image Display with Navigation Arrows */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow - Neutral styling, no green */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 active:bg-black text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-xl cursor-pointer border border-white/20 outline-none focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Previous photo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Photo */}
            <img
              key={lightboxIndex}
              src={GALLERY[lightboxIndex].src}
              alt=""
              className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl transition-opacity duration-300 select-none"
            />

            {/* Next Arrow - Neutral styling, no green */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % GALLERY.length)}
              className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/85 active:bg-black text-white flex items-center justify-center transition-all backdrop-blur-sm shadow-xl cursor-pointer border border-white/20 outline-none focus:outline-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              aria-label="Next photo"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Contact CTA ── */}
      <section className="bg-cream py-16 px-6 md:px-10 text-center border-t border-beige/60">
        <div className="max-w-3xl mx-auto">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">Enquiries & Visits</p>
          <h3 className="font-serif-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">Plan a Visit or Business Inquiry</h3>
          <p className="font-sans text-base text-warm-gray mb-8">Interested in sourcing rice from ANAAJ or scheduling a facility visit in Palwancha, Telangana? We are ready to assist you.</p>
          <Link to="/contact" className="inline-block px-9 py-4 rounded-full bg-gradient-to-r from-forest-green to-brand-green hover:from-dark-forest hover:to-forest-green text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:scale-105">
            Contact Our Office →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

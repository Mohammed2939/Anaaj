import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '../assets/images/logo.png'
import logoWhite from '../assets/images/logo_white.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Industry', to: '/industry' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar({ transparent = false, light = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      // Hysteresis threshold: activates at 80px, returns at 40px to prevent jitter/flicker
      setScrolled((prev) => {
        if (!prev && y > 80) return true
        if (prev && y < 40) return false
        return prev
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = transparent && !scrolled && !menuOpen

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 select-none"
    >
      {/* 
        Solid Scrolled Background + Bottom Border Layer
        Kept in a single unified element so the white background and the bottom line
        fade in and out together with opacity — preventing the horizontal line from
        appearing before the background.
      */}
      <div
        className={`absolute inset-0 bg-white/95 backdrop-blur-md border-b border-border-green/80 shadow-sm transition-opacity duration-300 pointer-events-none ${
          isTransparent ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Nav Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between">
        {/* Official Brand Logo — Cross-fade without layout shift or image re-mount flicker */}
        <Link to="/" className="relative flex items-center group h-11 sm:h-12 md:h-14">
          {/* White Logo (for transparent hero over dark drone video) */}
          <img
            src={logoWhite}
            alt="ANAAJ Rice Industry"
            className={`h-full w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:scale-105 ${
              isTransparent ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
          {/* Official Color Logo (for scrolled solid navbar & light pages) */}
          <img
            src={logoImg}
            alt="ANAAJ Rice Industry"
            className={`h-full w-auto object-contain absolute top-0 left-0 transition-all duration-300 group-hover:scale-105 ${
              isTransparent ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = location.pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`font-sans text-xs md:text-sm font-semibold tracking-widest uppercase transition-colors duration-300 pb-1
                    ${isActive
                      ? (isTransparent
                          ? 'text-brand-orange border-b-2 border-brand-orange font-bold'
                          : 'text-forest-green border-b-2 border-brand-green font-bold')
                      : (isTransparent
                          ? (light ? 'text-cream/90 hover:text-brand-orange' : 'text-charcoal hover:text-brand-green')
                          : 'text-charcoal hover:text-brand-green')
                    }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 rounded transition-colors duration-300 ${
            isTransparent ? (light ? 'text-cream' : 'text-charcoal') : 'text-charcoal'
          }`}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden relative z-20 bg-white/98 backdrop-blur-md border-t border-border-green px-6 py-6 shadow-xl"
        >
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`block font-sans text-sm font-medium tracking-widest uppercase py-2
                    ${location.pathname === to ? 'text-forest-green font-bold' : 'text-charcoal hover:text-brand-green'}
                    transition-colors duration-200`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  )
}

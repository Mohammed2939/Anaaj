import React from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../assets/images/logo_white.png'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-forest-green via-[#1E6108] to-dark-forest text-white py-16 px-6 md:px-10 border-t border-brand-green/30 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand with Official Logo */}
          <div>
            <div className="mb-5">
              <img
                src={logoWhite}
                alt="ANAAJ Rice Industry"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity drop-shadow-md"
              />
            </div>
            <p className="font-display italic text-brand-orange text-lg mb-3 font-semibold">
              The Taste of Quality
            </p>
            <p className="font-sans text-sm leading-relaxed text-white/90">
              A premier rice manufacturing enterprise rooted in Palwancha, Telangana.
              Excellence harvested with care, processed with pride.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-brand-orange mb-5 font-bold">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Industry', to: '/industry' },
                { label: 'Contact Us', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-sm text-white/85 hover:text-brand-orange transition-colors duration-200 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] uppercase text-brand-orange mb-5 font-bold">
              Contact
            </h4>
            <address className="not-italic font-sans text-sm text-white/90 leading-relaxed space-y-1.5">
              <p className="font-bold text-white text-base">ANAAJ Rice Industry</p>
              <p className="text-white/85">
                Palwancha<br />
                Bhadradri Kothagudem, Telangana – 507115, India
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="tel:+918309979208"
                  className="inline-flex items-center gap-2.5 text-white/90 hover:text-brand-orange transition-colors font-medium text-xs sm:text-sm group"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0 group-hover:scale-110 transition-transform">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 8309979208</span>
                </a>
                <a
                  href="mailto:ari.anaajriceindustry@gmail.com"
                  className="inline-flex items-center gap-2.5 text-white/90 hover:text-brand-orange transition-colors font-medium text-xs sm:text-sm break-all group"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0 group-hover:scale-110 transition-transform">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>ari.anaajriceindustry@gmail.com</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/75 tracking-wide">
            © {new Date().getFullYear()} ANAAJ Rice Industry. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/80 font-medium">
            Palwancha · Telangana · India
          </p>
        </div>
      </div>
    </footer>
  )
}

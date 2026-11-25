import React from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../assets/images/logo_white.png'
import { ENQUIRY_DESTINATION_EMAIL, getEmailLinkProps } from '../config'

const FOOTER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Our Industry', to: '/industry' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-forest-green via-[#1E6108] to-dark-forest text-white py-9 sm:py-10 lg:py-14 px-6 md:px-10 border-t border-brand-green/30 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-7 lg:gap-10 mb-7 lg:mb-10">
          {/* Brand with Official Logo */}
          <div className="md:col-span-5">
            <img
              src={logoWhite}
              alt="ANAAJ Rice Industry"
              className="h-10 sm:h-11 lg:h-14 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity mb-2.5 lg:mb-3.5"
            />
            <p className="font-display italic text-brand-orange text-base lg:text-lg font-semibold mb-1.5 lg:mb-2">
              The Taste of Quality
            </p>
            <p className="font-sans text-xs lg:text-sm leading-relaxed text-white/85 max-w-sm">
              A premier rice manufacturing enterprise rooted in Palwancha, Telangana.
              Excellence harvested with care, processed with pride.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-brand-orange mb-3 lg:mb-4 font-bold">
              Navigation
            </h4>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-2 lg:gap-2.5">
              {FOOTER_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-xs sm:text-sm text-white/85 hover:text-brand-orange transition-colors duration-200 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-sans text-[11px] tracking-[0.25em] uppercase text-brand-orange mb-3 lg:mb-4 font-bold">
              Contact
            </h4>
            <address className="not-italic font-sans text-xs lg:text-sm text-white/85 leading-relaxed space-y-2 lg:space-y-2.5">
              <p className="text-white/90">
                <strong className="text-white font-semibold">ANAAJ Rice Industry</strong> · Palwancha,
                Bhadradri Kothagudem, Telangana – 507115
              </p>
              <div className="flex flex-col gap-1.5 lg:gap-2">
                <a
                  href="tel:+918309979208"
                  className="inline-flex items-center gap-2 text-white/90 hover:text-brand-orange transition-colors font-medium"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+91 8309979208</span>
                </a>
                <a
                  {...getEmailLinkProps()}
                  className="inline-flex items-center gap-2 text-white/90 hover:text-brand-orange transition-colors font-medium break-all"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>{ENQUIRY_DESTINATION_EMAIL}</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/15 pt-5 lg:pt-7 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-[11px] text-white/75 tracking-wide">
            © {new Date().getFullYear()} ANAAJ Rice Industry. All rights reserved.
          </p>
          <p className="font-sans text-[11px] text-white/75 font-medium">
            Palwancha · Telangana · India
          </p>
        </div>
      </div>
    </footer>
  )
}

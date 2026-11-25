import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ENQUIRY_DESTINATION_EMAIL, getEmailLinkProps } from '../config'

import logoImg from '../assets/images/logo.png'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) {
      e.name = 'Full name is required'
    }
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone.trim())) {
      e.phone = 'Please enter a valid phone number'
    }
    if (!form.email.trim()) {
      e.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = 'Please enter a valid email address'
    }
    if (!form.message.trim()) {
      e.message = 'Message is required'
    } else if (form.message.trim().length < 5) {
      e.message = 'Please write a message with at least 5 characters'
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${ENQUIRY_DESTINATION_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          'Full Name': form.name.trim(),
          'Phone Number': form.phone.trim(),
          'Email Address': form.email.trim(),
          'Message': form.message.trim(),
          _subject: 'New Enquiry – Anaaj Rice Industry',
          _replyto: form.email.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (
        (response.ok && (data.success === 'true' || data.success === true || String(data.success).toLowerCase() === 'true')) ||
        (data.message && data.message.toLowerCase().includes('activation'))
      ) {
        setSubmitted(true)
        setForm({ name: '', phone: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Unable to send your enquiry right now. Please try again.')
      }
    } catch (err) {
      console.error('Contact form submission error:', err)
      setSubmitError(
        err.message || 'Unable to send your enquiry right now. Please check your connection or contact us directly at +91 8309979208.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }))
    if (submitError) setSubmitError(null)
  }

  return (
    <div className="bg-ivory min-h-screen">
      <Navbar />

      {/* Page hero */}
      <section className="pt-32 pb-16 px-6 md:px-10 bg-cream relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="font-sans text-xs tracking-[0.45em] uppercase text-forest-green font-bold mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            className="font-serif-heading text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Contact<br />
            <span className="font-display italic font-normal text-brand-orange">ANAAJ Rice Industry</span>
          </motion.h1>
          <motion.p
            className="font-sans text-base text-warm-gray max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We welcome enquiries from buyers, distributors and partners.
            Fill out the form or use the contact information below.
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

      {/* ── Contact content ── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">

          {/* Info panel */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">Address</p>
              <address className="not-italic">
                <p className="font-serif-heading text-xl font-bold text-charcoal mb-1">ANAAJ Rice Industry</p>
                <p className="font-sans text-sm text-warm-gray leading-relaxed mb-2">
                  Palwancha<br />
                  Bhadradri Kothagudem, Telangana – 507115<br />
                  India
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=ANAAJ+Rice+Industry,+Palwancha,+Telangana+507115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-forest-green hover:text-brand-orange transition-colors tracking-wider uppercase group"
                >
                  <span>Get Directions</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </address>
            </div>

            <div>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">Phone</p>
              <a
                href="tel:+918309979208"
                className="inline-flex items-center gap-3 group"
              >
                <span className="w-9 h-9 rounded-full bg-brand-green/10 text-forest-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all shrink-0 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="font-sans text-base font-semibold text-charcoal group-hover:text-forest-green transition-colors">+91 8309979208</span>
              </a>
            </div>

            <div>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">Email</p>
              <a
                {...getEmailLinkProps()}
                className="inline-flex items-start gap-3 group"
              >
                <span className="w-9 h-9 rounded-full bg-brand-green/10 text-forest-green flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all shrink-0 shadow-sm mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="font-sans text-base font-semibold text-charcoal group-hover:text-forest-green transition-colors break-all leading-relaxed">{ENQUIRY_DESTINATION_EMAIL}</span>
              </a>
            </div>

            <div>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">Working Hours</p>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-brand-orange/15 text-brand-orange-deep flex items-center justify-center shrink-0 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div>
                  <p className="font-sans text-base font-bold text-charcoal">24 Hours</p>
                  <p className="font-sans text-xs text-warm-gray font-medium">Monday – Sunday (Open 24/7)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            {submitted ? (
              <motion.div
                className="text-center py-16 bg-white rounded border border-border-green shadow-sm p-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-green/10 border border-brand-green/40 flex items-center justify-center mx-auto mb-6 text-brand-green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif-heading text-2xl font-bold text-charcoal mb-3">Thank You</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-md mx-auto">
                  Thank you for contacting Anaaj Rice Industry! Your enquiry has been received. We will get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSubmitError(null); setForm({ name: '', phone: '', email: '', message: '' }) }}
                  className="mt-8 font-sans text-xs font-bold tracking-widest uppercase text-forest-green border-b-2 border-brand-green pb-1 hover:text-brand-green transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-white p-8 rounded border border-border-green shadow-sm">
                <Field
                  id="contact-name"
                  label="Full Name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  error={errors.name}
                  placeholder="Your full name"
                />
                <Field
                  id="contact-phone"
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  error={errors.phone}
                  placeholder="+91 9xxxxxxxxx"
                />
                <Field
                  id="contact-email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  error={errors.email}
                  placeholder="you@example.com"
                />
                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell us how we can help you…"
                    className={`w-full bg-cream border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder-warm-gray/50 outline-none transition-colors resize-none
                      ${errors.message
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-border-green focus:border-brand-green focus:ring-1 focus:ring-brand-green'
                      }`}
                  />
                  {errors.message && <p className="font-sans text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                {submitError && (
                  <div className="p-4 rounded bg-red-50 border border-red-200 text-red-700 font-sans text-xs flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-red-500">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <div>
                      <p className="font-semibold">{submitError}</p>
                      <p className="text-[11px] text-red-600 mt-0.5">You can also call us directly at +91 8309979208.</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-10 py-4 bg-gradient-to-r from-forest-green to-brand-green text-white font-sans text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded shadow-lg flex items-center justify-center gap-3
                    ${isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:from-dark-forest hover:to-forest-green hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <span>Send Enquiry →</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Google Maps embed ── */}
      <section className="py-12 px-6 md:px-10 bg-cream border-t border-border-green/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-1">Our Location</p>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-charcoal">
                ANAAJ Rice Industry Facility
              </h3>
              <p className="font-sans text-xs text-warm-gray mt-1">
                Palwancha, Bhadradri Kothagudem, Telangana – 507115
              </p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=ANAAJ+Rice+Industry,+Palwancha,+Telangana+507115"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-6 py-3 rounded-full bg-gradient-to-r from-forest-green to-brand-green hover:from-dark-forest hover:to-forest-green text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:scale-105"
            >
              <span>Get Directions</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
          <div className="w-full h-80 md:h-[450px] rounded-lg overflow-hidden border border-border-green shadow-md relative">
            <iframe
              title="ANAAJ Rice Industry – Palwancha Facility"
              src="https://maps.google.com/maps?q=ANAAJ+Rice+Industry,+Palwancha,+Telangana,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ── Reusable form field ── */
function Field({ id, label, type, value, onChange, error, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block font-sans text-xs font-bold tracking-widest uppercase text-charcoal mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-cream border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder-warm-gray/50 outline-none transition-colors
          ${error
            ? 'border-red-400 focus:border-red-400'
            : 'border-border-green focus:border-brand-green focus:ring-1 focus:ring-brand-green'
          }`}
      />
      {error && <p className="font-sans text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GreenBoxFlow from '../components/GreenBoxFlow'
import BackgroundVideo from '../components/BackgroundVideo'

import logoImg from '../assets/images/logo.png'
import bgAmbientVideo from '../assets/video/bg_ambient.mp4'
import sonaVideo from '../assets/video/ad_sona_masoori.mp4'

import photo1 from '../assets/images/photo1.jpg'
import photo4 from '../assets/images/photo4.jpg'
import photo5 from '../assets/images/photo5.jpg'
import photo6 from '../assets/images/photo6.jpg'
import millInterior1 from '../assets/images/mill_interior_1.jpg'
import millInterior2 from '../assets/images/mill_interior_2.jpg'
import millInterior3 from '../assets/images/mill_interior_3.jpg'

const FACILITY_SLIDES = [
  { src: millInterior1, alt: 'ANAAJ automated rice milling and control room' },
  { src: millInterior2, alt: 'ARI Anaaj Rice Industry grain processing and color sorting line' },
  { src: millInterior3, alt: 'ANAAJ Rice Industry full indoor milling plant overview' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <div className="bg-ivory min-h-screen">
      <Navbar />

      {/* Page hero */}
      <section className="relative pt-32 pb-20 px-6 md:px-10 bg-cream overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="font-sans text-xs tracking-[0.45em] uppercase text-forest-green font-bold mb-4"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Who We Are
          </motion.p>
          <motion.h1
            className="font-serif-heading text-5xl md:text-6xl font-bold text-charcoal leading-tight mb-6"
            variants={fadeUp} initial="hidden" whileInView="visible" custom={1} viewport={{ once: true }}
          >
            About ANAAJ<br />
            <span className="font-display italic font-normal text-brand-orange">Rice Industry</span>
          </motion.h1>
          <motion.p
            className="font-sans text-base md:text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp} initial="hidden" whileInView="visible" custom={2} viewport={{ once: true }}
          >
            A modern rice manufacturing enterprise rooted in Palwancha, Telangana —
            built with purpose, quality, and a deep commitment to the communities we serve.
          </motion.p>
        </div>
        {/* Flowing ARI Logo Marquee — Horizontal smooth scroll across hero background */}
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

      {/* ── About the company ── */}
      <Section
        eyebrow="About Us"
        title="ANAAJ Rice Industry"
        reverse={false}
        image={photo1}
        imageAlt="ANAAJ Rice Industry aerial view"
        bgVideo={bgAmbientVideo}
      >
        <p>
          ANAAJ Rice Industry is a premier rice processing and manufacturing facility
          established in Palwancha, Telangana, India. Our state-of-the-art plant is
          designed to process rice with precision, consistency and care — from paddy
          intake to finished, packaged grain.
        </p>
        <p className="mt-2.5 md:mt-4">
          Located in the heart of Telangana's rich agricultural belt, we are uniquely
          positioned to source the finest paddy directly from local farmers, ensuring
          freshness, traceability and fair trade at every step.
        </p>
      </Section>

      {/* ── Our Story ── */}
      <section className="bg-cream py-8 sm:py-12 md:py-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <img src={photo5} alt="Facility side view" className="w-full h-36 sm:h-48 object-cover rounded-sm md:rounded-xl" loading="lazy" />
              <img src={photo6} alt="Facility aerial" className="w-full h-36 sm:h-48 object-cover rounded-sm md:rounded-xl mt-2 sm:mt-6" loading="lazy" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionHeading eyebrow="Our Story" title={<>From Vision<br /><em className="font-display font-normal not-italic text-rice-brown">to Reality</em></>} />
            <div className="font-sans text-sm sm:text-base text-warm-gray leading-relaxed space-y-2.5 md:space-y-4">
              <p>
                ANAAJ Rice Industry was born out of a vision to establish a world-class rice
                processing unit in Telangana — a region blessed with fertile soil, abundant
                water and generations of agricultural knowledge.
              </p>
              <p>
                What began as a dream to bring industrial-scale rice processing to Palwancha
                has become a reality, with a facility that combines modern technology with
                traditional values of quality and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Commitment to Quality ── */}
      <Section
        eyebrow="Quality"
        title={<>Our Commitment<br /><em className="font-display font-normal not-italic text-rice-brown">to Quality</em></>}
        reverse
        image={photo4}
        imageAlt="ANAAJ facility front view"
        bg="bg-ivory"
      >
        <p>
          At ANAAJ, quality is not a department — it is a philosophy that runs through
          every stage of our operation. From raw paddy selection and cleaning to milling,
          polishing, grading and packaging, each process is monitored to ensure the
          final product meets the highest standards.
        </p>
        <p className="mt-2.5 md:mt-4">
          We invest in modern milling technology that maximises head rice recovery while
          minimising breakage, ensuring every bag that leaves our facility carries the
          ANAAJ promise of premium quality.
        </p>
      </Section>

      {/* ── Infrastructure ── */}
      <section className="bg-cream py-8 sm:py-12 md:py-12 lg:py-14 px-5 sm:px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 sm:mb-6 md:mb-6">
            <SectionHeading eyebrow="Infrastructure" title={<>Our<br /><em className="font-display font-normal not-italic text-rice-brown">Manufacturing Facility</em></>} center />
          </div>
          <FacilityShowcase />
          <div className="mt-5 sm:mt-6 md:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 text-center">
            {[
              { label: 'Milling Capacity', value: '35 – 40 Tonnes', note: 'Metric tonnes per day' },
              { label: 'Storage Capacity', value: '50 Tonnes', note: 'Metric tonnes storage capacity' },
              { label: 'Facility Area', value: 'Approx. 2 Acres', note: 'Total industrial facility area' },
            ].map(({ label, value, note }) => (
              <div key={label} className="border border-beige rounded-sm p-4 lg:p-5">
                <p className="font-sans text-xs tracking-widest uppercase text-rice-brown mb-1 md:mb-1.5">{label}</p>
                <p className="font-sans text-xl md:text-2xl font-bold tracking-tight tabular-nums text-charcoal mb-0.5 md:mb-1">{value}</p>
                <p className="font-sans text-xs text-warm-gray">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manufacturing Process ── */}
      <section className="bg-gradient-to-r from-forest-green via-[#2C7A0E] to-brand-green py-12 sm:py-14 lg:py-20 px-6 md:px-10 shadow-xl relative overflow-hidden">
        {/* Animated Horizontal Watermark Stream */}
        <GreenBoxFlow />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-4 sm:mb-6 lg:mb-7">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-brand-orange mb-2 font-bold">How We Work</p>
            <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Our Manufacturing<br />
              <span className="font-display italic font-normal text-brand-orange">Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
            {[
              { step: '01', label: 'Paddy Intake', desc: 'Carefully sourced paddy arrives and is weighed, graded and inspected for quality.' },
              { step: '02', label: 'Cleaning & Drying', desc: 'Raw paddy is cleaned to remove foreign matter and dried to optimal moisture levels.' },
              { step: '03', label: 'Milling & Polishing', desc: 'State-of-the-art hulling and polishing equipment produces premium white rice.' },
              { step: '04', label: 'Grading & Packing', desc: 'Finished rice is sorted, graded by size and packed in hygienic, branded packaging.' },
            ].map(({ step, label, desc }) => (
              <div
                key={step}
                className="flex flex-row sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-0 bg-white/10 backdrop-blur-sm px-5 py-4 sm:p-5 lg:px-6 lg:py-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all shadow-md h-full"
              >
                <span className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight tabular-nums text-white/35 shrink-0 sm:mb-3 lg:mb-4 leading-none pt-0.5 sm:pt-0">
                  {step}
                </span>
                <div className="flex-1 flex flex-col sm:items-center">
                  <h3 className="font-serif-heading text-base lg:text-lg font-bold text-white mb-1 sm:mb-2 lg:mb-2.5 leading-snug">
                    {label}
                  </h3>
                  <p className="font-sans text-xs sm:text-xs lg:text-sm text-white/90 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connect CTA ── */}
      <section className="bg-ivory py-16 px-6 md:px-10 text-center border-t border-beige/60 relative overflow-hidden">
        <BackgroundVideo src={sonaVideo} tint="ivory" opacity={0.15} />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-forest-green font-bold mb-3">Get in Touch</p>
          <h3 className="font-serif-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">Want to Connect With Us?</h3>
          <p className="font-sans text-base text-warm-gray mb-8">Reach out to our leadership team for business partnerships, bulk grain procurement, or distribution across India.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-forest-green to-brand-green hover:from-dark-forest hover:to-forest-green text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:scale-105">
              Contact Our Team →
            </Link>
            <Link to="/industry" className="px-8 py-3.5 rounded-full border border-brand-green text-forest-green hover:bg-brand-green/10 font-sans text-xs font-bold tracking-widest uppercase transition-all hover:scale-105">
              View Our Facilities
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ── Reusable section with image ── */
function Section({ eyebrow, title, children, image, imageAlt, reverse = false, bg = 'bg-ivory', bgVideo }) {
  return (
    <section className={`${bg} py-8 sm:py-12 md:py-20 px-5 sm:px-6 md:px-10 relative overflow-hidden`}>
      {bgVideo && (
        <BackgroundVideo
          src={bgVideo}
          tint={bg === 'bg-cream' ? 'cream' : 'ivory'}
          opacity={0.15}
        />
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 md:gap-16 items-center relative z-10">
        <div className={reverse ? 'order-1 md:order-2' : ''}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="font-sans text-sm sm:text-base text-warm-gray leading-relaxed">
            {children}
          </div>
        </div>
        <div className={reverse ? 'order-2 md:order-1' : ''}>
          <div className="relative overflow-hidden rounded-sm md:rounded-2xl">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-48 sm:h-64 md:h-96 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Section heading ── */
function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <div className={`mb-3 md:mb-6 ${center ? 'text-center' : ''}`}>
      <p className="font-sans text-xs tracking-[0.4em] uppercase text-rice-brown mb-1.5 md:mb-3">{eyebrow}</p>
      <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal leading-tight">
        {title}
      </h2>
    </div>
  )
}

/* ── Single facility image box dissolving slowly across all devices ── */
function FacilityShowcase() {
  const [{ active, prev }, setSlide] = useState({ active: 0, prev: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => ({
        prev: s.active,
        active: (s.active + 1) % FACILITY_SLIDES.length,
      }))
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = FACILITY_SLIDES[active]
  const previousSlide = FACILITY_SLIDES[prev]

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] md:aspect-auto md:h-[320px] lg:h-[350px] overflow-hidden rounded-md md:rounded-2xl shadow-md bg-charcoal/10">
      {/* Keep all 3 images decoded underneath the opaque base slide */}
      {FACILITY_SLIDES.map(({ src }, i) => (
        <img
          key={i}
          src={src}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      ))}
      <img
        src={previousSlide.src}
        alt=""
        aria-hidden="true"
        loading="eager"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
      />
      <motion.img
        key={active}
        src={currentSlide.src}
        alt={currentSlide.alt}
        loading="eager"
        draggable={false}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ willChange: 'opacity' }}
        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
      />
    </div>
  )
}

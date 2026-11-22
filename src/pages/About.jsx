import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GreenBoxFlow from '../components/GreenBoxFlow'

import logoImg from '../assets/images/logo.png'

import photo1 from '../assets/images/photo1.jpg'
import photo2 from '../assets/images/photo2.jpg'
import photo3 from '../assets/images/photo3.jpg'
import photo4 from '../assets/images/photo4.jpg'
import photo5 from '../assets/images/photo5.jpg'
import photo6 from '../assets/images/photo6.jpg'

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
      >
        <p>
          ANAAJ Rice Industry is a premier rice processing and manufacturing facility
          established in Palwancha, Telangana, India. Our state-of-the-art plant is
          designed to process rice with precision, consistency and care — from paddy
          intake to finished, packaged grain.
        </p>
        <p className="mt-4">
          Located in the heart of Telangana's rich agricultural belt, we are uniquely
          positioned to source the finest paddy directly from local farmers, ensuring
          freshness, traceability and fair trade at every step.
        </p>
        <Placeholder label="[Add company founding year, promoters' names or other company details here]" />
      </Section>

      {/* ── Our Story ── */}
      <section className="bg-cream py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-3">
              <img src={photo5} alt="Facility side view" className="w-full h-48 object-cover rounded-sm" loading="lazy" />
              <img src={photo6} alt="Facility aerial" className="w-full h-48 object-cover rounded-sm mt-6" loading="lazy" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <SectionHeading eyebrow="Our Story" title={<>From Vision<br /><em className="font-display font-normal not-italic text-rice-brown">to Reality</em></>} />
            <div className="font-sans text-base text-warm-gray leading-relaxed space-y-4">
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
              <Placeholder label="[Add the founding story, motivations and journey details here]" />
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
        <p className="mt-4">
          We invest in modern milling technology that maximises head rice recovery while
          minimising breakage, ensuring every bag that leaves our facility carries the
          ANAAJ promise of premium quality.
        </p>
        <Placeholder label="[Add certifications, quality marks or laboratory details if available]" />
      </Section>

      {/* ── Infrastructure ── */}
      <section className="bg-cream py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <SectionHeading eyebrow="Infrastructure" title={<>Our<br /><em className="font-display font-normal not-italic text-rice-brown">Manufacturing Facility</em></>} center />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[photo2, photo3, photo5].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-sm group">
                <img
                  src={src}
                  alt={`ANAAJ facility ${i + 2}`}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Milling Capacity', value: '[Add capacity]', note: 'Metric tonnes per day' },
              { label: 'Storage', value: '[Add capacity]', note: 'Metric tonnes storage capacity' },
              { label: 'Facility Area', value: '[Add area]', note: 'Square feet of infrastructure' },
            ].map(({ label, value, note }) => (
              <div key={label} className="border border-beige rounded-sm p-6">
                <p className="font-sans text-xs tracking-widest uppercase text-rice-brown mb-2">{label}</p>
                <p className="font-serif-heading text-2xl font-bold text-charcoal mb-1">{value}</p>
                <p className="font-sans text-xs text-warm-gray">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manufacturing Process ── */}
      <section className="bg-gradient-to-r from-forest-green via-[#2C7A0E] to-brand-green py-24 px-6 md:px-10 shadow-xl relative overflow-hidden">
        {/* Animated Horizontal Watermark Stream */}
        <GreenBoxFlow />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-brand-orange mb-3 font-bold">How We Work</p>
            <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-white">
              Our Manufacturing<br />
              <span className="font-display italic font-normal text-brand-orange">Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', label: 'Paddy Intake', desc: 'Carefully sourced paddy arrives and is weighed, graded and inspected for quality.' },
              { step: '02', label: 'Cleaning & Drying', desc: 'Raw paddy is cleaned to remove foreign matter and dried to optimal moisture levels.' },
              { step: '03', label: 'Milling & Polishing', desc: 'State-of-the-art hulling and polishing equipment produces premium white rice.' },
              { step: '04', label: 'Grading & Packing', desc: 'Finished rice is sorted, graded by size and packed in hygienic, branded packaging.' },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-all shadow-md h-full">
                <span className="font-display text-5xl font-bold text-white/30 block mb-3 leading-none">{step}</span>
                <h3 className="font-serif-heading text-base font-bold text-white mb-3 leading-snug">{label}</h3>
                <p className="font-sans text-xs text-white/85 leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connect CTA ── */}
      <section className="bg-ivory py-16 px-6 md:px-10 text-center border-t border-beige/60">
        <div className="max-w-3xl mx-auto">
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
function Section({ eyebrow, title, children, image, imageAlt, reverse = false, bg = 'bg-ivory' }) {
  return (
    <section className={`${bg} py-20 px-6 md:px-10`}>
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center`}>
        <div className={reverse ? 'order-1 md:order-2' : ''}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          <div className="font-sans text-base text-warm-gray leading-relaxed">
            {children}
          </div>
        </div>
        <div className={reverse ? 'order-2 md:order-1' : ''}>
          <div className="relative overflow-hidden rounded-sm">
            <img
              src={image}
              alt={imageAlt}
              className="w-full h-72 md:h-96 object-cover"
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
    <div className={`mb-6 ${center ? 'text-center' : ''}`}>
      <p className="font-sans text-xs tracking-[0.4em] uppercase text-rice-brown mb-3">{eyebrow}</p>
      <h2 className="font-serif-heading text-3xl md:text-4xl font-bold text-charcoal leading-tight">
        {title}
      </h2>
    </div>
  )
}

/* ── Editable placeholder ── */
function Placeholder({ label }) {
  return (
    <p className="mt-4 text-xs italic text-beige border border-dashed border-beige rounded px-3 py-2 font-sans bg-ivory/50">
      {label}
    </p>
  )
}

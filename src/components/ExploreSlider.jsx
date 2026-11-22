import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

/**
 * Horizontal ExploreSlider
 * Customized with ANAAJ's signature Leaf Green (#4CAE19) & Harvest Saffron (#F7962B).
 * Dual-trigger:
 *  1. Slide/Drag the knob smoothly with 1:1 cursor tracking
 *  2. Click the knob or anywhere on the track to activate with smooth glide
 */
export default function ExploreSlider({ onExplore, disabled = false }) {
  const containerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const dragDistanceRef = useRef(0)
  const isTriggeringRef = useRef(false)

  const [maxDrag, setMaxDrag] = useState(240)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)

  // Measure container to calculate slide bounds
  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setMaxDrag(Math.max(60, width - 56))
      }
    }
    updateBounds()
    window.addEventListener('resize', updateBounds)
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  // Dynamic opacity for track text as slider moves
  const textOpacity = useTransform(x, [0, maxDrag * 0.4, maxDrag * 0.8], [1, 0.3, 0])
  const progressWidth = useTransform(x, (val) => `${Math.max(44, val + 44)}px`)

  const handleDragStart = () => {
    isDraggingRef.current = true
    setIsDragging(true)
    dragDistanceRef.current = 0
  }

  const handleDrag = (_event, info) => {
    dragDistanceRef.current = Math.abs(info.offset.x)
  }

  const triggerComplete = () => {
    if (disabled || isCompleted || isTriggeringRef.current) return
    isTriggeringRef.current = true
    setIsCompleted(true)
    animate(x, maxDrag, { duration: 0.35, ease: 'easeOut' }).then(() => {
      onExplore?.()
    })
  }

  const handleDragEnd = () => {
    if (disabled || isCompleted || isTriggeringRef.current) return
    const currentX = x.get()

    // If user clicked or released with virtually no movement (<= 5px), treat as click!
    if (dragDistanceRef.current <= 5) {
      setTimeout(() => {
        isDraggingRef.current = false
        setIsDragging(false)
      }, 50)
      triggerComplete()
      return
    }

    // Keep dragging flag for a brief moment so trailing DOM click is suppressed
    setTimeout(() => {
      isDraggingRef.current = false
      setIsDragging(false)
    }, 150)

    if (currentX >= maxDrag * 0.4) {
      triggerComplete()
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 32 })
    }
  }

  const handleTrackClick = () => {
    // If the user was actually dragging (> 5px), do not fire click
    if (isDraggingRef.current || dragDistanceRef.current > 5) {
      return
    }
    triggerComplete()
  }

  const handleKnobTapOrClick = (e) => {
    e?.stopPropagation?.()
    if (dragDistanceRef.current > 5) return
    triggerComplete()
  }

  const handleKeyDown = (e) => {
    if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
      triggerComplete()
    }
  }

  return (
    <div className="flex flex-col items-center select-none touch-none">
      {/* Horizontal Slider Pill */}
      <div
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-label="Slide or click to explore ANAAJ Rice Industry website"
        onKeyDown={handleKeyDown}
        onClick={handleTrackClick}
        className="relative w-[300px] xs:w-[320px] sm:w-84 md:w-96 h-14 rounded-full bg-white/90 border border-brand-green/35 backdrop-blur-md p-1.5 flex items-center shadow-md cursor-pointer group hover:border-brand-green transition-colors duration-300 select-none touch-none"
      >
        {/* Progress fill highlight */}
        <motion.div
          className="absolute left-1.5 top-1.5 bottom-1.5 bg-brand-green/15 rounded-full pointer-events-none"
          style={{ width: progressWidth }}
        />

        {/* Track Text - Constrained from left-14 so it can NEVER overlap with the resting knob */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-y-0 left-14 right-3 flex items-center justify-center pointer-events-none overflow-hidden"
        >
          <span className="whitespace-nowrap font-sans text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.22em] md:tracking-[0.28em] uppercase text-forest-green">
            Slide or Click to Explore
          </span>
        </motion.div>

        {/* Draggable & Clickable Knob */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Click or slide to enter ANAAJ Rice Industry"
          drag={disabled || isCompleted ? false : 'x'}
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onTap={handleKnobTapOrClick}
          onClick={handleKnobTapOrClick}
          style={{ x }}
          className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-r from-forest-green to-brand-green text-white flex items-center justify-center shadow-lg cursor-pointer active:cursor-grabbing hover:shadow-brand-green/40 hover:shadow-xl touch-none select-none transition-shadow duration-200"
        >
          {/* Subtle pulse ring - active only when resting */}
          {!isDragging && !isCompleted && (
            <div className="absolute inset-0 rounded-full border border-brand-orange animate-ping opacity-40 pointer-events-none" />
          )}

          {/* Right Arrow Icon */}
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white pointer-events-none"
            animate={{ x: isDragging ? 2 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Helper cue below */}
      <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-warm-gray/80 mt-2.5 font-medium select-none">
        Drag or click knob to enter
      </span>
    </div>
  )
}

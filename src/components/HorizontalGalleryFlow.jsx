import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const REPEAT_COUNT = 6
const DRAG_THRESHOLD_PX = 8

/**
 * Continuous auto-flowing horizontal photo gallery with seamless infinite loop,
 * subtle edge fade mask, desktop mouse drag, and mobile touch swipe support.
 */
export default function HorizontalGalleryFlow({
  items,
  onItemClick,
  itemTo,
  cardClassName = 'w-72 sm:w-80 md:w-[420px] h-[280px] sm:h-[340px] md:h-[380px] mx-3 rounded-2xl',
  showTitles = false,
}) {
  const containerRef = useRef(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const lastMouseXRef = useRef(0)
  const hasDraggedRef = useRef(false)
  const dragResetTimerRef = useRef(null)

  const repeatedItems = Array.from({ length: REPEAT_COUNT }, () => items).flat()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId
    let lastTime = performance.now()
    let fractionalScroll = 0
    let initialized = false

    const autoFlow = (now) => {
      // Cap frame elapsed delta so switching tabs doesn't jump positions
      const elapsed = Math.min(now - lastTime, 64)
      lastTime = now

      const setWidth = container.scrollWidth / REPEAT_COUNT
      if (setWidth > 0) {
        if (!initialized) {
          container.scrollLeft = setWidth * 2
          fractionalScroll = setWidth * 2
          initialized = true
        } else if (!isDraggingRef.current) {
          if (Math.abs(container.scrollLeft - fractionalScroll) > 2) {
            fractionalScroll = container.scrollLeft
          }

          const delta = elapsed / 16.666
          fractionalScroll += 0.35 * delta
          container.scrollLeft = fractionalScroll

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
      clearTimeout(dragResetTimerRef.current)
      cancelAnimationFrame(animationFrameId)
    }
  }, [items.length])

  const handleMouseDown = (e) => {
    isDraggingRef.current = true
    hasDraggedRef.current = false
    dragStartXRef.current = e.pageX
    lastMouseXRef.current = e.pageX
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const deltaX = e.pageX - lastMouseXRef.current
    lastMouseXRef.current = e.pageX
    if (Math.abs(e.pageX - dragStartXRef.current) > DRAG_THRESHOLD_PX) {
      hasDraggedRef.current = true
    }
    containerRef.current.scrollLeft -= deltaX
  }

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      clearTimeout(dragResetTimerRef.current)
      dragResetTimerRef.current = setTimeout(() => {
        hasDraggedRef.current = false
      }, 60)
    }
  }

  const handleTouchStart = (e) => {
    hasDraggedRef.current = false
    if (e.touches?.[0]) {
      dragStartXRef.current = e.touches[0].clientX
    }
  }

  const handleTouchMove = (e) => {
    if (e.touches?.[0] && Math.abs(e.touches[0].clientX - dragStartXRef.current) > DRAG_THRESHOLD_PX) {
      hasDraggedRef.current = true
    }
  }

  const handleTouchEnd = () => {
    clearTimeout(dragResetTimerRef.current)
    dragResetTimerRef.current = setTimeout(() => {
      hasDraggedRef.current = false
    }, 60)
  }

  return (
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
        {repeatedItems.map((item, index) => {
          const baseIndex = index % items.length
          const cardBody = (
            <>
              <img
                src={item.src}
                alt={item.title || ''}
                draggable={false}
                className="w-full h-full object-cover pointer-events-none"
                loading="eager"
              />
              {showTitles && item.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-forest-night/85 via-transparent to-transparent flex items-end p-5 pointer-events-none">
                  <p className="font-sans text-xs tracking-widest uppercase text-cream font-medium">
                    {item.title}
                  </p>
                </div>
              )}
            </>
          )

          const cardClasses = `relative flex-shrink-0 overflow-hidden shadow-md select-none bg-forest-night block ${
            onItemClick || itemTo ? 'cursor-pointer' : ''
          } ${cardClassName}`

          if (itemTo) {
            return (
              <Link
                key={index}
                to={itemTo}
                draggable={false}
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault()
                  }
                }}
                className={cardClasses}
              >
                {cardBody}
              </Link>
            )
          }

          return (
            <div
              key={index}
              onClick={() => {
                if (!hasDraggedRef.current && onItemClick) {
                  onItemClick(item, baseIndex)
                }
              }}
              className={cardClasses}
            >
              {cardBody}
            </div>
          )
        })}
      </div>
    </div>
  )
}

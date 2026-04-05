import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ts1Img from '../assets/ts1.png'
import '../styles/scroll-outfit.css'

const outfits = [
  { id: 1, label: 'SHADOW REIGN', subtitle: 'DROP 01 — LOOK 1', image: ts1Img },
  { id: 2, label: 'SHADOW REIGN', subtitle: 'DROP 01 — LOOK 2', image: ts1Img },
  { id: 3, label: 'SHADOW REIGN', subtitle: 'DROP 01 — LOOK 3', image: ts1Img },
  { id: 4, label: 'SHADOW REIGN', subtitle: 'DROP 01 — LOOK 4', image: ts1Img },
  { id: 5, label: 'SHADOW REIGN', subtitle: 'DROP 01 — LOOK 5', image: ts1Img },
]

function useCurrentTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return time
}

function useCurrentDate() {
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

const labelVariants = {
  enter: (direction) => ({
    y: 30,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
}

export default function ScrollOutfitSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [virtualIndex, setVirtualIndex] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const wheelLockRef = useRef(false)
  const autoScrollCooldownRef = useRef(null)
  const timestamp = useCurrentTime()
  const sessionDate = useCurrentDate()
  const total = outfits.length
  const loopedOutfits = useMemo(
    () => [outfits[total - 1], ...outfits, outfits[0]],
    [total]
  )

  const applyCooldown = useCallback(() => {
    if (autoScrollCooldownRef.current) {
      clearTimeout(autoScrollCooldownRef.current)
    }
    autoScrollCooldownRef.current = setTimeout(() => {
      autoScrollCooldownRef.current = null
    }, 3000)
  }, [])

  const paginate = useCallback((newDirection, fromUser = false) => {
    if (fromUser) applyCooldown()
    setDirection(newDirection)
    setIsTransitioning(true)
    setVirtualIndex((prev) => prev + newDirection)
  }, [applyCooldown])

  const moveToIndex = useCallback((targetIndex) => {
    if (targetIndex === activeIndex) return
    const dir = targetIndex > activeIndex ? 1 : -1
    setDirection(dir)
    setIsTransitioning(true)
    setVirtualIndex(targetIndex + 1)
    applyCooldown()
  }, [activeIndex, applyCooldown])

  const handleTrackTransitionEnd = useCallback(() => {
    if (virtualIndex === 0) {
      setIsTransitioning(false)
      setVirtualIndex(total)
      setActiveIndex(total - 1)
      return
    }

    if (virtualIndex === total + 1) {
      setIsTransitioning(false)
      setVirtualIndex(1)
      setActiveIndex(0)
      return
    }

    setActiveIndex(virtualIndex - 1)
  }, [total, virtualIndex])

  useEffect(() => {
    if (isTransitioning) return
    const raf = requestAnimationFrame(() => {
      setIsTransitioning(true)
    })
    return () => cancelAnimationFrame(raf)
  }, [isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') paginate(1, true)
      if (e.key === 'ArrowLeft') paginate(-1, true)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [paginate])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoScrollCooldownRef.current) {
        paginate(1)
      }
    }, 2600)

    return () => {
      clearInterval(interval)
      if (autoScrollCooldownRef.current) {
        clearTimeout(autoScrollCooldownRef.current)
      }
    }
  }, [paginate])

  const handleWheel = (e) => {
    if (wheelLockRef.current) return

    // Only horizontal wheel movement should control the carousel.
    const horizontalDelta = e.deltaX
    if (Math.abs(horizontalDelta) < 8) return

    e.preventDefault()

    wheelLockRef.current = true
    paginate(horizontalDelta > 0 ? 1 : -1, true)
    setTimeout(() => {
      wheelLockRef.current = false
    }, 380)
  }

  const currentOutfit = outfits[activeIndex]
  const prevIndex = activeIndex === 0 ? outfits.length - 1 : activeIndex - 1
  const nextIndex = activeIndex === outfits.length - 1 ? 0 : activeIndex + 1

  return (
    <section className="pv-outfit-section">
      <div className="pv-outfit-sticky">
        {/* Blue edge glow */}
        <div className="pv-edge-glow" />

        {/* Noise / grain overlay */}
        <div className="pv-noise-overlay" />

        {/* Background text */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`bg-${activeIndex}`}
            className="pv-bg-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentOutfit.label}
          </motion.div>
        </AnimatePresence>

        {/* Side ghost thumbnails */}
        <div className="pv-thumb pv-thumb-left">
          <img src={outfits[prevIndex].image} alt="prev" />
        </div>
        <div className="pv-thumb pv-thumb-right">
          <img src={outfits[nextIndex].image} alt="next" />
        </div>

        {/* Central outfit images with horizontal track */}
        <div className="pv-track-container" onWheel={handleWheel}>
          <div
            className="pv-track"
            onTransitionEnd={handleTrackTransitionEnd}
            style={{
              transform: `translate3d(${(1 - virtualIndex) * (100 / 3)}%, 0, 0)`,
              transition: isTransitioning
                ? 'transform 520ms cubic-bezier(0.19, 1, 0.22, 1)'
                : 'none',
            }}
          >
            {loopedOutfits.map((outfit, i) => {
              const isCenter = i === virtualIndex
              return (
                <div
                  key={`${outfit.id}-${i}`}
                  className={`pv-track-item ${isCenter ? 'is-center' : 'is-side'}`}
                >
                <img
                  src={outfit.image}
                  alt={outfit.label}
                  className="pv-model-img"
                  draggable="false"
                />
              </div>
              )
            })}
          </div>
        </div>

        {/* HUD Overlays */}
        <div className="pv-hud pv-hud-left">
          <div className="pv-hud-title">VAULT STATUS</div>
          <div className="pv-hud-divider" />
          <div className="pv-hud-line">SESSION : [{sessionDate}]</div>
          <div className="pv-hud-line">TIMESTAMP: [{timestamp}]</div>
          <div className="pv-hud-line">ASSETS : (LOADED)</div>
          <div className="pv-hud-spacer" />
          <div className="pv-hud-line">DISPLAY : (1920X1080PX @ 75HZ)</div>
          <div className="pv-hud-line">CLIENT : (DEN & DRIP)</div>
          <div className="pv-hud-line">MARKET : (2047)</div>
        </div>

        <div className="pv-hud pv-hud-right">
          <div className="pv-hud-title">VAULT STATUS</div>
          <div className="pv-hud-divider" />
          <div className="pv-hud-line">SESSION : [{sessionDate}]</div>
          <div className="pv-hud-line">TIMESTAMP: [{timestamp}]</div>
          <div className="pv-hud-line">ASSETS : (LOADED)</div>
          <div className="pv-hud-spacer" />
          <div className="pv-hud-line">DISPLAY : (1920X1080PX @ 75HZ)</div>
          <div className="pv-hud-line">CLIENT : (DEN & DRIP)</div>
          <div className="pv-hud-line">MARKET : (2047)</div>
        </div>

        {/* [X] markers */}
        <div className="pv-marker pv-marker-tl">[X]</div>
        <div className="pv-marker pv-marker-tr">[X]</div>
        <div className="pv-marker pv-marker-bl">[X]</div>
        <div className="pv-marker pv-marker-br">[X]</div>

        {/* Outfit label */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`label-${activeIndex}`}
            className="pv-outfit-label"
            variants={labelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
          >
            <div className="pv-label-counter">
              {String(activeIndex + 1).padStart(2, '0')} / {String(outfits.length).padStart(2, '0')}
            </div>
            <h3>{currentOutfit.label}</h3>
            <p>{currentOutfit.subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="pv-progress">
          {outfits.map((_, i) => (
            <button
              key={i}
              className={`pv-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => moveToIndex(i)}
              aria-label={`Go to look ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom description */}
        <div className="pv-bottom-desc">
          DEN & DRIP IS A PREMIUM STREETWEAR COLLECTIVE.
          EXPERIENCE THE CULTURE BEFORE IT ARRIVES.
        </div>

        {/* Swipe hint */}
        <div className="pv-swipe-hint">
          <span className="pv-swipe-arrow">←</span>
          SCROLL TO EXPLORE
          <span className="pv-swipe-arrow">→</span>
        </div>
      </div>
    </section>
  )
}

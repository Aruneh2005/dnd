import React, { useState, useEffect, useCallback } from 'react'
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
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideWidth, setSlideWidth] = useState(500)
  const timestamp = useCurrentTime()
  const sessionDate = useCurrentDate()

  // Update slide width based on responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideWidth(window.innerWidth)
      } else {
        setSlideWidth(500)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const paginate = useCallback((newDirection) => {
    if (isAnimating) return
    setActiveIndex(([prev]) => {
      let next = prev + newDirection
      if (next < 0) next = outfits.length - 1
      if (next >= outfits.length) next = 0
      return [next, newDirection]
    })
  }, [isAnimating])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'ArrowLeft') paginate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [paginate])

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
        <div className="pv-track-container" style={{ cursor: 'grab' }}>
          <motion.div
            className="pv-track"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipeThreshold = 50
              if (offset.x < -swipeThreshold || velocity.x < -500) {
                paginate(1)
              } else if (offset.x > swipeThreshold || velocity.x > 500) {
                paginate(-1)
              }
            }}
            animate={{ x: -activeIndex * slideWidth }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ display: 'flex' }}
          >
            {outfits.map((outfit) => (
              <div key={outfit.id} className="pv-track-item">
                <img
                  src={outfit.image}
                  alt={outfit.label}
                  className="pv-model-img"
                  draggable="false"
                />
              </div>
            ))}
          </motion.div>
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
              onClick={() => {
                const dir = i > activeIndex ? 1 : -1
                setActiveIndex([i, dir])
              }}
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
          DRAG TO EXPLORE
          <span className="pv-swipe-arrow">→</span>
        </div>
      </div>
    </section>
  )
}

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../styles/scroll-outfit.css'

const outfits = [
  {
    id: 1,
    label: 'Midnight Black',
    subtitle: 'Essential Collection',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop',
    products: [
      { name: 'Black Oversized Tee', price: '$65', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop' },
      { name: 'Tapered Joggers', price: '$90', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop' },
    ],
  },
  {
    id: 2,
    label: 'Urban Edge',
    subtitle: 'Street Collection',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
    products: [
      { name: 'Vintage Denim Jacket', price: '$120', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop' },
      { name: 'Relaxed Canvas Cargos', price: '$110', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop' },
    ],
  },
  {
    id: 3,
    label: 'Clean Lines',
    subtitle: 'Minimal Collection',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    products: [
      { name: 'Ivory Relaxed Tee', price: '$70', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop' },
      { name: 'Wide Trousers', price: '$140', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop' },
    ],
  },
]

export default function ScrollOutfitSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Which outfit index (0-2) based on scroll progress
  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.34, 0.66, 0.67, 1], [0, 0, 1, 1, 2, 2])

  return (
    <section ref={sectionRef} className="outfit-section">
      <div className="outfit-sticky">
        {/* Model images with crossfade */}
        <div className="outfit-model-container">
          {outfits.map((outfit, i) => (
            <OutfitImage key={outfit.id} outfit={outfit} index={i} scrollProgress={scrollYProgress} />
          ))}
        </div>

        {/* Side cards - left */}
        <SideCards position="left" scrollProgress={scrollYProgress} outfits={outfits} />

        {/* Side cards - right */}
        <SideCards position="right" scrollProgress={scrollYProgress} outfits={outfits} />

        {/* Outfit label */}
        <OutfitLabel scrollProgress={scrollYProgress} outfits={outfits} />

        {/* Progress dots */}
        <ProgressDots scrollProgress={scrollYProgress} count={outfits.length} />

        {/* Scroll hint */}
        <div className="outfit-scroll-hint">scroll to explore</div>
      </div>
    </section>
  )
}

function OutfitImage({ outfit, index, scrollProgress }) {
  const ranges = [
    [0, 0.15, 0.3],
    [0.2, 0.4, 0.6],
    [0.55, 0.7, 1],
  ]

  const opacity = useTransform(
    scrollProgress,
    index === 0
      ? [0, 0.05, 0.28, 0.35]
      : index === 1
        ? [0.28, 0.35, 0.62, 0.68]
        : [0.62, 0.68, 0.95, 1],
    index === 0 ? [1, 1, 1, 0] : index === 1 ? [0, 1, 1, 0] : [0, 1, 1, 1]
  )

  const scale = useTransform(
    scrollProgress,
    index === 0
      ? [0, 0.3]
      : index === 1
        ? [0.3, 0.35, 0.6]
        : [0.6, 0.68, 1],
    index === 0 ? [1, 1.05] : index === 1 ? [0.95, 1, 1.05] : [0.95, 1, 1]
  )

  return (
    <motion.img
      src={outfit.image}
      alt={outfit.label}
      className="outfit-model-img"
      style={{ opacity, scale }}
    />
  )
}

function SideCards({ position, scrollProgress, outfits }) {
  const productIndex = position === 'left' ? 0 : 1

  return (
    <div className={`outfit-side-cards ${position}`}>
      {outfits.map((outfit, i) => {
        const product = outfit.products[productIndex]
        if (!product) return null

        return (
          <SideCard key={i} product={product} index={i} scrollProgress={scrollProgress} />
        )
      })}
    </div>
  )
}

function SideCard({ product, index, scrollProgress }) {
  const opacity = useTransform(
    scrollProgress,
    index === 0
      ? [0, 0.05, 0.28, 0.35]
      : index === 1
        ? [0.28, 0.38, 0.58, 0.65]
        : [0.6, 0.7, 0.95, 1],
    index === 0 ? [1, 1, 1, 0] : index === 1 ? [0, 1, 1, 0] : [0, 1, 1, 1]
  )

  const y = useTransform(
    scrollProgress,
    index === 0
      ? [0, 0.3]
      : index === 1
        ? [0.3, 0.65]
        : [0.6, 1],
    [0, -15]
  )

  return (
    <motion.div className="outfit-preview-card" style={{ opacity, y }}>
      <img src={product.image} alt={product.name} />
      <div className="card-name">{product.name}</div>
      <div className="card-price">{product.price}</div>
    </motion.div>
  )
}

function OutfitLabel({ scrollProgress, outfits }) {
  return (
    <div className="outfit-label">
      {outfits.map((outfit, i) => {
        const opacity = useTransform(
          scrollProgress,
          i === 0
            ? [0, 0.05, 0.28, 0.35]
            : i === 1
              ? [0.28, 0.38, 0.58, 0.65]
              : [0.6, 0.7, 0.95, 1],
          i === 0 ? [1, 1, 1, 0] : i === 1 ? [0, 1, 1, 0] : [0, 1, 1, 1]
        )

        return (
          <motion.div key={i} style={{ opacity, position: i === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}>
            <h3>{outfit.label}</h3>
            <p>{outfit.subtitle}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

function ProgressDots({ scrollProgress, count }) {
  return (
    <div className="outfit-progress">
      {Array.from({ length: count }).map((_, i) => (
        <ProgressDot key={i} index={i} scrollProgress={scrollProgress} />
      ))}
    </div>
  )
}

function ProgressDot({ index, scrollProgress }) {
  const opacity = useTransform(
    scrollProgress,
    index === 0
      ? [0, 0.05, 0.3, 0.35]
      : index === 1
        ? [0.3, 0.35, 0.63, 0.68]
        : [0.63, 0.68, 1, 1],
    index === 0 ? [1, 1, 1, 0.3] : index === 1 ? [0.3, 1, 1, 0.3] : [0.3, 1, 1, 1]
  )

  const scale = useTransform(
    scrollProgress,
    index === 0
      ? [0, 0.05, 0.3, 0.35]
      : index === 1
        ? [0.3, 0.35, 0.63, 0.68]
        : [0.63, 0.68, 1, 1],
    index === 0 ? [1.4, 1.4, 1.4, 0.8] : index === 1 ? [0.8, 1.4, 1.4, 0.8] : [0.8, 1.4, 1.4, 1.4]
  )

  return (
    <motion.div className="outfit-dot" style={{ opacity, scale }} />
  )
}

import React from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import manImg from '../assets/man.png'
import ScrollOutfitSection from '../components/ScrollOutfitSection'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function HomePage() {
  const { scrollYProgress } = useScroll()

  // Hero animations based on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  const blurValue = useTransform(scrollYProgress, [0, 0.08], [0, 15])
  const heroBlur = useMotionTemplate`blur(${blurValue}px)`

  return (
    <>
      {/* Hero Section - PRESERVED FROM ORIGINAL */}
      <div className="framed-content-wrapper" style={{ height: '100vh' }}>
        <motion.div
          className="framed-content"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            filter: heroBlur,
          }}
        >
          <main className="hero-section">
            <h1 className="aura-title">den</h1>
            <img
              src={manImg}
              alt="den & drip Central Figure"
              className="central-figure"
            />
            <h1 className="store-title">drip</h1>
            <div className="left-content">
              <div className="moto-text">Your second skin</div>
              <p className="desc-text">
                Modern silhouettes, natural fabrics, and honest design.
                For those who choose simplicity and quality.
              </p>
            </div>

            <div className="scroll-indicator">
              <span>scroll to explore</span>
              <ChevronRight style={{ transform: 'rotate(90deg)' }} size={16} />
            </div>
          </main>
        </motion.div>
      </div>

      {/* Scroll Outfit Transition Section */}
      <ScrollOutfitSection />

      {/* Product Grid Section */}
      <ProductGrid />

      {/* Footer */}
      <Footer />
    </>
  )
}

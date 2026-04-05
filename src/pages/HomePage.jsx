import React from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, color } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import manImg from '../assets/man.png'
import ScrollOutfitSection from '../components/ScrollOutfitSection'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function HomePage() {
  const { scrollYProgress } = useScroll()

  // Hero animations based on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])

  // Parallax animations - Man (figure) moves up slower, Titles move faster
  // Man slides from down to up with a lower scroll speed relative to the background text
  const figureYOffset = useTransform(scrollYProgress, [0, 0.4], [0, -150])
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -300])
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  // Combine centering and parallax
  const figureY = useMotionTemplate`calc(-50% + ${figureYOffset}px)`

  return (
    <>
      <div className="framed-content-wrapper" style={{ height: '100vh' }}>
        <motion.div
          className="framed-content"
          style={{
            scale: heroScale,
          }}
        >
          <main className="hero-section">
            <motion.h1 
              className="hero-background-title"
              style={{ y: titleY }}
            >
              den & drip
            </motion.h1>
            <motion.img
              src={manImg}
              alt="den & drip Central Figure"
              className="central-figure"
              style={{ x: "-50%", y: figureY }}
            />
            <motion.div 
              className="left-content"
              style={{ y: textY }}
            >
              <div className="moto-text">Your second skin</div>
              <p className="desc-text">
                Modern silhouettes, natural fabrics, and honest design.
                For those who choose simplicity and quality.
              </p>
            </motion.div>

            <motion.div 
              className="scroll-indicator"
              style={{ y: textY }}
            >
              <span>scroll to explore</span>
              <ChevronRight style={{ transform: 'rotate(90deg)' }} size={16} />
            </motion.div>
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

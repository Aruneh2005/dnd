import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { ShoppingBag, ArrowDownRight, ChevronRight } from 'lucide-react'
import './index.css'
import manImg from './assets/man.png'

const products = [
  {
    id: 1,
    name: 'Oversized Ivory Hoodie',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Architectural Trousers',
    price: '$180',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Essential White Tee',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Structured Tote',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop'
  }
]

function ShopSection() {
  return (
    <section id="shop" className="shop-section">
      <div className="shop-header">
        <motion.h2 
          className="shop-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
        >
          the new<br />collection
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <ArrowDownRight size={48} strokeWidth={1} />
        </motion.div>
      </div>

      <div className="shop-grid">
        {products.map((product, index) => (
          <motion.div 
            key={product.id}
            className="shop-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          >
            <div className="shop-item-img-wrapper">
              <img src={product.image} alt={product.name} className="shop-item-img" />
            </div>
            <div className="shop-item-info">
              <span>{product.name}</span>
              <span>{product.price}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="shop-footer" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', gap: '2rem', fontStyle: 'italic', opacity: 0.6 }}>
          <span>©2024 den & drip</span>
          <span>privacy policy</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>instagram</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>twitter</a>
        </div>
      </footer>
    </section>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const { scrollYProgress } = useScroll()

  // Hero animations based on scroll
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  const blurValue = useTransform(scrollYProgress, [0, 0.08], [0, 15])
  const heroBlur = useMotionTemplate`blur(${blurValue}px)`

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="app-container">
      <nav className="navbar" style={{ position: 'fixed', top: '40px', left: '80px', right: '80px', zIndex: 100 }}>
        <div className="menu-spacer"></div>
        <div className="nav-logo">
          <span>den</span>
          <span>& drip</span>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#main" className="active" onClick={() => setIsMenuOpen(false)}>main</a>
          <a href="#shop" onClick={() => setIsMenuOpen(false)}>shop</a>
          <a href="#custom" onClick={() => setIsMenuOpen(false)}>custom</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>about</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>contact</a>
        </div>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </nav>

      <div className="framed-content-wrapper" style={{ height: '100vh' }}>
        <motion.div 
          className="framed-content"
          style={{ 
            scale: heroScale,
            opacity: heroOpacity,
            filter: heroBlur
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

      <ShopSection />

      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </div>
  )
}

export default App

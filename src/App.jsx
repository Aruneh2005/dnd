import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { CartProvider, useCart } from './context/CartContext'
import CartDrawer from './components/CartDrawer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import './index.css'
import './styles/cart.css'

function CartIcon({ onClick }) {
  const { itemCount } = useCart()
  return (
    <div className="cart-icon-wrapper" onClick={onClick} id="cart-icon">
      <ShoppingBag size={20} strokeWidth={1.5} />
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </div>
  )
}

function Navbar({ onCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="menu-spacer"></div>
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>den</span>
          <span>& drip</span>
        </Link>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="/#main" className="active" onClick={() => setIsMenuOpen(false)}>main</a>
          <a href="/#shop" onClick={() => setIsMenuOpen(false)}>shop</a>
          <a href="/#custom" onClick={() => setIsMenuOpen(false)}>custom</a>
          <a href="/#about" onClick={() => setIsMenuOpen(false)}>about</a>
          <a href="/#contact" onClick={() => setIsMenuOpen(false)}>contact</a>
          <div className="nav-cart-mobile" onClick={() => { setIsMenuOpen(false); onCartOpen(); }}>
            <ShoppingBag size={18} strokeWidth={1.5} /> bag
          </div>
        </div>
        <div className="nav-right-group">
          <CartIcon onClick={onCartOpen} />
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="app-container">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <AnimatedRoutes />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App

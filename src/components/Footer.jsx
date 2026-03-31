import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>den</span>
            <span>& drip</span>
          </div>
          <p className="footer-tagline">
            Modern silhouettes, natural fabrics, and honest design. 
            For those who choose simplicity and quality.
          </p>
          <form className="footer-newsletter" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              {subscribed ? 'subscribed ✓' : 'subscribe'}
            </button>
          </form>
        </div>

        <div className="footer-col">
          <h4>shop</h4>
          <ul>
            <li><a href="#shop">t-shirts</a></li>
            <li><a href="#shop">thrift</a></li>
            <li><a href="#shop">pants</a></li>
            <li><a href="#shop">new arrivals</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>info</h4>
          <ul>
            <li><a href="#about">about us</a></li>
            <li><a href="#contact">contact</a></li>
            <li><a href="#">size guide</a></li>
            <li><a href="#">shipping</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>help</h4>
          <ul>
            <li><a href="#">faq</a></li>
            <li><a href="#">returns</a></li>
            <li><a href="#">privacy policy</a></li>
            <li><a href="#">terms of service</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">© 2024 den & drip. all rights reserved.</span>
        <div className="footer-socials">
          <a href="#" target="_blank" rel="noopener noreferrer">instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">tiktok</a>
        </div>
      </div>
    </motion.footer>
  )
}

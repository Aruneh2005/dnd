import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../styles/product-grid.css'

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: [0.19, 1, 0.22, 1],
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link to={`/product/${product.id}`} className="product-card" id={`product-card-${product.id}`}>
        <div className="product-card-img-wrapper">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
          />
          <div className="product-card-overlay">
            <span className="quick-add-btn">view product</span>
          </div>
        </div>
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-info">
          <span className="product-card-name">{product.name}</span>
          <span className="product-card-price">${product.price}</span>
        </div>
      </Link>
    </motion.div>
  )
}

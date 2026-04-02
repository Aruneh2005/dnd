import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { categories, getProductsByCategory } from '../data/products'
import '../styles/product-grid.css'

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('All')
  const products = getProductsByCategory(activeCategory)

  return (
    <section id="shop" className="products-section">
      <div className="products-section-header">
        <motion.h2
          className="products-section-title"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
        >
          the new<br />collection
        </motion.h2>

        <motion.div
          className="category-filters"
          initial={{ y: 10 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="product-grid"
        layout
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </motion.div>
    </section>
  )
}

import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'
import '../styles/product-detail.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="product-detail-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Syncopate', sans-serif", marginBottom: '1rem' }}>product not found</h2>
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> back to shop
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0 }}
    >
      <div className="product-detail-page">
        <div className="product-detail-container">
          {/* Image Gallery */}
          <motion.div
            className="product-gallery"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ duration: 0 }}
          >
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> back
            </button>
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.name}
              className="product-main-image"
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0 }}
            />
            <div className="product-thumbnail-row">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  className={`product-thumbnail ${activeImage === i ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="product-info"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ duration: 0 }}
          >
            <span className="product-detail-category">{product.category}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <span className="product-detail-price">${product.price}</span>

            <p className="product-detail-description">{product.description}</p>

            <hr className="product-divider" />

            {/* Size selector */}
            <div>
              <p className="size-selector-label">
                size {selectedSize && `— ${selectedSize}`}
              </p>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    id={`size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <motion.button
              className={`add-to-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              disabled={!selectedSize}
              style={{ opacity: selectedSize ? 1 : 0.5, cursor: selectedSize ? 'pointer' : 'not-allowed' }}
              id="add-to-cart-btn"
            >
              {added ? '✓ added to bag' : selectedSize ? 'add to bag' : 'select a size'}
            </motion.button>

            <hr className="product-divider" />

            {/* Features */}
            <div className="product-features">
              <div className="product-feature">
                <Truck size={18} />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="product-feature">
                <RotateCcw size={18} />
                <span>30-day return policy</span>
              </div>
              <div className="product-feature">
                <Shield size={18} />
                <span>Premium quality guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </motion.div>
  )
}

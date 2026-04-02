import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import '../styles/cart.css'

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, itemCount, totalPrice, clearCart } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="cart-drawer-header">
              <h3 className="cart-drawer-title">bag ({itemCount})</h3>
              <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
                <X size={16} />
              </button>
            </div>

            <div className="cart-items-list">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} className="cart-empty-icon" />
                  <p>your bag is empty</p>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      className="cart-item"
                      initial={{ opacity: 1, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, padding: 0 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-top">
                          <div>
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-size">size: {item.size}</div>
                          </div>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeItem(item.id, item.size)}
                            aria-label="Remove item"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="cart-item-bottom">
                          <div className="cart-quantity-controls">
                            <button
                              className="cart-qty-btn"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="cart-qty-value">{item.quantity}</span>
                            <button
                              className="cart-qty-btn"
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="cart-item-price">${item.price * item.quantity}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">total</span>
                  <span className="cart-total-value">${totalPrice}</span>
                </div>
                <button className="checkout-btn" id="checkout-btn">
                  checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const categories = ['All', 'T-Shirts', 'Thrift', 'Pants']

export const products = [
  // T-Shirts
  {
    id: 1,
    name: 'Essential Oversized Tee',
    price: 65,
    category: 'T-Shirts',
    description: 'Premium heavyweight cotton oversized tee with dropped shoulders. Washed black finish for that lived-in feel. The foundation of every wardrobe.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1980&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop',
    ],
  },
  {
    id: 2,
    name: 'Ivory Relaxed Fit Tee',
    price: 70,
    category: 'T-Shirts',
    description: 'Soft-touch organic cotton in an off-white ivory tone. Minimal branding, maximum comfort. Relaxed silhouette for effortless layering.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1974&auto=format&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Washed Graphic Tee',
    price: 75,
    category: 'T-Shirts',
    description: 'Sun-faded vintage graphic print on premium 280gsm cotton. Each piece develops unique character with wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1927&auto=format&fit=crop',
    ],
  },
  {
    id: 4,
    name: 'Charcoal Pocket Tee',
    price: 60,
    category: 'T-Shirts',
    description: 'Minimalist pocket tee in deep charcoal. Japanese-milled cotton with reinforced stitching. Understated luxury for daily wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1980&auto=format&fit=crop',
    ],
  },

  // Thrift
  {
    id: 5,
    name: 'Vintage Denim Jacket',
    price: 120,
    category: 'Thrift',
    description: 'One-of-a-kind vintage denim with natural distressing. Curated from premium deadstock. Each piece tells its own story.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?q=80&w=2070&auto=format&fit=crop',
    ],
  },
  {
    id: 6,
    name: 'Retro Corduroy Overshirt',
    price: 95,
    category: 'Thrift',
    description: 'Wide-wale corduroy overshirt in warm sand tone. Vintage buttons and relaxed fit. Perfect transitional layer.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop',
    ],
  },
  {
    id: 7,
    name: 'Oversized Flannel Shirt',
    price: 85,
    category: 'Thrift',
    description: 'Heavyweight brushed flannel in muted earth tones. Generous oversized cut. Soft hand-feel that only vintage can deliver.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
    ],
  },
  {
    id: 8,
    name: 'Archive Leather Bomber',
    price: 185,
    category: 'Thrift',
    description: 'Buttery soft leather bomber from the archives. Aged patina adds character. A timeless statement piece.',
    sizes: ['M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601933470096-0e34634ffcde?q=80&w=2070&auto=format&fit=crop',
    ],
  },

  // Pants
  {
    id: 9,
    name: 'Architectural Wide Trousers',
    price: 140,
    category: 'Pants',
    description: 'Structured wide-leg trousers in deep black. Clean architectural lines with pressed creases. Japanese wool-blend fabric.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop',
    ],
  },
  {
    id: 10,
    name: 'Relaxed Canvas Cargos',
    price: 110,
    category: 'Pants',
    description: 'Washed canvas cargo pants with oversized pockets. Relaxed fit with drawstring hem. Built for movement and style.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
    ],
  },
  {
    id: 11,
    name: 'Pleated Linen Trousers',
    price: 125,
    category: 'Pants',
    description: 'Breathable linen-cotton blend with double front pleats. Natural beige tone. Ideal for warm weather sophistication.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop',
    ],
  },
  {
    id: 12,
    name: 'Tapered Sweatpants',
    price: 90,
    category: 'Pants',
    description: 'Heavyweight French terry sweatpants with tapered leg. Ribbed ankle cuffs and hidden side pockets. Elevated essentials.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop',
    ],
  },
]

export const getProductById = (id) => products.find((p) => p.id === Number(id))

export const getProductsByCategory = (category) => {
  if (category === 'All') return products
  return products.filter((p) => p.category === category)
}

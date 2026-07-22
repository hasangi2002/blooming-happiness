import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import StarRating from '../common/StarRating';

const easeLuxury = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeLuxury } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card group relative !p-0 overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            product.inStock ? 'group-hover:scale-105' : 'grayscale'
          }`}
        />

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-aubergine-900/50">
            <span className="rounded-[var(--radius-pill)] bg-ivory px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-aubergine-800">
              Out of Stock
            </span>
          </div>
        )}

        {product.badge && product.inStock && (
          <span className="badge-gold absolute left-3 top-3">{product.badge}</span>
        )}

        <button
          onClick={() => setWishlisted((prev) => !prev)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-aubergine-700 shadow-[var(--shadow-soft)] transition-colors hover:text-blush-600"
        >
          <FiHeart size={16} className={wishlisted ? 'fill-blush-600 text-blush-600' : ''} />
        </button>

        {product.inStock && (
          <motion.div
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            className="absolute inset-x-0 bottom-0 hidden sm:block"
          >
            <button className="btn-primary w-full !rounded-none flex items-center justify-center gap-2 text-sm">
              <FiShoppingBag size={15} /> Add to Cart
            </button>
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <StarRating rating={product.rating} />
        <Link to={`/shop/${product.id}`}>
          <h3 className="mt-2 font-display text-lg text-aubergine-900 hover:text-lavender-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold text-aubergine-800">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-aubergine-300 line-through">${product.oldPrice}</span>
          )}
        </div>

        {product.inStock && (
          <button className="btn-secondary mt-3 w-full text-sm sm:hidden">Add to Cart</button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

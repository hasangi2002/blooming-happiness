import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import StarRating from '../common/StarRating';
import { StaggerGroup, StaggerItem } from '../common/Reveal';
import { FEATURED_PRODUCTS } from '../../constants/mockData';

const ProductCard = ({ product }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="card group relative !p-0 overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {product.badge && (
          <span className="badge-gold absolute left-3 top-3">{product.badge}</span>
        )}

        <button
          onClick={() => setWishlisted((prev) => !prev)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-aubergine-700 shadow-[var(--shadow-soft)] transition-colors hover:text-blush-600"
        >
          <FiHeart size={16} className={wishlisted ? 'fill-blush-600 text-blush-600' : ''} />
        </button>

        <motion.div
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          className="absolute inset-x-0 bottom-0 hidden sm:block"
        >
          <button className="btn-primary w-full !rounded-none flex items-center justify-center gap-2 text-sm">
            <FiShoppingBag size={15} /> Add to Cart
          </button>
        </motion.div>
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

        {/* Mobile-only add-to-cart, since hover reveal doesn't work on touch */}
        <button className="btn-secondary mt-3 w-full text-sm sm:hidden">Add to Cart</button>
      </div>
    </div>
  );
};

const FeaturedProducts = () => (
  <section className="section bg-ivory-dim">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Handpicked"
        title="Featured Products"
        subtitle="Our most-loved arrangements, chosen by customers who keep coming back."
      />

      <StaggerGroup className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {FEATURED_PRODUCTS.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div className="mt-14 text-center">
        <Link to="/shop" className="btn-secondary">
          View All Products
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedProducts;

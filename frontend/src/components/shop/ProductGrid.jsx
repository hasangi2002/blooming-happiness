import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import EmptyState from './EmptyState';

const ProductGrid = ({ products, isLoading, onResetFilters }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState onResetFilters={onResetFilters} />;
  }

  return (
    <motion.div layout className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductGrid;

import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

const EmptyState = ({ onResetFilters }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-lavender-200 bg-ivory-dim px-6 py-20 text-center"
  >
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lavender-50 text-lavender-400">
      <FiSearch size={28} />
    </div>
    <h3 className="font-display text-xl text-aubergine-900">No flowers found</h3>
    <p className="mt-2 max-w-sm text-sm text-aubergine-500">
      We couldn&apos;t find anything matching your filters. Try adjusting your search
      or clearing filters to see more arrangements.
    </p>
    <button onClick={onResetFilters} className="btn-secondary mt-6">
      Clear Filters
    </button>
  </motion.div>
);

export default EmptyState;

import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import FilterSidebar from './FilterSidebar';

const easeLuxury = [0.16, 1, 0.3, 1];

const MobileFilterDrawer = ({ open, onClose, totalResults, ...filterProps }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-aubergine-900/40 backdrop-blur-sm lg:hidden"
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4, ease: easeLuxury }}
          className="fixed inset-y-0 left-0 z-[90] flex w-full max-w-sm flex-col bg-ivory px-6 py-6 shadow-[var(--shadow-lifted)] lg:hidden"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-lg text-aubergine-900">Filters</span>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="flex h-9 w-9 items-center justify-center rounded-full text-aubergine-700 hover:bg-lavender-50"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <FilterSidebar {...filterProps} />
          </div>

          <button onClick={onClose} className="btn-primary mt-4 w-full">
            Show {totalResults} Results
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default MobileFilterDrawer;

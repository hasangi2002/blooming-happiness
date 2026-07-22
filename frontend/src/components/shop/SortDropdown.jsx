import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck, FiChevronDown } from 'react-icons/fi';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const SORT_LABELS = {
  featured: 'Featured',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  newest: 'Newest Arrivals',
  rating: 'Top Rated',
};

const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-lavender-200 bg-ivory px-4 py-2.5 text-sm font-medium text-aubergine-700 transition-colors hover:border-lavender-400"
      >
        Sort: {SORT_LABELS[value]}
        <FiChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="card-glass absolute right-0 z-20 mt-2 w-56 origin-top-right !p-2"
          >
            {Object.entries(SORT_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-[var(--radius-md)] px-3 py-2 text-left text-sm text-aubergine-700 hover:bg-lavender-50"
              >
                {label}
                {value === key && <FiCheck size={14} className="text-lavender-600" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;

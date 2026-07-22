import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { Reveal } from '../common/Reveal';
import { GALLERY_IMAGES } from '../../constants/mockData';

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section bg-ivory-dim">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Craft"
          title="Gallery"
          subtitle="A glimpse into the arrangements, weddings, and moments we've been part of."
        />

        <div className="columns-2 gap-4 sm:columns-3 [column-fill:_balance]">
          {GALLERY_IMAGES.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05} className="mb-4 break-inside-avoid">
              <button
                onClick={() => setSelected(item)}
                className="group relative block w-full overflow-hidden rounded-[var(--radius-md)]"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-aubergine-900/0 p-3 transition-colors duration-400 group-hover:bg-aubergine-900/40">
                  <span className="translate-y-2 text-sm text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.caption}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-aubergine-900/85 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-3xl overflow-hidden rounded-[var(--radius-lg)]"
            >
              <img src={selected.image} alt={selected.caption} className="max-h-[85vh] w-full object-contain" />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-aubergine-800"
              >
                <FiX size={18} />
              </button>
              <p className="absolute inset-x-0 bottom-0 bg-aubergine-900/60 p-3 text-center text-sm text-ivory">
                {selected.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

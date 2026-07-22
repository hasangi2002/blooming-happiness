import { motion } from 'framer-motion';

const ScrollIndicator = ({ targetId }) => {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Scroll down"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/80"
    >
      <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-9 w-6 items-start justify-center rounded-full border border-ivory/50 p-1"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      </motion.div>
    </motion.button>
  );
};

export default ScrollIndicator;

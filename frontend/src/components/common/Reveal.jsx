import { motion } from 'framer-motion';

const easeLuxury = [0.16, 1, 0.3, 1];

const variantsMap = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
  amount = 0.2,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount }}
    variants={variantsMap[direction]}
    transition={{ duration, delay, ease: easeLuxury }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerGroup = ({ children, className, staggerDelay = 0.1, amount = 0.15 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className, direction = 'up' }) => (
  <motion.div
    variants={variantsMap[direction]}
    transition={{ duration: 0.6, ease: easeLuxury }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;

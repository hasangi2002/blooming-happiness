import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Lottie from 'lottie-react';
import { FaSeedling } from 'react-icons/fa';
import bloomPulse from '../../assets/lottie/bloom-pulse.json';
import FallingPetals from './FallingPetals';

const BRAND = 'Blooming Happiness';
const easeLuxury = [0.16, 1, 0.3, 1];

const letterVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.045, duration: 0.5, ease: easeLuxury },
  }),
};

const PageLoader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tween = gsap.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.6,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
        onComplete: () => {
          setTimeout(() => setExiting(true), 350);
        },
      }
    );
    return () => tween.kill();
  }, []);

  const handleExitComplete = () => {
    navigate('/', { replace: true });
    onFinish();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: easeLuxury } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(160deg, var(--color-lavender-600), var(--color-lavender-800))',
          }}
        >
          <FallingPetals />

          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: easeLuxury }}
            className="relative flex h-28 w-28 items-center justify-center"
          >
            <div className="absolute inset-0">
              {/*<Lottie animationData={bloomPulse} loop autoplay />*/}
            </div>
            <FaSeedling size={40} className="relative text-ivory drop-shadow" />
          </motion.div>

          <div className="mt-6 flex overflow-hidden">
            {BRAND.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-2xl md:text-3xl text-ivory"
                style={{ whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 h-[3px] w-56 overflow-hidden rounded-full bg-ivory/20">
            <motion.div
              className="h-full rounded-full bg-gold-400"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <p className="mt-3 text-xs tracking-[0.3em] text-ivory/70">
            {String(progress).padStart(2, '0')}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import ScrollIndicator from './ScrollIndicator';

gsap.registerPlugin(ScrollTrigger);

const easeLuxury = [0.16, 1, 0.3, 1];

const lineOne = ['Fresh', 'Flowers,'];
const lineTwo = ['Fresh', 'Emotions'];

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.5 + i * 0.12, duration: 0.8, ease: easeLuxury },
  }),
};

const WordLine = ({ words, offset = 0 }) => (
  <span className="flex flex-wrap justify-center gap-x-4">
    {words.map((word, i) => (
      <motion.span
        key={word}
        custom={offset + i}
        variants={wordVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {word}
      </motion.span>
    ))}
  </span>
);

const Hero = () => {
  const heroRef = useRef(null);
  const videoWrapRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const decorX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const decorY = useTransform(springY, [-0.5, 0.5], [-18, 18]);
  const videoX = useTransform(springX, [-0.5, 0.5], [8, -8]);
  const videoY = useTransform(springY, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoWrapRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-aubergine-900"
    >
      {/* Background video layer */}
      <motion.div
        ref={videoWrapRef}
        style={{ x: videoX, y: videoY }}
        className="absolute inset-0 scale-110"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-flowers.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-aubergine-900/70 via-aubergine-900/50 to-aubergine-900/80" />

      {/* Decorative parallax layer */}
      <motion.div style={{ x: decorX, y: decorY }} className="absolute inset-0">

      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="eyebrow mb-4 text-gold-300"
        >
          Est. Blooming Happiness
        </motion.p>

        <h1 className="font-display text-5xl leading-[1.05] text-ivory sm:text-6xl md:text-7xl lg:text-hero">
          <WordLine words={lineOne} offset={0} />
          <WordLine words={lineTwo} offset={lineOne.length} />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-6 max-w-md text-sm text-ivory/75 sm:text-base"
        >
          Hand-tied luxury bouquets, delivered with care — for the moments that deserve
          something extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7, ease: easeLuxury }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link to="/shop" className="btn-primary">
            Shop Now <FiArrowRight />
          </Link>
          <Link
            to="/bouquets"
            className="btn-secondary !border-ivory/60 !text-ivory hover:!bg-ivory hover:!text-aubergine-800"
          >
            Explore Collections
          </Link>
        </motion.div>
      </div>

      <ScrollIndicator targetId="after-hero" />
    </section>
  );
};

export default Hero;

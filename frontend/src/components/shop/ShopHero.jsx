import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SearchBar from './SearchBar';

gsap.registerPlugin(ScrollTrigger);

const ShopHero = ({ search, onSearchChange }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[45vh] min-h-[380px] w-full items-center justify-center overflow-hidden bg-aubergine-900"
    >
      <img
        ref={imgRef}
        src="https://picsum.photos/seed/bh-shop-hero/1600/700"
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-aubergine-900/70 via-aubergine-900/50 to-ivory" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/70"
        >
          <Link to="/" className="hover:text-gold-300">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold-300">Shop</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl text-ivory sm:text-5xl md:text-6xl"
        >
          Shop All Flowers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 max-w-md text-sm text-ivory/70 sm:text-base"
        >
          Explore our full collection of hand-tied luxury arrangements, curated for
          every occasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 w-full max-w-md"
        >
          <SearchBar
            value={search}
            onChange={onSearchChange}
            className="rounded-[var(--radius-pill)] shadow-[var(--shadow-lifted)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ShopHero;

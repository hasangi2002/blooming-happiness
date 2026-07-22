import { useState, useRef, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';
import { FaSeedling } from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { NAV_LINKS } from '../../constants/navigation';

const underlineVariants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const easeLuxury = [0.16, 1, 0.3, 1];

/* ---------- Animated nav link with underline ---------- */
const NavItem = ({ to, label, solid }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to}>
      <motion.div
        className="relative py-2"
        initial="rest"
        whileHover="hover"
        animate={isActive ? 'hover' : 'rest'}
      >
        <span
          className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
            solid ? 'text-aubergine-700' : 'text-ivory'
          }`}
        >
          {label}
        </span>
        <motion.span
          variants={underlineVariants}
          transition={{ duration: 0.3, ease: easeLuxury }}
          className="absolute left-0 -bottom-0.5 h-px w-full origin-center bg-gold-500"
        />
      </motion.div>
    </Link>
  );
};

/* ---------- Icon badge (cart / wishlist) ---------- */
const IconBadge = ({ icon, count, to, solid, label }) => (
  <Link
    to={to}
    aria-label={label}
    className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
      solid
        ? 'text-aubergine-700 hover:bg-lavender-50 hover:text-lavender-600'
        : 'text-ivory hover:bg-white/10'
    }`}
  >
    {icon}
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center
                     rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ivory shadow-[var(--shadow-glow-gold)]"
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  </Link>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const isHero = pathname === '/';
  const scrolled = useScrollPosition(60);
  const solid = scrolled || !isHero;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoRef = useRef(null);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setDropdownOpen(false));

  // Close mobile drawer whenever the route changes
  useEffect(() => setDrawerOpen(false), [pathname]);

  // Subtle ambient float on the logo mark — GSAP handles this rather than
  // Framer Motion since it's an infinite, non-interaction-driven loop.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        y: -5,
        rotate: -4,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeLuxury }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-ivory/95 shadow-[var(--shadow-soft)] backdrop-blur-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span ref={logoRef} className="inline-block text-gold-500">
              <FaSeedling size={24} />
            </span>
            <span
              className={`font-display text-xl font-semibold tracking-wide ${
                solid ? 'text-aubergine-900' : 'text-ivory'
              }`}
            >
              Blooming Happiness
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.path} to={link.path} label={link.label} solid={solid} />
            ))}
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-1.5">
            <IconBadge
              icon={<FiHeart size={19} />}
              count={wishlistCount}
              to="/wishlist"
              solid={solid}
              label="Wishlist"
            />
            <IconBadge
              icon={<FiShoppingBag size={19} />}
              count={cartCount}
              to="/cart"
              solid={solid}
              label="Shopping cart"
            />

            {/* Auth area */}
            {isAuthenticated ? (
              <div className="relative ml-1" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 rounded-full py-1.5 pl-1.5 pr-3 transition-colors duration-300 ${
                    solid ? 'hover:bg-lavender-50' : 'hover:bg-white/10'
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-500 text-xs font-semibold text-ivory">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? 'rotate-180' : ''
                    } ${solid ? 'text-aubergine-700' : 'text-ivory'}`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: easeLuxury }}
                      className="card-glass absolute right-0 mt-3 w-52 origin-top-right !p-2"
                    >
                      <p className="px-3 py-2 text-sm font-semibold text-aubergine-800">
                        {user.name}
                      </p>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block rounded-[var(--radius-md)] px-3 py-2 text-sm text-aubergine-700 hover:bg-lavender-50"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-left text-sm text-blush-700 hover:bg-blush-50"
                      >
                        <FiLogOut size={15} /> Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className={`ml-2 hidden items-center gap-1.5 rounded-[var(--radius-pill)] px-5 py-2 text-sm font-semibold transition-all duration-300 sm:flex ${
                  solid
                    ? 'bg-lavender-600 text-ivory hover:bg-lavender-700'
                    : 'border border-ivory/60 text-ivory hover:bg-ivory/10'
                }`}
              >
                <FiUser size={15} /> Sign In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className={`ml-1 flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
                solid ? 'text-aubergine-700' : 'text-ivory'
              }`}
            >
              <FiMenu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ---------- Mobile Drawer ---------- */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-aubergine-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: easeLuxury }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-ivory px-6 py-6 shadow-[var(--shadow-lifted)]"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-aubergine-900">
                  Menu
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-aubergine-700 hover:bg-lavender-50"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35, ease: easeLuxury }}
                  >
                    <RouterNavLink
                      to={link.path}
                      className="block rounded-[var(--radius-md)] px-3 py-3 font-display text-lg text-aubergine-800 hover:bg-lavender-50"
                    >
                      {link.label}
                    </RouterNavLink>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-lavender-100 pt-6">
                <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2 text-aubergine-700">
                  <FiHeart size={18} /> Wishlist
                  {wishlistCount > 0 && <span className="badge-gold ml-auto">{wishlistCount}</span>}
                </Link>
                <Link to="/cart" className="flex items-center gap-3 px-3 py-2 text-aubergine-700">
                  <FiShoppingBag size={18} /> Cart
                  {cartCount > 0 && <span className="badge-gold ml-auto">{cartCount}</span>}
                </Link>

                {isAuthenticated ? (
                  <button onClick={logout} className="btn-secondary mt-2 w-full">
                    Log Out
                  </button>
                ) : (
                  <Link to="/login" className="btn-primary mt-2 w-full text-center">
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

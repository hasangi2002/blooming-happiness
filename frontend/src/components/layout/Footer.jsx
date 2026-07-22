import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiArrowUp } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Products', path: '/shop' },
    { label: 'Bouquets', path: '/bouquets' },
    { label: 'Occasions', path: '/shop?tab=occasions' },
    { label: 'Gift Sets', path: '/shop?category=gifts' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Careers', path: '/careers' },
  ],
  Support: [
    { label: 'Delivery Info', path: '/delivery' },
    { label: 'Returns', path: '/returns' },
    { label: 'FAQs', path: '/faq' },
  ],
};

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-aubergine-900 pt-16 text-ivory/80">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 pb-12 sm:grid-cols-3 md:grid-cols-5 md:px-12">
        <div className="col-span-2 md:col-span-2">
          <h3 className="font-display text-xl text-ivory">Blooming Happiness</h3>
          <p className="mt-3 max-w-xs text-sm text-ivory/60">
            Hand-tied luxury bouquets, delivered with care - for the moments that
            deserve something extraordinary.
          </p>
          <div className="mt-5 flex gap-3">
            {[FaInstagram, FaFacebookF, FaPinterestP].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 transition-colors hover:bg-gold-500 hover:text-aubergine-900"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-ivory">
              {heading}
            </p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-ivory/60 transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-ivory">Contact</p>
          <ul className="space-y-3 text-sm text-ivory/60">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0" size={14} />
              <span>123 Petal Lane, Colombo, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone size={14} /> +94 77 123 4567
            </li>
            <li className="flex items-center gap-2">
              <FiMail size={14} /> hello@bloominghappiness.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-ivory/50">
            (c) {new Date().getFullYear()} Blooming Happiness. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:bg-gold-500 hover:text-aubergine-900"
          >
            <FiArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

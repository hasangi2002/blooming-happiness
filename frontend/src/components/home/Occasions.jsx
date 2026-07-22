import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import { StaggerGroup, StaggerItem } from '../common/Reveal';
import { OCCASIONS } from '../../constants/mockData';

const Occasions = () => (
  <section className="section bg-ivory">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Every Moment Matters"
        title="Shop by Occasion"
        subtitle="From celebrations to condolences, we have arrangements for every story."
      />

      <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {OCCASIONS.map((occ) => (
          <StaggerItem key={occ.id}>
            <Link
              to={`/shop?occasion=${occ.id}`}
              className="group relative block h-56 overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]"
            >
              <img
                src={occ.image}
                alt={occ.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-aubergine-900/40 transition-colors duration-500 group-hover:bg-aubergine-900/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <h3 className="font-display text-2xl text-ivory">{occ.name}</h3>
                <span className="translate-y-2 rounded-[var(--radius-pill)] border border-ivory/60 px-4 py-1.5 text-xs uppercase tracking-widest text-ivory opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  Shop Now
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default Occasions;

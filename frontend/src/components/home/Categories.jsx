import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { StaggerGroup, StaggerItem } from '../common/Reveal';
import { CATEGORIES } from '../../constants/mockData';

const Categories = () => (
  <section className="section bg-ivory">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Find Your Perfect Bloom"
        subtitle="Curated collections for every taste, from classic roses to rare orchids."
      />

      <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
        {CATEGORIES.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link
              to={`/shop?category=${cat.id}`}
              className="group relative block overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-aubergine-900/80 via-aubergine-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <div>
                  <p className="font-display text-base text-ivory sm:text-lg">{cat.name}</p>
                  <p className="text-xs text-ivory/70">{cat.count} items</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <FiArrowUpRight size={16} />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  </section>
);

export default Categories;

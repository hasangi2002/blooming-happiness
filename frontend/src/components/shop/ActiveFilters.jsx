import { FiX } from 'react-icons/fi';
import { CATEGORIES, OCCASIONS } from '../../constants/mockData';
import { FLOWER_TYPES } from '../../constants/shopData';
import { DEFAULT_FILTERS } from '../../hooks/useProductFilters';

const findName = (list, id) => list.find((item) => item.id === id)?.name || id;

const ActiveFilters = ({ filters, updateFilter, resetFilters }) => {
  const chips = [];

  if (filters.category !== 'all') {
    chips.push({ key: 'category', label: findName(CATEGORIES, filters.category) });
  }
  if (filters.occasion !== 'all') {
    chips.push({ key: 'occasion', label: findName(OCCASIONS, filters.occasion) });
  }
  if (filters.flowerType !== 'all') {
    chips.push({ key: 'flowerType', label: findName(FLOWER_TYPES, filters.flowerType) });
  }
  if (filters.availability !== 'all') {
    chips.push({
      key: 'availability',
      label: filters.availability === 'in-stock' ? 'In Stock' : 'Out of Stock',
    });
  }
  if (
    filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
    filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]
  ) {
    chips.push({
      key: 'priceRange',
      label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          onClick={() =>
            updateFilter(
              chip.key,
              chip.key === 'priceRange' ? DEFAULT_FILTERS.priceRange : 'all'
            )
          }
          className="badge-lavender flex items-center gap-1.5 !normal-case"
        >
          {chip.label}
          <FiX size={12} />
        </button>
      ))}
      <button
        onClick={resetFilters}
        className="text-xs font-semibold text-blush-600 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;

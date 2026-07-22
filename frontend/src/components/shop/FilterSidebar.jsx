import PriceRangeSlider from './PriceRangeSlider';
import { CATEGORIES, OCCASIONS } from '../../constants/mockData';
import { FLOWER_TYPES } from '../../constants/shopData';

const AVAILABILITY_OPTIONS = [
  { id: 'all', name: 'All' },
  { id: 'in-stock', name: 'In Stock' },
  { id: 'out-of-stock', name: 'Out of Stock' },
];

const FilterGroup = ({ title, options, selected, onSelect }) => (
  <div className="border-b border-lavender-100 py-6 first:pt-0 last:border-b-0">
    <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-aubergine-800">
      {title}
    </p>
    <div className="flex flex-col gap-2">
      <button
        onClick={() => onSelect('all')}
        className={`w-fit text-sm transition-colors ${
          selected === 'all'
            ? 'font-semibold text-lavender-600'
            : 'text-aubergine-500 hover:text-lavender-600'
        }`}
      >
        All
      </button>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onSelect(opt.id)}
          className={`w-fit text-sm transition-colors ${
            selected === opt.id
              ? 'font-semibold text-lavender-600'
              : 'text-aubergine-500 hover:text-lavender-600'
          }`}
        >
          {opt.name}
        </button>
      ))}
    </div>
  </div>
);

const FilterSidebar = ({
  filters,
  updateFilter,
  resetFilters,
  activeFilterCount,
  className = '',
}) => (
  <div className={className}>
    <div className="flex items-center justify-between pb-6">
      <p className="font-display text-lg text-aubergine-900">Filters</p>
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-blush-600 hover:underline"
        >
          Clear all ({activeFilterCount})
        </button>
      )}
    </div>

    <div className="border-b border-lavender-100 pb-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-aubergine-800">
        Price Range
      </p>
      <PriceRangeSlider
        min={0}
        max={220}
        value={filters.priceRange}
        onChange={(range) => updateFilter('priceRange', range)}
      />
    </div>

    <FilterGroup
      title="Category"
      options={CATEGORIES}
      selected={filters.category}
      onSelect={(val) => updateFilter('category', val)}
    />
    <FilterGroup
      title="Occasion"
      options={OCCASIONS}
      selected={filters.occasion}
      onSelect={(val) => updateFilter('occasion', val)}
    />
    <FilterGroup
      title="Flower Type"
      options={FLOWER_TYPES}
      selected={filters.flowerType}
      onSelect={(val) => updateFilter('flowerType', val)}
    />
    <div className="pt-6">
      <FilterGroup
        title="Availability"
        options={AVAILABILITY_OPTIONS.slice(1)}
        selected={filters.availability}
        onSelect={(val) => updateFilter('availability', val)}
      />
    </div>
  </div>
);

export default FilterSidebar;

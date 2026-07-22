import { useMemo, useState } from 'react';

const PAGE_SIZE = 8;

const SORT_COMPARATORS = {
  featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  rating: (a, b) => b.rating - a.rating,
};

export const DEFAULT_FILTERS = {
  search: '',
  category: 'all',
  occasion: 'all',
  flowerType: 'all',
  availability: 'all',
  priceRange: [0, 220],
  sort: 'featured',
};

/**
 * Client-side product filtering/sorting/pagination.
 * Swap the `products` argument for API-fetched data once the backend
 * products endpoint exists - this hook's contract won't need to change.
 */
export const useProductFilters = (products, initialFilters = {}) => {
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, ...initialFilters });
  const [page, setPage] = useState(1);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchesSearch =
        !filters.search || p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || p.category === filters.category;
      const matchesOccasion = filters.occasion === 'all' || p.occasion === filters.occasion;
      const matchesFlowerType =
        filters.flowerType === 'all' || p.flowerType === filters.flowerType;
      const matchesAvailability =
        filters.availability === 'all' ||
        (filters.availability === 'in-stock' && p.inStock) ||
        (filters.availability === 'out-of-stock' && !p.inStock);
      const matchesPrice =
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

      return (
        matchesSearch &&
        matchesCategory &&
        matchesOccasion &&
        matchesFlowerType &&
        matchesAvailability &&
        matchesPrice
      );
    });

    return [...result].sort(SORT_COMPARATORS[filters.sort]);
  }, [products, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount = [
    filters.category !== 'all',
    filters.occasion !== 'all',
    filters.flowerType !== 'all',
    filters.availability !== 'all',
    filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] ||
      filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1],
  ].filter(Boolean).length;

  return {
    filters,
    updateFilter,
    resetFilters,
    products: paginated,
    totalResults: filtered.length,
    page,
    setPage,
    totalPages,
    activeFilterCount,
    pageSize: PAGE_SIZE,
  };
};

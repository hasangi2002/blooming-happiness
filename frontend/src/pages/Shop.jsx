import { useEffect, useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import ShopHero from '../components/shop/ShopHero';
import FilterSidebar from '../components/shop/FilterSidebar';
import MobileFilterDrawer from '../components/shop/MobileFilterDrawer';
import SortDropdown from '../components/shop/SortDropdown';
import ActiveFilters from '../components/shop/ActiveFilters';
import ProductGrid from '../components/shop/ProductGrid';
import Pagination from '../components/shop/Pagination';
import { useProductFilters } from '../hooks/useProductFilters';
import { SHOP_PRODUCTS } from '../constants/shopData';

const Shop = () => {
  const {
    filters,
    updateFilter,
    resetFilters,
    products,
    totalResults,
    page,
    setPage,
    totalPages,
    activeFilterCount,
  } = useProductFilters(SHOP_PRODUCTS);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated network delay - there's no products API yet. Replace this
  // effect with a real loading state once GET /products exists; every
  // downstream component already expects `isLoading` as a boolean prop.
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [filters, page]);

  return (
    <div className="bg-ivory">
      <ShopHero search={filters.search} onSearchChange={(val) => updateFilter('search', val)} />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Desktop sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28">
              <FilterSidebar
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-aubergine-500">
                {isLoading
                  ? 'Loading...'
                  : `${totalResults} arrangement${totalResults !== 1 ? 's' : ''} found`}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="btn-secondary flex items-center gap-2 !px-4 !py-2.5 text-sm lg:hidden"
                >
                  <FiSliders size={15} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lavender-600 text-[10px] text-ivory">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <SortDropdown value={filters.sort} onChange={(val) => updateFilter('sort', val)} />
              </div>
            </div>

            <ActiveFilters filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />

            <ProductGrid products={products} isLoading={isLoading} onResetFilters={resetFilters} />

            {!isLoading && (
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        totalResults={totalResults}
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
};

export default Shop;

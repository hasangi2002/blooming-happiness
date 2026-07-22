const ProductCardSkeleton = () => (
  <div className="card !p-0 overflow-hidden">
    <div className="aspect-[4/5] w-full animate-pulse bg-lavender-100" />
    <div className="space-y-2 p-4">
      <div className="h-3 w-16 animate-pulse rounded bg-lavender-100" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-lavender-100" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-lavender-100" />
    </div>
  </div>
);

export default ProductCardSkeleton;

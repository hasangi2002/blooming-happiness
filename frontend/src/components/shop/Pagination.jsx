import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const getPageNumbers = (current, total) => {
  const pages = [];
  const range = 1;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - range && i <= current + range)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }
  return pages;
};

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-lavender-200 text-aubergine-700 transition-colors hover:border-lavender-400 disabled:opacity-30"
      >
        <FiChevronLeft size={16} />
      </button>

      {getPageNumbers(page, totalPages).map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-aubergine-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
              p === page ? 'bg-lavender-600 text-ivory' : 'text-aubergine-700 hover:bg-lavender-50'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-lavender-200 text-aubergine-700 transition-colors hover:border-lavender-400 disabled:opacity-30"
      >
        <FiChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;

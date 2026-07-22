import { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({
  value,
  onChange,
  className = '',
  placeholder = 'Search flowers, bouquets...',
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => setLocalValue(value), [value]);

  // Debounce so filtering doesn't run on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== value) onChange(localValue);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-aubergine-400" size={18} />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="input-field !pl-11 !pr-10"
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-aubergine-400 hover:text-aubergine-700"
        >
          <FiX size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

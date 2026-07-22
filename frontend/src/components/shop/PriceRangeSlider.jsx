import { useEffect, useState } from 'react';

// Two overlapping native <input type="range"> elements, styled via the
// `.range-thumb` utility (added to index.css) since Tailwind can't target
// the native thumb pseudo-elements directly.
const PriceRangeSlider = ({ min = 0, max = 220, value, onChange, step = 5 }) => {
  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  useEffect(() => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
  }, [value]);

  const handleMinChange = (e) => {
    const next = Math.min(Number(e.target.value), localMax - step);
    setLocalMin(next);
    onChange([next, localMax]);
  };

  const handleMaxChange = (e) => {
    const next = Math.max(Number(e.target.value), localMin + step);
    setLocalMax(next);
    onChange([localMin, next]);
  };

  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="relative h-2">
        <div className="absolute inset-0 rounded-full bg-lavender-100" />
        <div
          className="absolute h-full rounded-full bg-lavender-500"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={handleMinChange}
          aria-label="Minimum price"
          className="range-thumb absolute inset-0 w-full appearance-none bg-transparent"
          style={{ zIndex: localMin > max - step * 2 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={handleMaxChange}
          aria-label="Maximum price"
          className="range-thumb absolute inset-0 w-full appearance-none bg-transparent"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-aubergine-600">
        <span>${localMin}</span>
        <span>${localMax}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

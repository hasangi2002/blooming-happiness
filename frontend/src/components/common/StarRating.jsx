import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating = 5, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={size}
        className={i < rating ? 'fill-gold-500 text-gold-500' : 'text-lavender-200'}
      />
    ))}
  </div>
);

export default StarRating;

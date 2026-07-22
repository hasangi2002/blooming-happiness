export const CATEGORIES = [
  { id: 'roses', name: 'Roses', count: 24, image: 'https://picsum.photos/seed/bh-roses/600/750' },
  { id: 'peonies', name: 'Peonies', count: 16, image: 'https://picsum.photos/seed/bh-peonies/600/750' },
  { id: 'orchids', name: 'Orchids', count: 12, image: 'https://picsum.photos/seed/bh-orchids/600/750' },
  { id: 'bouquets', name: 'Signature Bouquets', count: 30, image: 'https://picsum.photos/seed/bh-bouquets/600/750' },
  { id: 'plants', name: 'Potted Plants', count: 18, image: 'https://picsum.photos/seed/bh-plants/600/750' },
  { id: 'gifts', name: 'Gift Sets', count: 9, image: 'https://picsum.photos/seed/bh-gifts/600/750' },
];

export const FEATURED_PRODUCTS = [
  { id: 1, name: 'Velvet Rose Bouquet', price: 89, oldPrice: 110, rating: 5, badge: 'Best Seller', image: 'https://picsum.photos/seed/bh-p1/600/700' },
  { id: 2, name: 'Blush Peony Bundle', price: 76, rating: 5, badge: 'New', image: 'https://picsum.photos/seed/bh-p2/600/700' },
  { id: 3, name: 'Lavender Dream Vase', price: 64, rating: 4, image: 'https://picsum.photos/seed/bh-p3/600/700' },
  { id: 4, name: 'Golden Orchid Elegance', price: 132, rating: 5, badge: 'Limited', image: 'https://picsum.photos/seed/bh-p4/600/700' },
  { id: 5, name: 'Ivory Garden Mix', price: 58, rating: 4, image: 'https://picsum.photos/seed/bh-p5/600/700' },
  { id: 6, name: 'Champagne Rose Box', price: 95, oldPrice: 120, rating: 5, badge: 'Best Seller', image: 'https://picsum.photos/seed/bh-p6/600/700' },
  { id: 7, name: 'Wildflower Whisper', price: 47, rating: 4, image: 'https://picsum.photos/seed/bh-p7/600/700' },
  { id: 8, name: 'Midnight Tulip Set', price: 71, rating: 5, image: 'https://picsum.photos/seed/bh-p8/600/700' },
];

export const OCCASIONS = [
  { id: 'weddings', name: 'Weddings', image: 'https://picsum.photos/seed/bh-wed/700/500' },
  { id: 'anniversaries', name: 'Anniversaries', image: 'https://picsum.photos/seed/bh-anniv/700/500' },
  { id: 'birthdays', name: 'Birthdays', image: 'https://picsum.photos/seed/bh-bday/700/500' },
  { id: 'sympathy', name: 'Sympathy', image: 'https://picsum.photos/seed/bh-sym/700/500' },
  { id: 'corporate', name: 'Corporate Events', image: 'https://picsum.photos/seed/bh-corp/700/500' },
  { id: 'just-because', name: 'Just Because', image: 'https://picsum.photos/seed/bh-jb/700/500' },
];

export const GALLERY_IMAGES = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/seed/bh-gallery-${i + 1}/700/${i % 3 === 0 ? 900 : i % 3 === 1 ? 700 : 800}`,
  caption: ['Studio Arrangement', 'Wedding Florals', 'Seasonal Bouquet', 'Table Centerpiece'][i % 4],
}));

export const TESTIMONIALS = [
  { id: 1, name: 'Amara Perera', role: 'Colombo', rating: 5, quote: 'The bouquet looked even more stunning in person than in the photos. Every petal was fresh and the arrangement felt truly hand-crafted.', avatarSeed: 'amara' },
  { id: 2, name: 'Nathan Cole', role: 'Melbourne', rating: 5, quote: 'I ordered for my anniversary and the delivery was on time down to the hour. My wife was speechless.', avatarSeed: 'nathan' },
  { id: 3, name: 'Priya Nair', role: 'Singapore', rating: 4, quote: 'Beautiful packaging and the flowers lasted almost two weeks. Will absolutely order again for the next occasion.', avatarSeed: 'priya' },
  { id: 4, name: 'Daniel Fernando', role: 'Kandy', rating: 5, quote: 'Ordered a sympathy arrangement on short notice and the team made it effortless. Genuinely thoughtful service.', avatarSeed: 'daniel' },
  { id: 5, name: 'Isabelle Wright', role: 'London', rating: 5, quote: 'The most elegant floral arrangement I have ever received. Worth every penny for a special occasion.', avatarSeed: 'isabelle' },
];

// Placeholder catalog data - no products API exists yet. Swap SHOP_PRODUCTS
// for a real fetch once the backend product endpoints are built; every
// component that consumes this data reads plain product objects, so the
// shape below (id, name, price, category, occasion, flowerType, inStock,
// rating, image, createdAt, featured) is the contract the real API should
// eventually match.

export const FLOWER_TYPES = [
  { id: 'rose', name: 'Rose' },
  { id: 'peony', name: 'Peony' },
  { id: 'orchid', name: 'Orchid' },
  { id: 'tulip', name: 'Tulip' },
  { id: 'lily', name: 'Lily' },
  { id: 'sunflower', name: 'Sunflower' },
  { id: 'mixed', name: 'Mixed' },
];

export const SHOP_PRODUCTS = [
  { id: 1, name: 'Velvet Rose Bouquet', price: 89, oldPrice: 110, rating: 5, badge: 'Best Seller', image: 'https://picsum.photos/seed/bh-shop-1/600/750', category: 'roses', occasion: 'anniversaries', flowerType: 'rose', inStock: true, featured: true, createdAt: '2026-06-01' },
  { id: 2, name: 'Blush Peony Bundle', price: 76, rating: 5, badge: 'New', image: 'https://picsum.photos/seed/bh-shop-2/600/750', category: 'peonies', occasion: 'birthdays', flowerType: 'peony', inStock: true, featured: true, createdAt: '2026-07-10' },
  { id: 3, name: 'Lavender Dream Vase', price: 64, rating: 4, image: 'https://picsum.photos/seed/bh-shop-3/600/750', category: 'bouquets', occasion: 'just-because', flowerType: 'mixed', inStock: true, featured: false, createdAt: '2026-05-14' },
  { id: 4, name: 'Golden Orchid Elegance', price: 132, rating: 5, badge: 'Limited', image: 'https://picsum.photos/seed/bh-shop-4/600/750', category: 'orchids', occasion: 'corporate', flowerType: 'orchid', inStock: false, featured: true, createdAt: '2026-04-22' },
  { id: 5, name: 'Ivory Garden Mix', price: 58, rating: 4, image: 'https://picsum.photos/seed/bh-shop-5/600/750', category: 'bouquets', occasion: 'sympathy', flowerType: 'lily', inStock: true, featured: false, createdAt: '2026-03-30' },
  { id: 6, name: 'Champagne Rose Box', price: 95, oldPrice: 120, rating: 5, badge: 'Best Seller', image: 'https://picsum.photos/seed/bh-shop-6/600/750', category: 'roses', occasion: 'weddings', flowerType: 'rose', inStock: true, featured: true, createdAt: '2026-06-18' },
  { id: 7, name: 'Wildflower Whisper', price: 47, rating: 4, image: 'https://picsum.photos/seed/bh-shop-7/600/750', category: 'bouquets', occasion: 'just-because', flowerType: 'mixed', inStock: true, featured: false, createdAt: '2026-02-11' },
  { id: 8, name: 'Midnight Tulip Set', price: 71, rating: 5, image: 'https://picsum.photos/seed/bh-shop-8/600/750', category: 'bouquets', occasion: 'birthdays', flowerType: 'tulip', inStock: true, featured: false, createdAt: '2026-07-02' },
  { id: 9, name: 'Sunlit Sunflower Jar', price: 39, rating: 4, image: 'https://picsum.photos/seed/bh-shop-9/600/750', category: 'bouquets', occasion: 'just-because', flowerType: 'sunflower', inStock: true, featured: false, createdAt: '2026-01-20' },
  { id: 10, name: 'Royal White Orchid', price: 148, rating: 5, badge: 'Premium', image: 'https://picsum.photos/seed/bh-shop-10/600/750', category: 'orchids', occasion: 'corporate', flowerType: 'orchid', inStock: true, featured: true, createdAt: '2026-06-25' },
  { id: 11, name: 'Petite Peony Posy', price: 52, rating: 4, image: 'https://picsum.photos/seed/bh-shop-11/600/750', category: 'peonies', occasion: 'birthdays', flowerType: 'peony', inStock: false, featured: false, createdAt: '2026-03-05' },
  { id: 12, name: 'Eternal Lily Arrangement', price: 84, rating: 5, image: 'https://picsum.photos/seed/bh-shop-12/600/750', category: 'bouquets', occasion: 'sympathy', flowerType: 'lily', inStock: true, featured: false, createdAt: '2026-05-29' },
  { id: 13, name: 'Rose Gold Anniversary Set', price: 156, oldPrice: 180, rating: 5, badge: 'Best Seller', image: 'https://picsum.photos/seed/bh-shop-13/600/750', category: 'gifts', occasion: 'anniversaries', flowerType: 'rose', inStock: true, featured: true, createdAt: '2026-07-15' },
  { id: 14, name: 'Potted Orchid Elegance', price: 68, rating: 4, image: 'https://picsum.photos/seed/bh-shop-14/600/750', category: 'plants', occasion: 'corporate', flowerType: 'orchid', inStock: true, featured: false, createdAt: '2026-04-08' },
  { id: 15, name: 'Blushing Tulip Trio', price: 44, rating: 4, image: 'https://picsum.photos/seed/bh-shop-15/600/750', category: 'bouquets', occasion: 'just-because', flowerType: 'tulip', inStock: true, featured: false, createdAt: '2026-02-27' },
  { id: 16, name: 'Grand Wedding Centerpiece', price: 210, rating: 5, badge: 'Premium', image: 'https://picsum.photos/seed/bh-shop-16/600/750', category: 'bouquets', occasion: 'weddings', flowerType: 'mixed', inStock: true, featured: true, createdAt: '2026-06-30' },
  { id: 17, name: 'Golden Sunflower Bunch', price: 41, rating: 3, image: 'https://picsum.photos/seed/bh-shop-17/600/750', category: 'bouquets', occasion: 'birthdays', flowerType: 'sunflower', inStock: true, featured: false, createdAt: '2026-01-09' },
  { id: 18, name: 'Serenity Lily Vase', price: 79, rating: 4, image: 'https://picsum.photos/seed/bh-shop-18/600/750', category: 'bouquets', occasion: 'sympathy', flowerType: 'lily', inStock: false, featured: false, createdAt: '2026-03-18' },
  { id: 19, name: 'Classic Red Rose Dozen', price: 99, rating: 5, badge: 'Best Seller', image: 'https://picsum.photos/seed/bh-shop-19/600/750', category: 'roses', occasion: 'anniversaries', flowerType: 'rose', inStock: true, featured: true, createdAt: '2026-07-05' },
  { id: 20, name: 'Garden Gift Hamper', price: 124, rating: 5, image: 'https://picsum.photos/seed/bh-shop-20/600/750', category: 'gifts', occasion: 'corporate', flowerType: 'mixed', inStock: true, featured: false, createdAt: '2026-05-02' },
];

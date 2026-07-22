import mongoose from 'mongoose';

const CATEGORY_VALUES = ['roses', 'peonies', 'orchids', 'bouquets', 'plants', 'gifts'];
const OCCASION_VALUES = [
  'weddings',
  'anniversaries',
  'birthdays',
  'sympathy',
  'corporate',
  'just-because',
];
const FLOWER_TYPE_VALUES = ['rose', 'peony', 'orchid', 'tulip', 'lily', 'sunflower', 'mixed'];
const BADGE_VALUES = ['Best Seller', 'New', 'Limited', 'Premium'];

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [120, 'Name must be under 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description must be under 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    oldPrice: {
      type: Number,
      min: [0, 'Old price cannot be negative'],
      validate: {
        validator: function (value) {
          return value == null || value > this.price;
        },
        message: 'Old price must be greater than the current price',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: { values: CATEGORY_VALUES, message: 'Invalid category' },
    },
    occasion: {
      type: String,
      required: [true, 'Occasion is required'],
      enum: { values: OCCASION_VALUES, message: 'Invalid occasion' },
    },
    flowerType: {
      type: String,
      required: [true, 'Flower type is required'],
      enum: { values: FLOWER_TYPE_VALUES, message: 'Invalid flower type' },
    },
    images: {
      type: [imageSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one product image is required',
      },
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      enum: { values: BADGE_VALUES, message: 'Invalid badge' },
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

productSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

productSchema.virtual('discountPercent').get(function () {
  if (!this.oldPrice) return 0;
  return Math.round((1 - this.price / this.oldPrice) * 100);
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

productSchema.pre('save', async function () {
  if (!this.isModified('name')) return;

  const baseSlug = slugify(this.name);
  let candidate = baseSlug;
  let counter = 1;

  const Product = this.constructor;
  while (await Product.exists({ slug: candidate, _id: { $ne: this._id } })) {
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }

  this.slug = candidate;
});

productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, occasion: 1, flowerType: 1 });
productSchema.index({ price: 1 });

export const CATEGORY_OPTIONS = CATEGORY_VALUES;
export const OCCASION_OPTIONS = OCCASION_VALUES;
export const FLOWER_TYPE_OPTIONS = FLOWER_TYPE_VALUES;
export const BADGE_OPTIONS = BADGE_VALUES;

const Product = mongoose.model('Product', productSchema);
export default Product;

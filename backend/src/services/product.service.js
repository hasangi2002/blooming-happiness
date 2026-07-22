import Product from '../models/Product.model.js';
import cloudinary from '../config/cloudinary.js';
import { AppError } from '../utils/appError.js';

const uploadImageToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'blooming-happiness/products' },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(fileBuffer);
  });

const uploadProductImages = async (files) => {
  const uploads = files.map((file) => uploadImageToCloudinary(file.buffer));
  return Promise.all(uploads);
};

const deleteProductImages = async (images) => {
  const deletions = images.map((img) => cloudinary.uploader.destroy(img.publicId));
  await Promise.allSettled(deletions);
};

export const createProduct = async ({ body, files, userId }) => {
  if (!files || files.length === 0) {
    throw new AppError('At least one product image is required', 400);
  }

  const images = await uploadProductImages(files);

  const product = await Product.create({
    ...body,
    images,
    createdBy: userId,
  });

  return product;
};

const buildProductQuery = (queryParams) => {
  const { search, category, occasion, flowerType, inStock, minPrice, maxPrice } = queryParams;
  const query = { isActive: true };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (category) query.category = category;
  if (occasion) query.occasion = occasion;
  if (flowerType) query.flowerType = flowerType;
  if (inStock === 'true') query.stock = { $gt: 0 };
  if (inStock === 'false') query.stock = { $lte: 0 };

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  return query;
};

const SORT_MAP = {
  featured: { isFeatured: -1, createdAt: -1 },
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  newest: { createdAt: -1 },
  rating: { rating: -1 },
};

export const listProducts = async (queryParams) => {
  const page = Math.max(1, Number(queryParams.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(queryParams.limit) || 12));
  const sortKey = SORT_MAP[queryParams.sort] ? queryParams.sort : 'featured';

  const query = buildProductQuery(queryParams);

  const [items, total] = await Promise.all([
    Product.find(query)
      .sort(SORT_MAP[sortKey])
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

export const getProductBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isActive: true });
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

export const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found', 404);
  return product;
};

export const updateProduct = async ({ id, body, files }) => {
  const product = await getProductById(id);

  if (body.removeImages) {
    let removeIds;
    try {
      removeIds = JSON.parse(body.removeImages);
    } catch {
      removeIds = String(body.removeImages)
        .split(',')
        .map((s) => s.trim());
    }

    const imagesToRemove = product.images.filter((img) => removeIds.includes(img.publicId));
    if (imagesToRemove.length > 0) {
      await deleteProductImages(imagesToRemove);
      product.images = product.images.filter((img) => !removeIds.includes(img.publicId));
    }
    delete body.removeImages;
  }

  if (files && files.length > 0) {
    const newImages = await uploadProductImages(files);
    product.images.push(...newImages);
  }

  Object.assign(product, body);
  await product.save();
  return product;
};

export const deleteProduct = async (id) => {
  const product = await getProductById(id);
  // Soft delete: keeps the product document intact (and its Cloudinary images)
  // so existing orders that reference it still resolve correctly. It simply
  // stops appearing in public listings via the isActive:true filter above.
  product.isActive = false;
  await product.save({ validateBeforeSave: false });
  return product;
};

export const getBestSellers = async (limit = 8) =>
  Product.find({ isActive: true, isBestSeller: true })
    .sort({ rating: -1 })
    .limit(Number(limit));

export const getFeaturedProducts = async (limit = 8) =>
  Product.find({ isActive: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

export const getLatestProducts = async (limit = 8) =>
  Product.find({ isActive: true }).sort({ createdAt: -1 }).limit(Number(limit));

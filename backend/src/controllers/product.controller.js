import * as productService from '../services/product.service.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct({
      body: req.body,
      files: req.files,
      userId: req.user.id,
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { items, pagination } = await productService.listProducts(req.query);
    res.status(200).json({ success: true, results: items.length, pagination, data: items });
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlug(req.params.slug);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct({
      id: req.params.id,
      body: req.body,
      files: req.files,
    });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getBestSellers = async (req, res, next) => {
  try {
    const products = await productService.getBestSellers(req.query.limit);
    res.status(200).json({ success: true, results: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await productService.getFeaturedProducts(req.query.limit);
    res.status(200).json({ success: true, results: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

export const getLatestProducts = async (req, res, next) => {
  try {
    const products = await productService.getLatestProducts(req.query.limit);
    res.status(200).json({ success: true, results: products.length, data: products });
  } catch (error) {
    next(error);
  }
};

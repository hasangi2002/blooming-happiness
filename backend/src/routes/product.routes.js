import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import {
  createProductValidator,
  updateProductValidator,
} from '../validators/product.validator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { uploadProductImages } from '../middleware/upload.middleware.js';

const router = Router();

// Public routes - specific paths must come before the generic "/:id"
// route below, or Express will try to match "best-sellers" as an :id value.
router.get('/best-sellers', productController.getBestSellers);
router.get('/featured', productController.getFeaturedProducts);
router.get('/latest', productController.getLatestProducts);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin-only routes
router.post(
  '/',
  protect,
  restrictTo('admin'),
  uploadProductImages,
  createProductValidator,
  validateRequest,
  productController.createProduct
);

router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  uploadProductImages,
  updateProductValidator,
  validateRequest,
  productController.updateProduct
);

router.delete('/:id', protect, restrictTo('admin'), productController.deleteProduct);

export default router;

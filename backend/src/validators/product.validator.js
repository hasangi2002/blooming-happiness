import { body } from 'express-validator';
import {
  CATEGORY_OPTIONS,
  OCCASION_OPTIONS,
  FLOWER_TYPE_OPTIONS,
  BADGE_OPTIONS,
} from '../models/Product.model.js';

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 120 })
    .withMessage('Name must be 2-120 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 2000 })
    .withMessage('Description must be under 2000 characters'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
    .toFloat(),
  body('oldPrice').optional({ checkFalsy: true }).isFloat({ min: 0 }).toFloat(),
  body('category').notEmpty().isIn(CATEGORY_OPTIONS).withMessage('Invalid category'),
  body('occasion').notEmpty().isIn(OCCASION_OPTIONS).withMessage('Invalid occasion'),
  body('flowerType').notEmpty().isIn(FLOWER_TYPE_OPTIONS).withMessage('Invalid flower type'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer')
    .toInt(),
  body('badge').optional({ checkFalsy: true }).isIn(BADGE_OPTIONS).withMessage('Invalid badge'),
  body('isFeatured').optional().isBoolean().toBoolean(),
  body('isBestSeller').optional().isBoolean().toBoolean(),
];

export const updateProductValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 120 }),
  body('description').optional().trim().isLength({ max: 2000 }),
  body('price').optional().isFloat({ min: 0 }).toFloat(),
  body('oldPrice').optional({ checkFalsy: true }).isFloat({ min: 0 }).toFloat(),
  body('category').optional().isIn(CATEGORY_OPTIONS).withMessage('Invalid category'),
  body('occasion').optional().isIn(OCCASION_OPTIONS).withMessage('Invalid occasion'),
  body('flowerType').optional().isIn(FLOWER_TYPE_OPTIONS).withMessage('Invalid flower type'),
  body('stock').optional().isInt({ min: 0 }).toInt(),
  body('badge').optional({ checkFalsy: true }).isIn(BADGE_OPTIONS).withMessage('Invalid badge'),
  body('isFeatured').optional().isBoolean().toBoolean(),
  body('isBestSeller').optional().isBoolean().toBoolean(),
];

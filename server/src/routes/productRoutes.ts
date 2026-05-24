import express from 'express';
import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:idOrSlug', getProduct);

// Admin Routes
router.post('/', protect, restrictTo('ADMIN'), createProduct);
router.put('/:id', protect, restrictTo('ADMIN'), updateProduct);
router.delete('/:id', protect, restrictTo('ADMIN'), deleteProduct);

export default router;

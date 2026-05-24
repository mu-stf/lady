import express from 'express';
import { upload, uploadImage } from '../controllers/uploadController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, restrictTo('ADMIN'), upload.single('image'), uploadImage);

export default router;

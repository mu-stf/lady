import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  // Optimize: Convert to buffer and stream
  const b64 = Buffer.from(req.file.buffer).toString('base64');
  let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
  
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'lady2-products',
  });

  res.status(200).json({
    status: 'success',
    data: {
      url: result.secure_url,
      public_id: result.public_id,
    },
  });
});

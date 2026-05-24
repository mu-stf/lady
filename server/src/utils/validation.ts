import { z } from 'zod';

// Auth Validation
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Product Validation
export const createProductSchema = z.object({
  nameAr: z.string().min(2),
  nameEn: z.string().min(2),
  descriptionAr: z.string().min(10),
  descriptionEn: z.string().min(10),
  price: z.number().positive(),
  categoryId: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isVisible: z.boolean().optional(),
  images: z.array(z.string().url()).optional(), // Array of image URLs
  variants: z.array(z.object({
    sku: z.string().min(2),
    priceDiff: z.number().default(0),
    stock: z.number().int().min(0),
    options: z.array(z.object({
      nameAr: z.string(),
      nameEn: z.string(),
      valueAr: z.string(),
      valueEn: z.string()
    }))
  })).optional()
});

export const updateProductSchema = createProductSchema.partial();

// Order Validation
export const createOrderSchema = z.object({
  guestName: z.string().min(2).optional(),
  guestPhone: z.string().min(10).optional(), // Generic phone validation
  guestAddress: z.string().min(5).optional(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string().optional(),
    quantity: z.number().int().positive()
  })).min(1, 'Order must contain at least one item')
}).refine(data => {
  // If no user is logged in (checked in controller/middleware), guest fields are required
  // But strictly via Zod, we might want to enforce them if userId is missing.
  // For now, keep optional here and enforce logic in controller based on auth state.
  return true; 
});

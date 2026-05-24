import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { createOrderSchema } from '../utils/validation';

export const createOrder = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const validation = createOrderSchema.safeParse(req.body);
  if (!validation.success) {
    return next(new AppError(validation.error.errors[0].message, 400));
  }

  const { items, guestName, guestPhone, guestAddress } = validation.data;
  const user = req.user; // Might be undefined if guest

  // Identify user or guest
  if (!user && (!guestName || !guestPhone || !guestAddress)) {
    return next(new AppError('Guest details required for checkout', 400));
  }

  let total = 0;
  const orderItemsData = [];

  // Calculate total and prepare items
  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) {
        return next(new AppError(`Product ${item.productId} not found`, 404));
    }
    
    let price = product.price;

    if (item.variantId) {
        const variant = await prisma.variant.findUnique({ where: { id: item.variantId } });
        if (!variant) return next(new AppError(`Variant ${item.variantId} not found`, 404));
        price += variant.priceDiff;
    }

    total += price * item.quantity;
    orderItemsData.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: price
    });
  }

  const order = await prisma.order.create({
    data: {
      userId: user ? user.id : null,
      guestName: user ? user.name : guestName,
      guestPhone: guestPhone, // Even authorized users might provide phone
      guestAddress: guestAddress, // Even authorized users provide address
      total,
      status: 'PENDING',
      items: {
        create: orderItemsData
      }
    },
    include: {
        items: true
    }
  });

  res.status(201).json({
    status: 'success',
    data: { order },
  });
});

export const getAllOrders = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    // If Admin, return all. If User, return own.
    const where: any = {};
    if (req.user.role !== 'ADMIN') {
        where.userId = req.user.id;
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { items: true }
    });

    const total = await prisma.order.count({ where });

    res.status(200).json({
        status: 'success',
        results: orders.length,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        data: { orders }
    });
});

export const getOrder = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const order = await prisma.order.findUnique({
        where: { id: req.params.id },
        include: { items: { include: { product: true } } }
    });

    if (!order) return next(new AppError('Order not found', 404));

    // Access control
    if (req.user.role !== 'ADMIN' && order.userId !== req.user.id) {
        return next(new AppError('Not authorized to view this order', 403));
    }

    res.status(200).json({
        status: 'success',
        data: { order }
    });
});

export const updateOrderStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
    
    // Validate status enum
    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
        return next(new AppError('Invalid status', 400));
    }

    const order = await prisma.order.update({
        where: { id: req.params.id },
        data: { status }
    });

    res.status(200).json({
        status: 'success',
        data: { order }
    });
});

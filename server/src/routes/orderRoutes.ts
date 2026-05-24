import express from 'express';
import { createOrder, getAllOrders, getOrder, updateOrderStatus } from '../controllers/orderController';
import { protect, restrictTo } from '../middlewares/authMiddleware';

const router = express.Router();

// Allow create for both guests (public) and authenticated users
// However, my code expects `req.user` if logged in.
// I need a middleware that `optionally` decodes token but doesn't throw error if missing.
// For now, I'll separate them or keep it open.
// Actually, `createOrder` logic handles guest/user. 
// But `protect` throws error if no token.
// I'll make a custom middleware `identifyUser` for createOrder, or just use protect for users.
// To keep it simple: Public route. Frontend sends token if available? NO.
// Standard pattern: 
// POST / -> Open. If Header is present, decode it. if not, Guest.
// I'll stick to a simple strategy:
// Use a middleware that checks for token but doesn't require it?
// Or just two endpoints? No.
// Let's implement `optionalAuth` in `authMiddleware` briefly or just inline it in controller? 
// Better: Add a new middleware `checkAuth`.

// Let's create a new optional middleware quickly by creating a separate route file section?
// Or I can just check headers in controller manually in lines 13-17 of orderController?
// Wait, `req.user` is added by `protect`. `createOrder` lines 9-10 check `req.user`.
// So I need a middleware that populates `req.user` if token exists, but doesn't error.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

const optionalAuth = async (req: any, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
            const currentUser = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (currentUser) req.user = currentUser;
        } catch (err) {
            // Token invalid - treat as guest
        }
    }
    next();
};

router.post('/', optionalAuth, createOrder);

// All other routes require auth
router.use(protect);
router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', restrictTo('ADMIN'), updateOrderStatus);

export default router;

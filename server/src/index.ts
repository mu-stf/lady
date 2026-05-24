import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';
import AppError from './utils/AppError';

// Load env vars
dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoutes';
import orderRouter from './routes/orderRoutes';
import uploadRouter from './routes/uploadRoutes';

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Server is running' });
});

// 404 Handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

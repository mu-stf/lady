import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { registerSchema, loginSchema } from '../utils/validation';

const signToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '90d',
  });
};

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return next(new AppError(validation.error.errors[0].message, 400));
  }

  const { name, email, password } = validation.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'CUSTOMER', // Default role
    },
  });

  const token = signToken(newUser.id, newUser.role);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return next(new AppError(validation.error.errors[0].message, 400));
  }

  const { email, password } = validation.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user.id, user.role);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

export const getMe = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  // user is set by protect middleware
  const user = req.user;
  
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean DB
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.variantOption.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@lady2.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: hashedPassword,
      role: 'CUSTOMER',
    },
  });

  console.log('✅ Users created');

  // 3. Create Products
  const products = [
    {
      nameAr: 'فستان سهرة فاخر',
      nameEn: 'Luxury Evening Dress',
      descriptionAr: 'فستان سهرة أنيق مصنوع من الحرير الطبيعي، مثالي للمناسبات الخاصة.',
      descriptionEn: 'Elegant evening dress made of natural silk, perfect for special occasions.',
      slug: 'luxury-evening-dress',
      price: 150000,
      categoryId: 'dresses',
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1650000000/dress1.jpg',
        'https://res.cloudinary.com/demo/image/upload/v1650000000/dress2.jpg'
      ],
      variants: [
        { sku: 'LED-S-RED', priceDiff: 0, stock: 10, size: 'S', colorAr: 'أحمر', colorEn: 'Red' },
        { sku: 'LED-M-RED', priceDiff: 0, stock: 15, size: 'M', colorAr: 'أحمر', colorEn: 'Red' },
        { sku: 'LED-L-RED', priceDiff: 5000, stock: 5, size: 'L', colorAr: 'أحمر', colorEn: 'Red' }
      ]
    },
    {
      nameAr: 'عباية ملكية سوداء',
      nameEn: 'Royal Black Abaya',
      descriptionAr: 'عباية سوداء فاخرة بتطريز ذهبي يدوي.',
      descriptionEn: 'Luxurious black abaya with handmade gold embroidery.',
      slug: 'royal-black-abaya',
      price: 85000,
      categoryId: 'abayas',
      images: [
        'https://res.cloudinary.com/demo/image/upload/v1650000000/abaya1.jpg'
      ],
      variants: [
        { sku: 'RBA-FREE', priceDiff: 0, stock: 50, size: 'Free Size', colorAr: 'أسود', colorEn: 'Black' }
      ]
    }
  ];

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        descriptionAr: p.descriptionAr,
        descriptionEn: p.descriptionEn,
        slug: p.slug,
        price: p.price,
        categoryId: p.categoryId,
        images: {
          create: p.images.map((url, idx) => ({ url, order: idx }))
        }
      }
    });

    for (const v of p.variants) {
      await prisma.variant.create({
        data: {
          productId: product.id,
          sku: v.sku,
          priceDiff: v.priceDiff,
          stock: v.stock,
          options: {
            create: [
              { nameAr: 'المقاس', nameEn: 'Size', valueAr: v.size, valueEn: v.size },
              { nameAr: 'اللون', nameEn: 'Color', valueAr: v.colorAr, valueEn: v.colorEn }
            ]
          }
        }
      });
    }
  }

  console.log('✅ Products created');
  console.log('🌱 Seed finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data (Enhanced with 2nd image for hover)
const PRODUCTS = [
  { 
    id: '1', 
    slug: 'luxury-evening-dress', 
    nameEn: 'Luxury Evening Dress', 
    nameAr: 'فستان سهرة فاخر', 
    price: 150000, 
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2024&auto=format&fit=crop',
    category: 'Dresses'
  },
  { 
    id: '2', 
    slug: 'royal-black-abaya', 
    nameEn: 'Royal Black Abaya', 
    nameAr: 'عباية ملكية سوداء', 
    price: 85000, 
    image: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?q=80&w=1935&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
    category: 'Abayas'
  },
  { 
    id: '3', 
    slug: 'silk-scarf', 
    nameEn: 'Silk Scarf', 
    nameAr: 'وشاح حريري', 
    price: 25000, 
    image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2000&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop',
    category: 'Accessories'
  },
  { 
    id: '4', 
    slug: 'luxury-bag', 
    nameEn: 'Luxury Leather Bag', 
    nameAr: 'حقيبة جلدية فاخرة', 
    price: 45000, 
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2076&auto=format&fit=crop',
    category: 'Accessories'
  },
];

const ProductCard = ({ product, lang }: { product: any, lang: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link 
            to={`/products/${product.slug}`} 
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 mb-4 relative">
                <motion.img 
                    src={product.image} 
                    alt={product[`name${lang}`]} 
                    className="h-full w-full object-cover absolute inset-0 z-10"
                    animate={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                />
                {product.hoverImage && (
                    <motion.img 
                        src={product.hoverImage} 
                        alt={product[`name${lang}`]} 
                        className="h-full w-full object-cover absolute inset-0 z-0"
                        // It stays visible behind, revealed when top fades out
                    />
                )}
                
                {/* Quick Add Button or Badges could go here */}
                <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <Button className="w-full bg-white text-black hover:bg-neutral-100 shadow-lg">
                        View Details
                    </Button>
                </div>
            </div>
            
            <div className="space-y-1 text-center">
                <h3 className="text-base font-medium tracking-tight group-hover:text-primary transition-colors">
                    {product[`name${lang}`]}
                </h3>
                <p className="text-primary font-bold text-lg">{formatPrice(product.price)}</p>
            </div>
        </Link>
    );
};

export default function Products() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'Ar' : 'En';
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');

  useEffect(() => {
    setActiveCategory(categoryParam || 'All');
  }, [categoryParam]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'All') {
        setSearchParams({});
    } else {
        setSearchParams({ category: cat });
    }
  };

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="container py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('nav.products')}</h1>
        
        {/* Filters */}
        <div className="flex gap-2">
            {['All', 'Abayas', 'Dresses', 'Accessories'].map((cat) => (
                <button 
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-6 py-2 rounded-full border transition-all text-sm font-medium ${
                        activeCategory === cat 
                        ? 'bg-black text-white border-black' 
                        : 'border-neutral-200 hover:border-black hover:bg-neutral-50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
      >
        <AnimatePresence>
            {filteredProducts.map((product) => (
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={product.id}
            >
                <ProductCard product={product} lang={lang} />
            </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

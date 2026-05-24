import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

// Mock Fetch (replace with API)
const PRODUCT = {
  id: '1',
  slug: 'luxury-evening-dress',
  nameEn: 'Luxury Evening Dress',
  nameAr: 'فستان سهرة فاخر',
  descriptionEn: 'An elegant evening dress made from fine silk.',
  descriptionAr: 'فستان سهرة أنيق مصنوع من الحرير الفاخر.',
  price: 150000,
  images: [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2083&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2024&auto=format&fit=crop'
  ],
  variants: [
    { id: 'v1', size: 'S', color: 'Red' },
    { id: 'v2', size: 'M', color: 'Red' },
    { id: 'v3', size: 'L', color: 'Red' }
  ]
};

export default function ProductDetails() {
  useParams(); // Use slug to fetch
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'ar' ? 'Ar' : 'En';
  const addItem = useCartStore(state => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0].id);

  const handleAddToCart = () => {
    addItem({
      productId: PRODUCT.id,
      variantId: selectedVariant,
      nameAr: PRODUCT.nameAr,
      nameEn: PRODUCT.nameEn,
      price: PRODUCT.price,
      image: PRODUCT.images[0],
      quantity: 1
    });
  };

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="grid gap-4">
          <div className="aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden">
            <img src={PRODUCT.images[0]} alt="Main" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {PRODUCT.images.map((img, i) => (
                <div key={i} className="aspect-square bg-neutral-100 rounded-md overflow-hidden cursor-pointer">
                    <img src={img} className="w-full h-full object-cover hover:opacity-80" />
                </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
           <h1 className="text-4xl font-bold">{PRODUCT[`name${lang}`]}</h1>
           <p className="text-2xl font-bold text-primary">{formatPrice(PRODUCT.price)}</p>
           
           <p className="text-neutral-600 leading-relaxed">
             {PRODUCT[`description${lang}`]}
           </p>

           <div className="space-y-4">
              <h3 className="font-medium">{t('common.size', 'Size')}</h3>
              <div className="flex gap-2">
                 {PRODUCT.variants.map((v) => (
                    <Button 
                        key={v.id} 
                        variant={selectedVariant === v.id ? 'default' : 'outline'}
                        onClick={() => setSelectedVariant(v.id)}
                    >
                        {v.size}
                    </Button>
                 ))}
              </div>
           </div>

           <Button size="lg" className="w-full md:w-auto px-12" onClick={handleAddToCart}>
              {t('common.addToCart')}
           </Button>
        </div>
      </div>
    </div>
  );
}

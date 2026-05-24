
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { t, i18n } = useTranslation();
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const lang = i18n.language === 'ar' ? 'Ar' : 'En';

  if (items.length === 0) {
     return (
        <div className="container py-24 text-center">
           <h1 className="text-3xl font-bold mb-4">{t('cart.empty', 'Your cart is empty')}</h1>
           <Link to="/products">
             <Button>{t('common.shopNow', 'Shop Now')}</Button>
           </Link>
        </div>
     );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">{t('nav.cart')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Items */}
         <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 border rounded-lg">
                    <div className="h-24 w-24 bg-neutral-100 rounded-md overflow-hidden shrink-0">
                        <img src={item.image} alt={item[`name${lang}`]} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <h3 className="font-medium">{item[`name${lang}`]}</h3>
                            <button 
                                onClick={() => removeItem(item.productId, item.variantId)}
                                className="text-destructive hover:text-destructive/80"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2 border rounded-md">
                                <button className="px-2" onClick={() => updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))}>-</button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button className="px-2" onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}>+</button>
                            </div>
                            <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                    </div>
                </div>
            ))}
         </div>

         {/* Summary */}
         <div className="bg-neutral-50 p-6 rounded-lg h-fit space-y-4">
            <h2 className="text-xl font-bold">{t('common.summary', 'Order Summary')}</h2>
            <div className="flex justify-between text-lg font-bold border-t pt-4">
                <span>{t('common.total')}</span>
                <span>{formatPrice(total())}</span>
            </div>
            <Link to="/checkout">
                <Button className="w-full" size="lg">{t('common.checkout')}</Button>
            </Link>
         </div>
      </div>
    </div>
  );
}

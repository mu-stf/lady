import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const checkoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { total, clearCart, items } = useCartStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = async (data: CheckoutForm) => {
    // TODO: Send to backend
    console.log('Order Data:', { ...data, items, total: total() });
    
    // Simulate success
    setTimeout(() => {
        clearCart();
        navigate('/success');
    }, 1000);
  };

  if (items.length === 0) return <div>Cart empty</div>;

  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">{t('common.checkout')} (COD)</h1>
      
      <div className="grid gap-8">
        <div className="bg-neutral-50 p-6 rounded-lg">
             <h2 className="font-bold mb-4">{t('common.summary')}</h2>
             <p className="text-xl font-bold text-primary">{formatPrice(total())}</p>
             <p className="text-sm text-muted-foreground mt-2">Cash on Delivery (COD)</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.name', 'Full Name')}</label>
                <Input {...register('name')} placeholder="Name" />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.phone', 'Phone Number')}</label>
                <Input {...register('phone')} placeholder="07xxxxxxxxx" />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t('form.address', 'Address')}</label>
                <Input {...register('address')} placeholder="Baghdad, Street..." />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full mt-6">
                {t('common.placeOrder', 'Place Order')}
            </Button>
        </form>
      </div>
    </div>
  );
}

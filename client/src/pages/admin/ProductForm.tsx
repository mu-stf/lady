
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const productSchema = z.object({
  nameAr: z.string().min(2),
  nameEn: z.string().min(2),
  price: z.number().positive(),
  descriptionAr: z.string(),
  descriptionEn: z.string(),
});

type ProductForm = z.infer<typeof productSchema>;

export default function ProductForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<ProductForm>({
        resolver: zodResolver(productSchema)
    });

    const onSubmit = (data: ProductForm) => {
        console.log(data);
        // Simulate API
        navigate('/admin/products');
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-bold">Add Product</h1>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name (Arabic)</label>
                            <Input {...register('nameAr')} placeholder="اسم المنتج" dir="rtl" />
                            {errors.nameAr && <p className="text-red-500 text-xs">{errors.nameAr.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name (English)</label>
                            <Input {...register('nameEn')} placeholder="Product Name" />
                            {errors.nameEn && <p className="text-red-500 text-xs">{errors.nameEn.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price (IQD)</label>
                        <Input 
                            type="number" 
                            {...register('price', { valueAsNumber: true })} 
                            placeholder="150000" 
                        />
                        {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Description (Arabic)</label>
                            <textarea 
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                {...register('descriptionAr')} 
                                dir="rtl"
                                placeholder="وصف المنتج..."
                            />
                        </div>
                         <div className="space-y-2">
                            <label className="text-sm font-medium">Description (English)</label>
                            <textarea 
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                {...register('descriptionEn')} 
                                placeholder="Product description..."
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>Cancel</Button>
                        <Button type="submit">Save Product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock Data
const PRODUCTS = [
  { id: '1', nameEn: 'Luxury Evening Dress', price: 150000, stock: 30, category: 'Dresses' },
  { id: '2', nameEn: 'Royal Black Abaya', price: 85000, stock: 50, category: 'Abayas' },
];

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/products/new">
            <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
            </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b">
                <tr>
                    <th className="p-4 font-medium text-neutral-500">Name</th>
                    <th className="p-4 font-medium text-neutral-500">Category</th>
                    <th className="p-4 font-medium text-neutral-500">Price</th>
                    <th className="p-4 font-medium text-neutral-500">Stock</th>
                    <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {PRODUCTS.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50/50">
                        <td className="p-4 font-medium">{product.nameEn}</td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">{formatPrice(product.price)}</td>
                        <td className="p-4">{product.stock}</td>
                        <td className="p-4 text-right space-x-2">
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

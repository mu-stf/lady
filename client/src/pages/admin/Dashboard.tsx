import React from 'react';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// Mock Stats
const STATS = [
    { label: 'Total Sales', value: formatPrice(1500000), icon: DollarSign },
    { label: 'Total Orders', value: '45', icon: ShoppingCart },
    { label: 'Products', value: '12', icon: Package },
    { label: 'Customers', value: '89', icon: Users },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
                <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                        <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
}

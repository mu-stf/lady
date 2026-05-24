
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

// Mock Data
const ORDERS = [
  { id: '1', customer: 'Ali Ahmed', total: 155000, status: 'PENDING', date: '2024-03-01' },
  { id: '2', customer: 'Sara Hassan', total: 85000, status: 'DELIVERED', date: '2024-02-28' },
];

const STATUS_COLORS: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-purple-100 text-purple-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
};

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 border-b">
                <tr>
                    <th className="p-4 font-medium text-neutral-500">Order ID</th>
                    <th className="p-4 font-medium text-neutral-500">Customer</th>
                    <th className="p-4 font-medium text-neutral-500">Total</th>
                    <th className="p-4 font-medium text-neutral-500">Date</th>
                    <th className="p-4 font-medium text-neutral-500">Status</th>
                    <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/50">
                        <td className="p-4 font-medium">#{order.id}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4 font-bold">{formatPrice(order.total)}</td>
                        <td className="p-4 text-neutral-500">{order.date}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[order.status]}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Eye className="h-4 w-4" />
                                View
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

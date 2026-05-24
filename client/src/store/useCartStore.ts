import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  productId: string;
  variantId?: string;
  nameAr: string;
  nameEn: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        const existing = state.items.find(
          item => item.productId === newItem.productId && item.variantId === newItem.variantId
        );
        if (existing) {
          return {
            items: state.items.map(item =>
              (item.productId === newItem.productId && item.variantId === newItem.variantId)
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            )
          };
        }
        return { items: [...state.items, newItem] };
      }),
      removeItem: (pid, vid) => set((state) => ({
        items: state.items.filter(i => !(i.productId === pid && i.variantId === vid))
      })),
      updateQuantity: (pid, vid, qty) => set((state) => ({
        items: state.items.map(i => 
          (i.productId === pid && i.variantId === vid) ? { ...i, quantity: qty } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      total: () => {
        const items = get().items;
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      }
    }),
    { name: 'cart-storage' }
  )
);

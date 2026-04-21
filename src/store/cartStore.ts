import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  isDrawerOpen: boolean;
  items: CartItem[];
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  isDrawerOpen: false,
  items: [],
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  addToCart: (item) => set((state) => {
    const existingIndex = state.items.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      // Prevent direct state mutation by deeply copying the updated item
      const newItems = [...state.items];
      newItems[existingIndex] = { 
        ...newItems[existingIndex], 
        quantity: newItems[existingIndex].quantity + 1 
      };
      return { items: newItems, isDrawerOpen: true };
    }
    return { items: [...state.items, { ...item, quantity: 1 }], isDrawerOpen: true };
  }),
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(i => 
      i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
    )
  }))
}));

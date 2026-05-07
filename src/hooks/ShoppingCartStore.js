import { create } from 'zustand'
import { persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const ShoppingCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add or increment item quantity
      addItem: (product) => set((state) => {
        const existingItem = state.items.find((i) => i.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      // Remove or decrement item quantity
      removeItem: (productId) => set((state) => ({
        items: state.items
          .map((i) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
          .filter((i) => i.quantity > 0),
      })),

      clearCart: () => set({ items: [] }),

      // Calculated value: Total Price
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'shopping-cart-storage', // unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);


export default ShoppingCartStore;

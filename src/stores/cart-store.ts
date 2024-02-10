import { create } from "zustand";
import { ProductProps } from "../utils/data/products";
import * as cartInMemory from "./helpers/cart-in-memory";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      addProduct: (product: ProductProps) => {
        set((state) => ({
          products: cartInMemory.addProduct(state.products, product),
        }));
      },
      removeProduct: (id: string) => {
        set((state) => ({
          products: cartInMemory.removeProduct(state.products, id),
        }));
      },
      clearCart: () => {
        set({ products: [] });
      },
    }),
    {
      name: "nlw-expert:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

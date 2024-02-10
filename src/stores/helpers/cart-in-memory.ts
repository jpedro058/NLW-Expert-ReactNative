import { ProductProps } from "@/src/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function addProduct(
  product: ProductCartProps[],
  newProduct: ProductProps
) {
  const existingProduct = product.find((item) => item.id === newProduct.id);

  if (existingProduct) {
    return product.map((product) =>
      product.id === existingProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
  }

  return [...product, { ...newProduct, quantity: 1 }];
}

export function removeProduct(
  product: ProductCartProps[],
  productRemovedId: string
) {
  const updatedProducts = product.map((product) =>
    product.id === productRemovedId
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );

  return updatedProducts.filter((product) => product.quantity > 0);
}

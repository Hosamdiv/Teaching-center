import type { IProduct } from "../interfaces";

export const addToCart = (cartItem: IProduct[], productCart: IProduct) => {
  const exits = cartItem.find((item) => item.id === productCart.id);
  console.log(exits);
  if (exits) {
    return cartItem.map((item) =>
      item.id === productCart.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  return [...cartItem, { ...productCart, qty: 1 }];
};

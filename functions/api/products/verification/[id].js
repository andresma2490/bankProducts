import { products } from "../../data.js";

export function onRequestGet(context) {
  const { id } = context.params;
  const isAvailable = products.some((product) => product.id.toString() === id);
  return new Response(JSON.stringify(isAvailable));
}

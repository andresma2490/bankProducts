import { products } from "../data.js";

export function onRequestGet(context) {
  return new Response(JSON.stringify(products));
}

export async function onRequestPost(context) {
  const body = await context.request.json();
  const product = { ...body };
  products.push(product);
  return new Response(JSON.stringify({ data: product }));
}

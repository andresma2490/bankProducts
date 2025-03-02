import { products } from "../data.js";

export function onRequestGet(context) {
  const { id } = context.params;
  const product = products.find((product) => product.id.toString() === id);
  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(product));
}

export async function onRequestPut(context) {
  const { id } = context.params;
  const body = await context.request.json();
  const product = { ...body };
  const index = products.findIndex((product) => product.id.toString() === id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }
  products[index] = product;
  return new Response(JSON.stringify({ data: products[index] }));
}

export function onRequestDelete(context) {
  const { id } = context.params;
  const index = products.findIndex((product) => product.id.toString() === id);
  if (index === -1) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }
  products.splice(index, 1);
  return new Response(JSON.stringify({ data: products[index] }));
}

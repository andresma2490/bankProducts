import { products } from "../data.js";

export function onRequestGet(context) {
  const { id } = context.params;
  const ID = Number(id);
  const product = products.find((product) => product.id === ID);
  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(product));
}

export function onRequestPut(context) {
  const { id } = context.params;
  const ID = Number(id);
  const { name, description, logo, date_release } = context.request.body;
  const date_revision = new Date().toISOString();
  const index = products.findIndex((product) => product.id === ID);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }

  products[index] = {
    ...products[index],
    name,
    description,
    logo,
    date_release,
    date_revision,
  };
  return new Response(JSON.stringify({ data: products[index] }));
}

export function onRequestDelete(context) {
  const { id } = context.params;
  const ID = Number(id);
  const index = products.findIndex((product) => product.id === ID);
  if (index === -1) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }
  products.splice(index, 1);
  return new Response(JSON.stringify({ data: products[index] }));
}

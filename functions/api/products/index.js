import { products } from "../data.js";

export function onRequestGet(context) {
  return Response.json(products);
}

export function onRequestPost(context) {
  const { id, name, description, logo, date_release } = context.request.body;
  const date_revision = new Date().toISOString();
  const product = {
    id,
    name,
    description,
    logo,
    date_release,
    date_revision,
  };
  products.push(product);
  return new Response(JSON.stringify({ data: product }));
}

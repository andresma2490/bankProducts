async function setCORS(context) {
  const isLocal = context.env.ENV === "LOCAL";
  if (!isLocal) return context.next();

  const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const response = await context.next()

  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

async function setImg(context) {
  const method = context.request.method;
  if (method === "POST" || method === "PUT") {
    req.body.logo = "http://dummyimage.com/250x250.png/cc0000/ffffff";
  }
  return context.next();
}

export const onRequest = [setCORS, setImg];

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

  const response = await context.next();

  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

async function setImg(context) {
  const request = context.request
  const method = request.method;
  if (method === "POST" || method === "PUT") {
    const body = await request.json();
    body.logo = "http://dummyimage.com/166x66.png/f5df66/000000";

    const modifiedRequest = new Request(request, {
      body: JSON.stringify(body),
      headers: { ...request.headers, "Content-Type": "application/json" },
    });

    return context.next(modifiedRequest);
  }
  return context.next();
}

export const onRequest = [setCORS, setImg];

const data = require("./db.json");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(data);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.logo = "http://dummyimage.com/250x250.png/cc0000/ffffff";
  }
  next();
});

server.get("/products/verification/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).jsonp({ message: "Missing ID" });
  }
  const isAvailable = data.products.some(
    (product) => product.id.toString() === id,
  );
  return res.jsonp(isAvailable);
});

const port = process.env.port || 8080;

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});

const http = require("node:http");

const DEFAULT_USER = { username: "Carlos", password: 12345 };
const routes = {
  "/contact:get": (request, response) => {
    response.write("contact us page");

    return response.end();
  },
  "/login:post": async (request, response) => {
    for await (const user of request) {
      const body = JSON.parse(user)

      if (DEFAULT_USER.username !== body.username || DEFAULT_USER.password !== body.password) {
        response.writeHead(401, { "Contente-type": "text/plain" })
        response.write("Login failed")
        return response.end();
      }

      response.writeHead(200)
      response.write("Login as success")
      return response.end()
    }
  },
  default: (request, response) => {
    response.writeHead(404, { "Contente-type": "text/plain" });
    response.write("404");

    return response.end();
  },
};

const server = http.createServer((request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLocaleLowerCase()}`;

  if (routes[routeKey]) {
    return routes[routeKey](request, response);
  }

  return routes.default(request, response);
});

server.listen(3001, () => console.log("Api iniciada..."));

module.exports = { server };

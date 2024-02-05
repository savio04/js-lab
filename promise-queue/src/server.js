import http from "node:http"
import { routes } from "./routes.js"

async function getBody(request){
  return new Promise((resolve, reject) => {
    let rowBody = ""

    request.on("data", (chunk) => {
      rowBody += chunk.toString()
    })

    request.on("end", () => {
      resolve(rowBody ? JSON.parse(rowBody): {})
    })

    request.on("error", (error) => {
      reject(JSON.stringify(error))
    })
  })
}

async function listenRequest(request, response) {
  response.setHeader("Content-Type", "application/json");

  const body = await getBody(request) 
  Object.defineProperty(request, "body", { value: body })

  const route = routes.get(request.url)
  const controller = route?.get(request.method)

  if(route && controller) {
    return await controller(request, response)
  }

  return response.end("404")
}

const server = http.createServer(listenRequest)

server.listen(8080, () => {
  process.stdout.write("Api iniciada na porta 8080\n")
})

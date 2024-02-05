import { db } from "./db.js"
import { enqueue } from "./promiseQueue.js"

async function EnqueueRequest(request, response) {
  const promise = () => CreatePurchaseController(request, response)

  await enqueue(promise)
}

async function CreatePurchaseController(request, response) {
  const { body } = request

  const productQuery = await db.query(
    `SELECT * FROM products WHERE id=$1`,
    [body.product_id]
  )
  const product = productQuery.rows[0]

  if (product === undefined) {
    response.statusCode = 404


    const responseString = JSON.stringify({
      status: 404,
      error: "product not found"
    })

    return response.end(`${responseString}\n`)
  }

  if (product.stock === 0) {
    response.statusCode = 400

    const responseString = JSON.stringify({
      status: 400,
      error: "product not available"

    })

    return response.end(`${responseString}\n`)
  }

  const newStock = product.stock - 1

  const queryProduct = `UPDATE products SET stock = $1 WHERE id=$2`
  const valueProdut = [newStock, product.id]

  await db.query(queryProduct, valueProdut)

  const queryPurchase = `INSERT INTO purchases (product_id, user_id, value) values ($1, $2, $3)`
  const valuePurchase = [body.product_id, body.user_id, Number(product.value)]
  await db.query(queryPurchase, valuePurchase)

  return response.end(`ok\n`)
}

async function ListPurchasesController(request, response) {
  const purchases = await db.query(`SELECT *  from purchases`)
  return response.end(JSON.stringify(purchases.rows))
}

const controllersPurchases = new Map([
  ["POST", EnqueueRequest],
  ["GET", ListPurchasesController]
])


export const routes = new Map([
  ["/purchases", controllersPurchases],
])


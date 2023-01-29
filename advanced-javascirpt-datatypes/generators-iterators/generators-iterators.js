import { readFile, stat, readdir } from "node:fs/promises"
import assert from "node:assert"

function *main() {
  yield "Hello"
  yield "Teste"
}

const generator = main()

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false })
assert.deepStrictEqual(generator.next(), { value: "Teste", done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ["Hello", "Teste"])
assert.deepStrictEqual([...main()], ["Hello", "Teste"])

// async iterators

const urlInstance = new URL("./", import.meta.url)
const currentFilePath = `${urlInstance.pathname}/generators-iterators.js`
const currentFileDir = urlInstance.pathname

function *promisified() {
  yield readFile(currentFilePath, { encoding: "utf-8" })
  yield Promise.resolve("Hello promise")
}

async function *systemInfo() {
  const file = await readFile(currentFilePath, { encoding: "utf-8" })
  yield { file }

  const { size } = await stat(currentFilePath)
  yield { size }

  const readdirResult = await readdir(currentFileDir)
  yield { dir: readdirResult }
}


for await (const promise of systemInfo()) {
  console.log(promise)
}


//
const objectInteable = {
  full_name: "Jose",
  last_name: "Maria",
  age: 45,
  *[Symbol.iterator]() {
    for(const key in this) {
      yield this[key]
    }
  }
}

for(const obj of objectInteable) {
  console.log(obj)
}

//Saber mais sobre iterators: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Iteration_protocols
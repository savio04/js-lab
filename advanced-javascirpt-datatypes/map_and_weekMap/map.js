import assert from "node:assert";
//O tipo map é uma especialização do tipo Object, feito para usar em cenarios especificos
const myMap = new Map();

myMap.set("item", "value");
myMap.set(1, "teste");

const myMapWithConstructor = new Map([
  ["item", 1],
  ["call", "hello world"],
  ["apply", "call function"]
]);

assert.deepStrictEqual(myMapWithConstructor.get("item"), 1);
assert.deepStrictEqual(myMapWithConstructor.get("call"), "hello world");

//Em Objects as chaves só podem ser string ou Symbol (number acaba sendo convertido para string)
const obj = { id: 5 }
myMapWithConstructor.set(obj, { value: "show demais" })

assert.deepStrictEqual(myMapWithConstructor.get(obj), { value: "show demais" })

//Utilitarios
// - size
// - has
// - delete
// - clear

//size
assert.deepStrictEqual(myMapWithConstructor.size, 4)

//Verificar se uma propriedade existe
//Em object a forma correta de verificar se um propriedade existe é usando hasOwnProperty
//No map utilizamos o utilitario has

//has
assert.ok(myMapWithConstructor.has(obj))

//Para remover items de um objeto utilizamos delete (isso não é recomendado)
//Usando o delete do Map

assert.ok(myMapWithConstructor.delete("call"))

//Não da para iterar em objetos diretamente teria que usa o .entries()
//O map da para iterar

for(const [key, value] of myMap) {
  console.log(key,value)
}

//clear
myMapWithConstructor.clear()
assert.deepStrictEqual([...myMapWithConstructor.keys()], [])


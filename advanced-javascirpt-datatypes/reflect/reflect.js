import assert from "assert"

//Garantir a segurança e semantica dos objetos
const myObject = {
  add(value) {
    return this.arg1 + this.arg2 + value
  }
}

assert.deepStrictEqual(myObject.add.apply({ arg1: 20, arg2: 50 }, [450]), 520)

myObject.add.apply = function() { throw new Error("ERRO") }

// myObject.add.apply({ arg1: 20, arg2: 50 }, [450])

const result = Reflect.apply(myObject.add, { arg1: 20, arg2: 50 }, [450])
assert.deepStrictEqual(result, 520)

//delete property
const otherObject = {
  user: "cassio",
  last: "Teste"
}

Reflect.deleteProperty(otherObject, "last")

//Verify property in object
console.log(Reflect.has(otherObject, "user"))

//get keys
console.log(Reflect.ownKeys(otherObject))
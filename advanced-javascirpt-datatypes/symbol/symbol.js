import assert from "node:assert";
const uniqueKey = Symbol("username");

const user = {};
user["username"] = "My username";
user[uniqueKey] = "My username uniqueKey";

console.log("user.username", user.username);

//Sempre unico em nivel de endereço de memoria
console.log("user.uniqueKey", user[Symbol("username")]);
console.log("user.uniqueKey", user[uniqueKey]);

assert.deepStrictEqual(user.username, "My username");
assert.deepStrictEqual(user[Symbol("username")], undefined);
assert.deepStrictEqual(user[uniqueKey], "My username uniqueKey");

//é dificil de pegar, mas é visivel
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

//Know simbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ["a", "b", "c"].reverse(),
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop(),
      };
    },
  }),
};

for await (const item of obj) {
  console.log(item);
}

assert.deepStrictEqual([...obj], ["a", "b", "c"]);

const kItem = Symbol("KItem");

class MyClass {
  constructor(...args) {
    this[kItem] = args.map((arg) => new Date(...arg));
  }
}

const myClass = new MyClass([2022, 4, 6], [2001, 4, 6]);

const expectedDates = [
  new Date(2022, 4, 6),
  new Date(2001, 4, 6)
]

assert.deepStrictEqual(myClass[kItem], expectedDates)
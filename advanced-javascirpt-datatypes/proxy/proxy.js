import Event from "node:events"

const eventName = "counter"
const event = new Event()

event.on(eventName, (msg) => console.log(msg))

const myCount = {
  count: 0
}

const proxy = new Proxy(myCount, {
  set(target, propertyKey, newValue) {
    event.emit(eventName, { key: target[propertyKey], newValue })
    target[propertyKey] = newValue
    return true
  },
  get(target, propertyKey) {
    console.log("chamou aqui!")
    return target[propertyKey]
  }
})

setImmediate(() => {
  console.log("chamou o setImmediate")
})

setInterval(() => {
  proxy.count += 1
}, 200)
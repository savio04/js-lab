import { readFileSync, writeFileSync } from "fs"

export function save(data) {
  const { pathname } = new URL("./../database.json", import.meta.url)

  try {
    const file = readFileSync(pathname)
    let items = JSON.parse(file)

    if(items.length) {
      items.push(data)
    } else {
      items = [data]
    }
  
    writeFileSync(pathname, JSON.stringify(items))
  }catch(error) {
    console.log(error)
  }
}
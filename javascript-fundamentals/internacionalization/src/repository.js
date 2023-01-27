import { readFile, writeFile } from "fs/promises"

export async function save(data) {
  const { pathname } = new URL("./../database.json", import.meta.url)

  try {
    const file = await readFile(pathname)
    // let items = JSON.parse(file)

    // if(items.length) {
    //   items.push(data)
    // } else {
    //   items = [data]
    // }
  
    // console.log(JSON.stringify(items))
    console.log(file)
    await writeFile(pathname, JSON.stringify(JSON.parse(file)))
  }catch(error) {
    console.log(error)
  }
}
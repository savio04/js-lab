"use strict";
import { watch } from "fs"
import { readFile } from "fs/promises"
const __filename = new URL(import.meta.url).pathname;

class File {
  async watch(event, filename) {
    const url = new URL(filename, import.meta.url)
    console.log("here")
    console.log("arguments", Array.prototype.slice.call(arguments))
    await this.showContent(url.pathname)
  }

  async showContent(path) {
    const result =  await readFile(path, { encoding: "utf-8" })
    console.log(result)
  }
}

const file = new File()

//Podemos deixar explicito qual contexto a função deve seguir
//o bind retorna um função com o contexto desejado
// watch(__filename, file.watch.bind(file))


//a função call serve para substituirmos a chamanda de alguma função
// file.watch.call({ showContent: () => console.log("Hello nice call") }, null, __filename)
file.watch.apply({ showContent: () => console.log("Hello nice apply") }, [null, __filename])
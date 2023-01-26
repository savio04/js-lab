import database from "../database.json" assert { type: "json" };
import Person from "./person.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERMINAL = "exit"

const terminal = new TerminalController();

terminal.initialzedTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminal.question()

    if(answer === STOP_TERMINAL) {
      terminal.closeTerminal()
      console.log("exit")

      return;
    }

    const newData = Person.generateInstanceFromString(answer).formatedd(DEFAULT_LANG)

    terminal.updateTable(newData)
    await mainLoop()
  } catch (error) {
    console.error(error)
    await mainLoop()
  }
}

await mainLoop()

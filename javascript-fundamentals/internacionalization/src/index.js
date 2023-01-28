import database from "../database.json" assert { type: "json" };
import Person from "./person.js";
import { save } from "./repository.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERMINAL = "exit";

const terminal = new TerminalController();

terminal.initialzedTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminal.question();

    if (answer === STOP_TERMINAL) {
      terminal.closeTerminal();
      console.log("exit terminal");

      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminal.updateTable(person.formatedd(DEFAULT_LANG));

    save(person)
    return mainLoop();
  } catch (error) {
    console.error(error);
    return mainLoop();
  }
}

await mainLoop();

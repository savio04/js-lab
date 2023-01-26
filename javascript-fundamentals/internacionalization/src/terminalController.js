import readline from "readline";
import chalkTable from "chalk-table"
import Person from "./person.js";
import draftLog from "draftlog";
import chalk from "chalk";

export default class TerminalController {
  constructor() {
    this.data = []
    this.print = {}
    this.terminal = {}
  }

  initialzedTerminal(database, lenguage) {
    draftLog(console).addLineListener(process.stdin)

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    this.initializedTable(database, lenguage)
  }
  
  initializedTable(database, lenguage) {
    const items = database.map(item => new Person(item).formatedd(lenguage))
    const table = chalkTable(this.getTableOption(), items)
    this.data = items

    this.print = console.draft(table)
  }

  question(ask = "") {
    return new Promise((resolve, reject) => this.terminal.question(ask, resolve))
  }

  updateTable(info) {
    this.data.push({
      id: 1,
      vehicles: 'Carro e Navio',
      kmTravled: '400.000 km',
      from: '04 de junho de 2001',
      to: '05 de abril de 2002'
    })

    const newTable = chalkTable(this.getTableOption(), this.data)
    this.print(newTable)
  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOption() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("Id") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTravled", name: chalk.green("KmTravled") },
        { field: "from", name: chalk.yellow("From") },
        { field: "to", name: chalk.red("To") },
      ],
    };
  }
}

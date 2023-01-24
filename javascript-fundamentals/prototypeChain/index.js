function Employee() {}
Employee.prototype.salary = () => "Salary"

function Manager() {}
Object.setPrototypeOf(Manager.prototype, Employee.prototype)
Manager.prototype.add = () => "Money"

//Quando chamo o new o objeto __proto__ recebe o que esta no prototype
console.log("__proto__ antes de usar o new")
console.log(Manager.__proto__)
console.log("----\n")

console.log("Prototype do manager")
console.log(Manager.prototype)
console.log("----\n")

console.log("__proto__ depois do new")
console.log(new Manager().__proto__)


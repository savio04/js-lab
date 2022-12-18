class User {
  constructor({ name, id, profession, age }) {
    this.id = Number(id);
    this.name = String(name);
    this.profession = String(profession);
    this.age = Number(age);
  }
}

module.exports = User;

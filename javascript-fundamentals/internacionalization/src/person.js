export default class Person {
  constructor({ id, vehicles, kmTravled, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTravled = kmTravled;
    this.from = from;
    this.to = to;
  }

  formatedd(lenguage) {
    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(lenguage, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicles),
      kmTravled: new Intl.NumberFormat(lenguage, {
        style: "unit",
        unit: "kilometer",
      }).format(Number(this.kmTravled)),
      from: new Intl.DateTimeFormat(lenguage, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(this.mapDate(this.from)),
      to: new Intl.DateTimeFormat(lenguage, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(this.mapDate(this.to)),
    };
  }

  mapDate(date) {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  static generateInstanceFromString(string) {
    const BLANK_SPACE = " "
    const COMMA = ","

    const [id, vehicles, kmTravled, from, to] = string.split(BLANK_SPACE)

    return new Person({
      id,
      vehicles: vehicles.split(COMMA),
      kmTravled,
      from,
      to
    })
  }
}

//1 Carro 400000 2001-06-04 2002-04-05

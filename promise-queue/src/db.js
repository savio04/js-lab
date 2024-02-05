import pg from "pg"

export const db = new pg.Pool({
  user: "root",
  password: "01075783",
  max: 10,
  database: "test"
})

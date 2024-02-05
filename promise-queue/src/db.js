import pg from "pg"

export const db = new pg.Pool({
  user: "your_user",
  password: "your_password",
  max: 10,
  database: "test"
})

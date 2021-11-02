import { Knex, knex } from "knex"
import config from "./knexfile"

const db: Knex = knex(config)

export default db

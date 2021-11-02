import { Knex } from "knex"

export interface Context {
  knex: Knex
}

export interface CryptoCurrency {
  id: string
  rank: number
  name: string
  symbol: string
}

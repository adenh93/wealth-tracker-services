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

export interface CMCQuoteData {
  id: number
  name: string
  symbol: string
  slug: string
  is_active: number
  is_fiat: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  date_added: string
  num_market_pairs: number
  cmc_rank: number
  last_updated: string
  tags: string[]
  quote: {
    [key: string]: {
      price: number
      volume_24h: number
      volume_change_24h: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      percent_change_30d: number
      market_cap: number
      market_cap_dominance: number
      fully_diluted_market_cap: number
      last_updated: string
    }
  }
}

export interface CMCQuotesResponse {
  data: {
    [key: string]: CMCQuoteData
  }
}

export interface Map<T> {
  [key: string]: T
}

export enum TableNames {
  CryptoCurrency = "cryptocurrency",
  CryptoCurrencyHolding = "cryptocurrency_holding",
}

export enum CMCEndpoints {
  CryptoCurrencyQuotes = "cryptocurrency/quotes/latest",
}

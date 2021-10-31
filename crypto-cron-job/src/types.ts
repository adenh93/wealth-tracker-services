export interface Map<T> {
  [key: string]: T
}

export interface CMCIDMapResponse {
  data: CoinMarketCapCoin[]
}

export interface CoinMarketCapCoin {
  id: string
  rank: number
  name: string
  symbol: string
  slug: string
  is_active: number
  first_historical_data: string
  last_historical_data: string
}

export interface CryptoCurrency {
  id: string
  rank: number
  name: string
  symbol: string
}
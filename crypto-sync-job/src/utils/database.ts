import knex from "knex"
import config from "../../knexfile"
import { TABLE_NAME } from "../constants"
import { CoinMarketCapCoin, CryptoCurrency } from "../types"

export const mapToCryptoCurrency = (
  item: CoinMarketCapCoin
): CryptoCurrency => ({
  id: item.id,
  name: item.name,
  rank: item.rank,
  symbol: item.symbol,
})

export const updateCryptoCurrencyCache = async (
  idMappings: CoinMarketCapCoin[]
): Promise<void> => {
  const db = knex(config)

  console.log("Updating Cryptocurrency records in database.")

  await db.transaction(async (transaction) => {
    const queries = idMappings.map((coin) => {
      const mapped: CryptoCurrency = mapToCryptoCurrency(coin)
      return transaction(TABLE_NAME).insert(mapped).onConflict("id").merge()
    })

    return Promise.all(queries)
      .then(transaction.commit)
      .catch(transaction.rollback)
  })
}

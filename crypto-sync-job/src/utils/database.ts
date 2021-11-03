import sequelize from "../database/connection"
import { CryptoCurrencyModel } from "../database/models"
import { CryptoCurrencyAttributes } from "../database/models/CryptoCurrencyModel"
import { CoinMarketCapCoin } from "../types"

export const mapToCryptoCurrency = (
  item: CoinMarketCapCoin
): CryptoCurrencyAttributes => ({
  id: item.id,
  name: item.name,
  rank: item.rank,
  symbol: item.symbol,
})

export const updateCryptoCurrencyCache = async (
  idMappings: CoinMarketCapCoin[]
): Promise<void> => {
  console.log("Updating Cryptocurrency records in database.")

  await sequelize.transaction(async transaction => {
    for (const coin of idMappings) {
      const mapped: CryptoCurrencyAttributes = mapToCryptoCurrency(coin)
      await CryptoCurrencyModel.upsert(mapped, { transaction })
    }
  })
}

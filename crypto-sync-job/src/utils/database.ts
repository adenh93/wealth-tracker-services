import sequelize from "../database/connection"
import {
  CryptoCurrencyHoldingModel,
  CryptoCurrencyModel,
} from "../database/models"
import {
  CryptoCurrencyHoldingCreationAttributes,
  CryptoCurrencyHoldingOutput,
} from "../database/models/CryptoCurrencyHoldingModel"
import { CryptoCurrencyAttributes } from "../database/models/CryptoCurrencyModel"
import { CMCQuotesResponse, CoinMarketCapCoin } from "../types"

export const mapToCryptoCurrency = (
  item: CoinMarketCapCoin
): CryptoCurrencyAttributes => ({
  id: item.id,
  name: item.name,
  rank: item.rank,
  symbol: item.symbol,
})

export const mapToUpdatedHolding = (
  holding: CryptoCurrencyHoldingOutput,
  response: CMCQuotesResponse
): CryptoCurrencyHoldingCreationAttributes => {
  const quote = response.data[holding.cryptoCurrencyId].quote["AUD"]

  return {
    ...holding,
    price: quote.price,
    percentChange24h: quote.percent_change_24h,
    netHoldingsValue: holding.holdings * quote.price,
  }
}

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

export const getCryptoCurrencyHoldings = async (): Promise<
  CryptoCurrencyHoldingOutput[]
> => CryptoCurrencyHoldingModel.findAll({ raw: true })

export const updateCryptoCurrencyHoldings = async (
  holdings: CryptoCurrencyHoldingOutput[],
  response: CMCQuotesResponse
): Promise<void> => {
  console.log("Updating holdings records in database.")

  const updatedHoldings: CryptoCurrencyHoldingCreationAttributes[] =
    holdings.map(holding => mapToUpdatedHolding(holding, response))

  await sequelize.transaction(async transaction => {
    for (const holding of updatedHoldings) {
      await CryptoCurrencyHoldingModel.update(holding, {
        where: { id: holding.id },
        transaction,
      })
    }
  })
}

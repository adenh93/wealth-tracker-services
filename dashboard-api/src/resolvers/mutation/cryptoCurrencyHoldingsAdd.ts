import { ApolloError } from "apollo-server-errors"
import { MutationCryptoCurrencyHoldingsAddArgs } from "../../generated/types"
import { getQuotesDataLatest } from "../../utils/coinMarketCapAPI"
import {
  CryptoCurrencyModel,
  CryptoCurrencyHoldingModel,
} from "../../database/models"
import { CryptoCurrencyHoldingInstance } from "../../database/models/CryptoCurrencyHoldingModel"
import { CryptoCurrencyInstance } from "../../database/models/CryptoCurrencyModel"

const cryptoCurrencyHoldingsAdd = async (
  _parent: any,
  { input }: MutationCryptoCurrencyHoldingsAddArgs
): Promise<CryptoCurrencyHoldingInstance> => {
  const { id, holdings } = input

  if (holdings <= 0)
    throw new ApolloError("You must add at least one unit to your holdings.")

  const cryptoCurrency: CryptoCurrencyInstance =
    await CryptoCurrencyModel.findOne({
      where: { id },
    })

  if (!cryptoCurrency)
    throw new ApolloError("The specified Cryptocurrency asset does not exist.")

  const existingHolding = await CryptoCurrencyHoldingModel.findOne({
    where: { cryptoCurrencyId: id },
  })

  if (existingHolding)
    throw new ApolloError(
      "Your portfolio already contains this Cryptocurrency asset."
    )

  const { quote } = await getQuotesDataLatest(id)
  const { price, percent_change_24h } = quote["AUD"]

  return CryptoCurrencyHoldingModel.create({
    price,
    holdings,
    cryptoCurrencyId: id,
    percentChange24h: percent_change_24h,
    netHoldingsValue: holdings * price,
  })
}

export default cryptoCurrencyHoldingsAdd

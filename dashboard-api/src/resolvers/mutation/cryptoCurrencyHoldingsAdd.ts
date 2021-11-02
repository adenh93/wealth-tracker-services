import { ApolloError } from "apollo-server-errors"
import { Context, TableNames } from "../../types"
import {
  CryptoCurrency,
  CryptoCurrencyHolding,
  MutationCryptoCurrencyHoldingsAddArgs,
} from "../../generated/types"
import { getQuotesDataLatest } from "../../utils/coinMarketCapAPI"

const cryptoCurrencyHoldingsAdd = async (
  _parent: any,
  { input }: MutationCryptoCurrencyHoldingsAddArgs,
  { knex }: Context
): Promise<CryptoCurrencyHolding> => {
  const { id, holdings } = input

  if (holdings <= 0)
    throw new ApolloError("You must add at least one unit to your holdings.")

  const cryptocurrency = await knex<CryptoCurrency>(TableNames.CryptoCurrency)
    .where("id", "=", id)
    .first()

  if (!cryptocurrency)
    throw new ApolloError("The specified Cryptocurrency asset does not exist.")

  const existingHolding = await knex(TableNames.CryptoCurrencyHolding)
    .where("cryptocurrency_id", "=", id)
    .first()

  if (existingHolding)
    throw new ApolloError(
      "Your portfolio already contains this Cryptocurrency asset."
    )

  const { quote } = await getQuotesDataLatest(id)
  const { price, percent_change_24h } = quote["AUD"]

  const newHolding = {
    cryptocurrency_id: id,
    price,
    percent_change_24h,
    holdings,
  } as CryptoCurrencyHolding

  await knex(TableNames.CryptoCurrencyHolding).insert(newHolding)

  return {
    ...newHolding,
    cryptocurrency,
  }
}

export default cryptoCurrencyHoldingsAdd

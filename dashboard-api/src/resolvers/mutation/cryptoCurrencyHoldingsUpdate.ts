import { ApolloError } from "apollo-server-errors"
import { MutationCryptoCurrencyHoldingsUpdateArgs } from "../../generated/types"
import { CryptoCurrencyHoldingModel } from "../../database/models"
import {
  CryptoCurrencyHoldingAttributes,
  CryptoCurrencyHoldingOutput,
} from "../../database/models/CryptoCurrencyHoldingModel"

const cryptoCurrencyHoldingsUpdate = async (
  _parent: any,
  { input }: MutationCryptoCurrencyHoldingsUpdateArgs
): Promise<CryptoCurrencyHoldingOutput> => {
  const { id, holdings } = input

  if (holdings <= 0)
    throw new ApolloError("You must add at least one unit to your holdings.")

  const existingHolding = await CryptoCurrencyHoldingModel.findOne({
    where: { id },
    raw: true,
  })

  if (!existingHolding)
    throw new ApolloError("This asset does not exist in your portfolio.")

  const updated: CryptoCurrencyHoldingAttributes = {
    ...existingHolding,
    holdings,
    netHoldingsValue: holdings * existingHolding.price,
  }

  await CryptoCurrencyHoldingModel.update(updated, {
    where: { id },
  })

  return updated
}

export default cryptoCurrencyHoldingsUpdate

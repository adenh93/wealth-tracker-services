import { ApolloError } from "apollo-server-errors"
import { MutationCryptoCurrencyHoldingsDeleteArgs } from "../../generated/types"
import { CryptoCurrencyHoldingModel } from "../../database/models"
import { CryptoCurrencyHoldingOutput } from "../../database/models/CryptoCurrencyHoldingModel"

const cryptoCurrencyHoldingsDelete = async (
  _parent: any,
  { id }: MutationCryptoCurrencyHoldingsDeleteArgs
): Promise<CryptoCurrencyHoldingOutput> => {
  const existingHolding = await CryptoCurrencyHoldingModel.findOne({
    where: { id },
  })

  if (!existingHolding)
    throw new ApolloError("This asset does not exist in your portfolio.")

  await CryptoCurrencyHoldingModel.destroy({
    where: { id },
  })

  return existingHolding
}

export default cryptoCurrencyHoldingsDelete

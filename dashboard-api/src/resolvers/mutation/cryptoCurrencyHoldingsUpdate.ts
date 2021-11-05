import {
  CryptoCurrencyHoldingsUpdateInput,
  MutationCryptoCurrencyHoldingsUpdateArgs,
} from "../../generated/types"
import { CryptoCurrencyHoldingModel } from "../../database/models"
import {
  CryptoCurrencyHoldingAttributes,
  CryptoCurrencyHoldingOutput,
} from "../../database/models/CryptoCurrencyHoldingModel"
import { UserFormInputError } from "../../errors"

const cryptoCurrencyHoldingsUpdate = async (
  _parent: any,
  { input }: MutationCryptoCurrencyHoldingsUpdateArgs
): Promise<CryptoCurrencyHoldingOutput> => {
  const { id, holdings } = input

  if (holdings <= 0)
    throw new UserFormInputError<CryptoCurrencyHoldingsUpdateInput>(
      "You must add at least one unit to your holdings.",
      { field: "holdings" }
    )

  const existingHolding = await CryptoCurrencyHoldingModel.findOne({
    where: { id },
    raw: true,
  })

  if (!existingHolding)
    throw new UserFormInputError<CryptoCurrencyHoldingsUpdateInput>(
      "This asset does not exist in your portfolio.",
      { field: "id" }
    )

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

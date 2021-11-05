import { MutationCryptoCurrencyHoldingsDeleteArgs } from "../../generated/types"
import { CryptoCurrencyHoldingModel } from "../../database/models"
import { CryptoCurrencyHoldingOutput } from "../../database/models/CryptoCurrencyHoldingModel"
import { UserFormInputError } from "../../errors"

const cryptoCurrencyHoldingsDelete = async (
  _parent: any,
  { id }: MutationCryptoCurrencyHoldingsDeleteArgs
): Promise<CryptoCurrencyHoldingOutput> => {
  const existingHolding = await CryptoCurrencyHoldingModel.findOne({
    where: { id },
  })

  if (!existingHolding)
    throw new UserFormInputError<MutationCryptoCurrencyHoldingsDeleteArgs>(
      "This asset does not exist in your portfolio.",
      {
        field: "id",
      }
    )

  await CryptoCurrencyHoldingModel.destroy({
    where: { id },
  })

  return existingHolding
}

export default cryptoCurrencyHoldingsDelete

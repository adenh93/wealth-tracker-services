import {
  CryptoCurrencyHoldingModel,
  CryptoCurrencyModel,
} from "../../database/models"
import { CryptoCurrencyHoldingOutput } from "../../database/models/CryptoCurrencyHoldingModel"

const cryptoCurrencyHoldings = async (
  _parent: any,
  _args: any
): Promise<CryptoCurrencyHoldingOutput[]> =>
  CryptoCurrencyHoldingModel.findAll({
    order: [["net_holdings_value", "desc"]],
    include: { model: CryptoCurrencyModel, as: "cryptoCurrency" },
    raw: true,
    nest: true,
  })

export default cryptoCurrencyHoldings

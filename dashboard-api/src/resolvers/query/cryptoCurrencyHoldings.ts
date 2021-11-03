import {
  CryptoCurrencyHoldingModel,
  CryptoCurrencyModel,
} from "../../database/models"
import { CryptoCurrencyHoldingInstance } from "../../database/models/CryptoCurrencyHoldingModel"

const cryptoCurrencyHoldings = async (
  _parent: any,
  _args: any
): Promise<CryptoCurrencyHoldingInstance[]> =>
  CryptoCurrencyHoldingModel.findAll({
    order: [["net_holdings_value", "desc"]],
    include: { model: CryptoCurrencyModel, as: "cryptoCurrency" },
    raw: true,
    nest: true,
  })

export default cryptoCurrencyHoldings

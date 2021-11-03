import { Op, FindOptions } from "sequelize"
import { CryptoCurrencyModel } from "../../database/models"
import {
  CryptoCurrencyAttributes,
  CryptoCurrencyInstance,
} from "../../database/models/CryptoCurrencyModel"
import { QueryCryptoCurrenciesArgs } from "../../generated/types"

const cryptoCurrencies = async (
  _parent: any,
  { query }: QueryCryptoCurrenciesArgs
): Promise<CryptoCurrencyInstance[]> => {
  let options: FindOptions<CryptoCurrencyAttributes> = {
    order: [["rank", "asc"]],
    limit: 25,
    raw: true,
    nest: true,
  }

  if (query)
    options.where = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query}%` } },
        { symbol: { [Op.iLike]: `%${query}%` } },
      ],
    }

  return CryptoCurrencyModel.findAll(options)
}

export default cryptoCurrencies

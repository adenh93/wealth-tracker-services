import { Context, TableNames } from "../../types"
import {
  CryptoCurrency,
  QueryCryptoCurrenciesArgs,
} from "../../generated/types"

const cryptoCurrencies = async (
  _parent: any,
  { query }: QueryCryptoCurrenciesArgs,
  { knex }: Context
): Promise<CryptoCurrency[]> => {
  const builder = knex(TableNames.CryptoCurrency)

  if (query)
    builder
      .whereRaw('"name" ILIKE ?', [`%${query}%`])
      .orWhereRaw('"symbol" ILIKE ?', [`%${query}%`])

  return builder.orderBy("rank", "asc").limit(25)
}

export default cryptoCurrencies

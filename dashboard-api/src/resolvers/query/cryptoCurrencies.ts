import { Context } from "../../types"
import {
  CryptoCurrency,
  QueryCryptoCurrenciesArgs,
} from "../../generated/types"

const cryptoCurrencies = async (
  _parent: any,
  { query }: QueryCryptoCurrenciesArgs,
  { knex }: Context
): Promise<CryptoCurrency[]> => {
  const select = knex("cryptocurrency")

  if (query)
    select
      .whereRaw('"name" ILIKE ?', [`%${query}%`])
      .orWhereRaw('"symbol" ILIKE ?', [`%${query}%`])

  return select.orderBy("rank", "asc")
}

export default cryptoCurrencies

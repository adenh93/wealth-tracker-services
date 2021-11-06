import { CryptoCurrencyHoldingOutput } from "../database/models/CryptoCurrencyHoldingModel"
import { CMCQuotesResponse } from "../types"
import { getLatestQuoteData } from "../utils/coinMarketCapAPI"
import {
  getCryptoCurrencyHoldings,
  updateCryptoCurrencyHoldings,
} from "../utils/database"

const syncHoldingsValue = async (_job: any) => {
  console.log("Starting holdings sync.")
  const holdings: CryptoCurrencyHoldingOutput[] =
    await getCryptoCurrencyHoldings()

  if (!holdings.length) {
    console.log("No cryptocurrency holdings to sync.")
    return
  }

  const data: CMCQuotesResponse = await getLatestQuoteData(holdings)
  await updateCryptoCurrencyHoldings(holdings, data)
}

export default syncHoldingsValue

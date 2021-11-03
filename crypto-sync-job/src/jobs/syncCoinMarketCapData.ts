import { getCoinMarketCapData } from "../utils/coinMarketCapAPI"
import { updateCryptoCurrencyCache } from "../utils/database"

const syncCoinMarketCapData = async (_job: any) => {
  console.log("Starting cryptocurrency sync.")
  const data = await getCoinMarketCapData()
  await updateCryptoCurrencyCache(data)
}

export default syncCoinMarketCapData

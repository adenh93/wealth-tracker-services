import { getCoinMarketCapData } from "./utils/coinMarketCapAPI"
import { updateCryptoCurrencyCache } from "./utils/database"

export const run = async () => {
  const data = await getCoinMarketCapData()
  await updateCryptoCurrencyCache(data)
}

run()
  .then(() => console.log("Finished syncing cryptocurrency data."))
  .catch(console.log)

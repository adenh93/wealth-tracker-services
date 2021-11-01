import Queue from "bull"
import { getCoinMarketCapData } from "./utils/coinMarketCapAPI"
import { updateCryptoCurrencyCache } from "./utils/database"

const cryptoSyncQueue = new Queue("crypto-sync", {
  redis: { port: 6379, host: "redis" },
})

cryptoSyncQueue.add(null, { repeat: { cron: "0 22 * * *" } })

cryptoSyncQueue.on("completed", () => {
  console.log("Finished syncing cryptocurrency data.")
})

cryptoSyncQueue.on("failed", (err) => {
  console.error("An error occured while syncing cryptocurrencies: ", err)
})

cryptoSyncQueue.process(async (_job) => {
  console.log("Starting cryptocurrency sync.")
  const data = await getCoinMarketCapData()
  await updateCryptoCurrencyCache(data)
})

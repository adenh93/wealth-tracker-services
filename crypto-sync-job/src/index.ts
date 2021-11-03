import Queue from "bull"
import syncCoinMarketCapData from "./jobs/syncCoinMarketCapData"
import syncHoldingsValue from "./jobs/syncHoldingsValue"

const redis = { port: 6379, host: "redis" }

const cryptoSyncQueue = new Queue("crypto-sync", { redis })
const holdingsSyncQueue = new Queue("holdings-sync", { redis })

/** Crypto Sync Queue */

cryptoSyncQueue.add(null, { repeat: { cron: "0 22 * * *" } })

cryptoSyncQueue.on("completed", () => {
  console.log("Finished syncing cryptocurrency data.")
})

cryptoSyncQueue.on("failed", err => {
  console.error("An error occured while syncing cryptocurrencies: ", err)
})

cryptoSyncQueue.process(syncCoinMarketCapData)

/** Holdings Sync Queue */

holdingsSyncQueue.add(null, { repeat: { cron: "0 * * * *" } })

holdingsSyncQueue.on("completed", () => {
  console.log("Finished syncing holdings data.")
})

holdingsSyncQueue.on("failed", err => {
  console.error("An error occured while syncing holdings: ", err)
})

holdingsSyncQueue.process(syncHoldingsValue)

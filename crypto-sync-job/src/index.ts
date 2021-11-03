import Queue from "bull"
import syncCoinMarketCapData from "./jobs/syncCoinMarketCapData"

const redis = { port: 6379, host: "redis" }

const cryptoSyncQueue = new Queue("crypto-sync", { redis })

cryptoSyncQueue.add(null, { repeat: { cron: "0 22 * * *" } })

cryptoSyncQueue.on("completed", () => {
  console.log("Finished syncing cryptocurrency data.")
})

cryptoSyncQueue.on("failed", err => {
  console.error("An error occured while syncing cryptocurrencies: ", err)
})

cryptoSyncQueue.process(syncCoinMarketCapData)

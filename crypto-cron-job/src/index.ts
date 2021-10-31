import dotenv from "dotenv"
import { getCoinMarketCapData } from "./utils/coinMarketCapAPI"

dotenv.config()

export const run = async () => {
  const data = await getCoinMarketCapData()
}

run()
  .then(() => console.log("Finished syncing cryptocurrency data."))
  .catch(console.log)

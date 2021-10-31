import { URLSearchParams } from "url"
import { CMC_API_URL, RESULTS_PER_PAGE } from "../constants"
import { CMCIDMapResponse, CoinMarketCapCoin, Map } from "../types"
import { get } from "./fetchUtils"

export const getCoinMarketCapEndpoint = (
  endpoint: string,
  params?: Map<string>
): string => {
  let url = `${CMC_API_URL}/${endpoint}`

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }

  return url
}

export const getCoinMarketCapData = async (): Promise<CoinMarketCapCoin[]> => {
  const idMapData: CoinMarketCapCoin[] = []

  for (let i = 0; ; i += RESULTS_PER_PAGE) {
    const url: string = getCoinMarketCapEndpoint("cryptocurrency/map", {
      start: String(i + 1),
      limit: String(RESULTS_PER_PAGE),
    })

    const { data } = await get<CMCIDMapResponse>(url)
    idMapData.push(...data)

    if (data.length < RESULTS_PER_PAGE) break
  }

  return idMapData
}

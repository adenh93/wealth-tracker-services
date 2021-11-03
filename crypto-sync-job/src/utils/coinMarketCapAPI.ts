import { URLSearchParams } from "url"
import { CMC_API_URL, RESULTS_PER_PAGE } from "../constants"
import { CryptoCurrencyHoldingOutput } from "../database/models/CryptoCurrencyHoldingModel"
import {
  CMCEndpoints,
  CMCIDMapResponse,
  CMCQuotesResponse,
  CoinMarketCapCoin,
  Map,
} from "../types"
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
    const url: string = getCoinMarketCapEndpoint(
      CMCEndpoints.CryptoCurrencyMap,
      {
        start: String(i + 1),
        limit: String(RESULTS_PER_PAGE),
      }
    )

    const { data } = await get<CMCIDMapResponse>(url)
    idMapData.push(...data)

    if (data.length < RESULTS_PER_PAGE) break
  }

  console.log(`Fetched ${idMapData.length} cryptocurrency records.`)

  return idMapData
}

export const getLatestQuoteData = async (
  holdings: CryptoCurrencyHoldingOutput[]
): Promise<CMCQuotesResponse> => {
  const ids: number[] = holdings.map(row => row.cryptoCurrencyId)

  const url: string = getCoinMarketCapEndpoint(
    CMCEndpoints.CryptoCurrencyQuotes,
    {
      id: ids.join(","),
      convert: "AUD",
    }
  )

  return get<CMCQuotesResponse>(url)
}

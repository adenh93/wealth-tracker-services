import { URLSearchParams } from "url"
import { CMC_API_URL } from "../constants"
import { CMCEndpoints, CMCQuoteData, CMCQuotesResponse, Map } from "../types"
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

export const getQuotesDataLatest = async (
  id: string
): Promise<CMCQuoteData> => {
  const url: string = getCoinMarketCapEndpoint(
    CMCEndpoints.CryptoCurrencyQuotes,
    {
      id,
      convert: "AUD",
    }
  )

  const { data } = await get<CMCQuotesResponse>(url)

  return data[id]
}

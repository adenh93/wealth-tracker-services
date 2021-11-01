import fetch from "node-fetch"

export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY!,
    },
  })

  if (!response.ok) throw Error("An error occured while fetching")
  const json = await response.json()
  return json as T
}

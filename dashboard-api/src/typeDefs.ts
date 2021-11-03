import { gql } from "apollo-server"

const typeDefs = gql`
  type Query {
    cryptoCurrencies(query: String): [CryptoCurrency!]
    cryptoCurrencyHoldings: [CryptoCurrencyHolding!]
  }

  type Mutation {
    cryptoCurrencyHoldingsAdd(
      input: CryptoCurrencyHoldingsAddInput!
    ): CryptoCurrencyHolding
    cryptoCurrencyHoldingsUpdate(
      input: CryptoCurrencyHoldingsUpdateInput!
    ): CryptoCurrencyHolding
  }

  type CryptoCurrency {
    id: Int!
    rank: Int!
    name: String!
    symbol: String!
  }

  type CryptoCurrencyHolding {
    id: Int!
    cryptoCurrencyId: Int!
    cryptoCurrency: CryptoCurrency
    price: Float!
    percentChange24h: Float!
    holdings: Float!
    netHoldingsValue: Float!
  }

  input CryptoCurrencyHoldingsAddInput {
    cryptoCurrencyId: Int!
    holdings: Float!
  }

  input CryptoCurrencyHoldingsUpdateInput {
    id: Int!
    holdings: Float!
  }
`

export default typeDefs

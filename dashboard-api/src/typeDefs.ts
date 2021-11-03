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
  }

  type CryptoCurrency {
    id: Int!
    rank: Int!
    name: String!
    symbol: String!
  }

  type CryptoCurrencyHolding {
    cryptoCurrencyId: Int!
    cryptoCurrency: CryptoCurrency
    price: Float!
    percentChange24h: Float!
    holdings: Float!
    netHoldingsValue: Float!
  }

  input CryptoCurrencyHoldingsAddInput {
    id: Int!
    holdings: Float!
  }
`

export default typeDefs

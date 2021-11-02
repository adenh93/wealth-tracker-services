import { gql } from "apollo-server"

const typeDefs = gql`
  type Query {
    cryptoCurrencies(query: String): [CryptoCurrency!]
  }

  type Mutation {
    cryptoCurrencyHoldingsAdd(
      input: CryptoCurrencyHoldingsAddInput!
    ): CryptoCurrencyHolding
  }

  type CryptoCurrency {
    id: ID!
    rank: Int!
    name: String!
    symbol: String!
  }

  type CryptoCurrencyHolding {
    cryptocurrency_id: ID!
    cryptocurrency: CryptoCurrency!
    price: Float!
    percent_change_24h: Float!
    holdings: Float!
  }

  input CryptoCurrencyHoldingsAddInput {
    id: ID!
    holdings: Float!
  }
`

export default typeDefs

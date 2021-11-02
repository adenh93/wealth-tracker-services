import { gql } from "apollo-server"

const typeDefs = gql`
  type Query {
    cryptoCurrencies(query: String): [CryptoCurrency!]
  }

  type CryptoCurrency {
    id: ID!
    rank: Int!
    name: String!
    symbol: String!
  }
`

export default typeDefs

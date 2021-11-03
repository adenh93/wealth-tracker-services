import { ApolloServer } from "apollo-server"
import resolvers from "./resolvers"
import typeDefs from "./typeDefs"

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(4000).then(({ url }) => {
  console.log(`Wealth Tracker API started at ${url}`)
})

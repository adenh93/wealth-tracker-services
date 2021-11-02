import { ApolloServer } from "apollo-server"
import resolvers from "./resolvers"
import typeDefs from "./typeDefs"
import knex from "./database"
import { Context } from "apollo-server-core"

const context: Context = {
  knex,
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen(4000).then(({ url }) => {
  console.log(`Wealth Tracker API started at ${url}`)
})

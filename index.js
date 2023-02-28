const { ApolloServer, gql } = require('apollo-server')
const SessionAPI = require('./datasources/sessions')

const typeDefs = gql`
  type Query {
    sessions(
      id: ID
      title: String
      description: String
      startsAt: String
      endsAt: String
      room: String
      day: String
      format: String
      track: String
      level: String
    ): [Session]
    sessionsById(id: ID): Session
  }
  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String @deprecated(reason: "will migrate to tag in the future")
    level: String
  }
`

const resolvers = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessions(args)
    },
    sessionsById: (parent, { id }, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessionById(id)
    },
  },
}

const dataSources = () => ({
  sessionAPI: new SessionAPI(),
})
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`)
})

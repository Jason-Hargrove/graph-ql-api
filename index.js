const { ApolloServer, gql, ApolloError } = require('apollo-server')
const SessionAPI = require('./datasources/sessions')
const SpeakerAPI = require('./datasources/speakers')

const typeDefs = require('./schema.js')

const resolvers = require('./resolvers.js')

const dataSources = () => ({
  sessionAPI: new SessionAPI(),
  speakerAPI: new SpeakerAPI(),
})
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  debug: false,
  formatError: (err) => {
    if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
      return new ApolloError(`We're having some trouble`, 'ERROR', {
        token: 'uniquetoken',
      })
    }
    return err
  },
  engine: {
    graphVariant: 'current',
  },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`)
})

/* 
TODO: If this needs to be picked back up, the next step is hooking up Apollo Studio
- Error handling was romoved in query
- nodemon config was added to package.json.
- There may be a diffrent way / you make need to revert the two changes mentioned above.
*/

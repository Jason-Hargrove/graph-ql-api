const { ApolloServer, gql } = require('apollo-server')
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
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`)
})

/* 
The first line sets the NODE_TLS_REJECT_UNAUTHORIZED environment variable to 0, which disables SSL verification for all https requests. The second line sets the rejectUnauthorized option of the global https.Agent instance to false, which is equivalent to setting it for all https requests.

Note that this solution is also not recommended for production environments, as it leaves your application vulnerable to man-in-the-middle attacks. It's better to use a trusted SSL certificate or a proxy to terminate SSL connections in production.
*/
// const https = require('https')
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
// https.globalAgent.options.rejectUnauthorized = false

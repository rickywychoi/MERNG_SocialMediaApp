require('dotenv').config()
const { ApolloServer, PubSub } = require('apollo-server')
const typeDefs = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers/index')

const {
  MONGODB_CONNECTION_STRING: defaultConnectionMongoDB
} = require('./config')
const mongoose = require('mongoose')

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})

mongoose
  .connect(defaultConnectionMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: process.env.PORT })
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })

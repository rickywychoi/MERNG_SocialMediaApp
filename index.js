require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const { MONGODB_CONNECTION_STRING: defaultConnectionMongoDB } = require('./config');
const mongoose = require('mongoose')

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(defaultConnectionMongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected")
        return server.listen({ port: process.env.PORT })
    }).then(res => {
        console.log(`Server running at ${res.url}`)
    });
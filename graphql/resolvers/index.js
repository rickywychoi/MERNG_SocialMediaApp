const postsResolvers = require('./posts');
const usersResolvers = require('./users');

exports.resolvers = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}
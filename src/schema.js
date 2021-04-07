const path = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { fileLoader, mergeResolvers, mergeTypes } = require("merge-graphql-schemas");
// const {GraphQLDateTime} = require("graphql-iso-date");

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
  // DateTime: GraphQLDateTime,
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

module.exports = schema;
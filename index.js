const { ApolloServer } = require("apollo-server");
const { Mutation } = require("./resolvers/Mutation");
const { typeDefs } = require("./schema");


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
  },
});

server.listen().then(({ url }) => {
  console.log("Server is up at " + url);
});
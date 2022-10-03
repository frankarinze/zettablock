const { gql } = require("apollo-server");

exports.typeDefs = gql`
type Query {
  hello: String
}

type Mutation {
    records(message: MessageInput!): Message
  }
  
  type Message {
    id: ID!
    content: String!
    mentions:[String!]!
    emoticons: [String!]!
    links: [Links!]!
  }

  input MessageInput {
    content: String!
  }
  type Links {
    url: String!
    title: String!
  }`
  ;
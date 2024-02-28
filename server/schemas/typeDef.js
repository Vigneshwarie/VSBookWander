// Created this type definition based on the models and user-controller files
const typeDefs = `
     type Book {
          bookId: ID!
          authors: [String]
          description: String!
          title: String!
          image: String
          link: String
     }
  
     type User {
          _id: ID
          username: String!
          email: String!
          password: String!
          savedBooks: [Book]
     }

     type Auth {
          token: ID!
          user: User
     }
  
     type Query {
          user: [User]
          book: [Book]
     }

     type Mutation {
          login(email: String!, password: String!): Auth
          createUser(username: String!, email: String!, password: String!): Auth
          saveBook(bookId: ID!, authors: [String], description: String!, title: String!, image: String, link: String): User
          deleteBook(bookId: ID!): User
          getSingleUser(_id: ID, username: String): User
     }
`;

module.exports = typeDefs;
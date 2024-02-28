const { User, Book } = require('../models');

const resolvers = {
     Query: {
          user: async () => {
               return User.find().populate('savedBooks');
          },
          book: async () => {
               return Book.find({});
          },
          getSingleUser: async (parent, { _id, username }) => {
               const params = _id ? { _id } : { username };
               return User.findOne(params).populate('savedBooks');
          },
     }
};


module.exports = resolvers;
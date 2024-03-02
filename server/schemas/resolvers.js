const { User, Book } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
     Query: {
          me: async (parent, args, context) => {
               if (context.user) {
                    return User.findById(context.user._id);
               }
               throw AuthenticationError;
          },
     },
     Mutation: {
          //Block to handle login user
          login: async (parent, { email, password }) => {
               const user = await User.findOne({ email });

               if (!user) {
                    throw AuthenticationError;
               }

               const correctPw = await user.isCorrectPassword(password);

               if (!correctPw) {
                    throw AuthenticationError;
               }

               const token = signToken(user);
               return { token, user };
          },
          //Block to create new user
          createUser: async (parent, args) => {
               console.log(1234);
               console.log(...args);
               const user = await User.create(args);
               const token = signToken(user);
               return { token, user };
          },
          //Block to save book to the user account
          saveBook: async (parent, args, context) => {
               if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                         { _id: context.user._id },
                         { $push: { savedBooks: args } },
                         { new: true }
                    );
                    return updatedUser;
               }
               throw AuthenticationError;
          },
          //Block to delete book from the user account
          deleteBook: async (parent, { bookId }, context) => {
               if (context.user) {
                    const updatedUser = await User.findOneAndUpdate(
                         { _id: context.user._id },
                         { $pull: { savedBooks: { bookId } } },
                         { new: true }
                    );
                    return updatedUser;
               }
               throw AuthenticationError;
          },
     },
};


module.exports = resolvers;
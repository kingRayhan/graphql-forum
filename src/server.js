import {
  ApolloServer,
  ApolloError,
  makeExecutableSchema,
} from "apollo-server-express";
import "./connection";
import express from "express";
import { rule, shield } from "graphql-shield";
import { applyMiddleware } from "graphql-middleware";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // enable env

import Mutation from "./mutations/Mutations";
import Query from "./query/Query";
import Thread from "./query/Thread";
import { importSchema } from "graphql-import";
import formatMongooseValidationError from "./formatMongooseValidationError";
import AppError from "./AppError";

const app = express();

const schema = makeExecutableSchema({
  typeDefs: importSchema(__dirname + "/gql/typeDefs.graphql"),
  resolvers: { Mutation, Query, Thread },
});
const isAuthenticated = rule()((parent, args, { req }, info) => {
  if (!req.headers.authorization) return false;

  let token = req.headers.authorization.replace("Bearer ", "");
  if (!token) return false;
  let decoded = verify(token, process.env.APP_SECRET);
  console.log(token);
  console.log(decoded);
  if (!decoded) {
    return false;
  }

  return true;
});
const permissions = shield({
  Mutation: {
    createThread: isAuthenticated,
  },
});

const middlewares = applyMiddleware(schema, permissions);

let server = new ApolloServer({
  // typeDefs: importSchema(__dirname + '/gql/typeDefs.graphql'),
  // resolvers: { Mutation, Query, Thread },
  schema: middlewares,
  context: ({ req }) => ({ req }),
  engine: {
    rewriteError(err) {
      return new AppError(err.message);
    },
  },
  // formatError(err) {
  // 	// if (err.extensions.exception.name === 'ValidationError') {
  // 	// 	return 'Hello'
  // 	// }
  // 	// err.errors = formatMongooseValidationError(err.extensions.exception.errors)
  // 	// return new AppError('Hello', { email: 'invalid email' }, 'VALDAddhskdjs')
  // }
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`http://localhost:4000${server.graphqlPath}`);
});

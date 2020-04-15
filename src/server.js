import {
	ApolloServer,
	ApolloError,
	makeExecutableSchema
} from 'apollo-server-express'
import './connection'
import express from 'express'
import { rule, shield } from 'graphql-shield'
import { applyMiddleware } from 'graphql-middleware'

import dotenv from 'dotenv'
dotenv.config() // enable env

import Mutation from './mutations/Mutations'
import Query from './query/Query'
import Thread from './query/Thread'
import { importSchema } from 'graphql-import'
import formatMongooseValidationError from './formatMongooseValidationError'
import AppError from './AppError'

const app = express()

const schema = makeExecutableSchema({
	typeDefs: importSchema(__dirname + '/gql/typeDefs.graphql'),
	resolvers: { Mutation, Query, Thread }
})

const permissions = shield({
	Mutation: {
		createThread: isAuthenticated
	}
})

const middlewares = applyMiddleware(schema, permissions)

let server = new ApolloServer({
	// typeDefs: importSchema(__dirname + '/gql/typeDefs.graphql'),
	// resolvers: { Mutation, Query, Thread },
	schema: middlewares,
	context: (expressParams) => ({ ...expressParams }),
	engine: {
		rewriteError(err) {
			return new AppError(err.message)
		}
	}
	// formatError(err) {
	// 	// if (err.extensions.exception.name === 'ValidationError') {
	// 	// 	return 'Hello'
	// 	// }
	// 	// err.errors = formatMongooseValidationError(err.extensions.exception.errors)
	// 	// return new AppError('Hello', { email: 'invalid email' }, 'VALDAddhskdjs')
	// }
})

const isAuthenticated = rule()((parent, args, ctx, info) => {
	if (!request.headers.authorization) return false

	let token = request.headers.authorization.replace('Bearer ', '')
	if (!token) return false
	let decoded = verify(token, process.env.APP_SECRET)

	if (!decoded) {
		return false
	}

	return true
})

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
	console.log(`http://localhost:4000${server.graphqlPath}`)
})

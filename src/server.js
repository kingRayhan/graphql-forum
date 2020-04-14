import { GraphQLServer } from 'graphql-yoga'
import './connection'

import dotenv from 'dotenv'
import Mutation from './mutations/Mutations'
import Query from './query/Query'
import Thread from './query/Thread'

dotenv.config() // enable env

let server = new GraphQLServer({
	typeDefs: __dirname + '/gql/typeDefs.graphql',
	resolvers: { Mutation, Query, Thread },
	context: (expressParams) => ({ ...expressParams })
})

server.start(() => {
	console.log('server running http://localhost:4000')
})

// import { ApolloError } from 'apollo-server-express'

export class AppError extends Error {
	constructor(message, errors, code) {
		this.message = message
		this.errors = errors
		this.code = code
	}
}

export default AppError

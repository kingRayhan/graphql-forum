import User from '../models/User'
import Thread from '../models/Thread'

const Query = {
	threads(_, args, { req }) {
		let { page = 1, limit = 10, skip } = args
		let offset = (page - 1) * limit
		return Thread.find().limit(limit).skip(offset)
	},
	thread(_, args, ctx) {
		return Thread.findById(args._id)
	},
	users(_, args) {
		let { page = 1, limit = 10, skip } = args
		let offset = (page - 1) * limit
		return User.find().limit(limit).skip(offset)
	}
}

export default Query

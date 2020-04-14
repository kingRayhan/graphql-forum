import isAuthenticated from '../../middlewares/isAuthenticated'
import Thread from '../../models/Thread'

export default {
	createThread(parent, args, { request }) {
		let { _id } = isAuthenticated(request)
		return Thread.create({
			...args.data,
			author: _id
		})
	},
	updateThread(parent, args) {
		return Thread.findByIdAndUpdate(args._id, args.data, { new: true })
	},
	async deleteThread(parent, args) {
		let query = Thread.findById(args._id)
		let data = await query
		await query.deleteOne()
		return data
	}
}

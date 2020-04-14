import User from '../../models/User'
import { sign } from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'

export default {
	register(parent, args) {
		return User.create(args.data)
	},
	async login(parent, args) {
		let { user, password } = args.data
		let doc = await User.findOne({
			$or: [{ email: user }, { username: user }]
		})

		if (!doc) {
			throw new Error('Invalid credentials')
		}

		let matched = await compareSync(password, doc.password)

		let token

		if (matched) {
			token = sign({ _id: doc._id }, process.env.APP_SECRET)
		} else {
			throw new Error('Invalid credentials')
		}

		return {
			user: doc,
			token
		}
	},
	updateProfile(parent, args) {
		let { _id, data } = args
		return User.findByIdAndUpdate(_id, data, { new: true })
	},
	deleteUser(parent, args) {}
}

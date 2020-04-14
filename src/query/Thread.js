import User from '../models/User'

const Thread = {
	author(parent, args) {
		return User.findById(parent.author)
	}
}

export default Thread

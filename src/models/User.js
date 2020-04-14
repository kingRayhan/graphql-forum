import mongoose from 'mongoose'
import validator from 'validator'
import { hashSync } from 'bcryptjs'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	username: {
		type: String,
		trim: true,
		unique: [true, 'Username taken']
	},
	email: {
		type: String,
		trim: true,
		validate: {
			validator: validator.isEmail,
			message: 'Invalid email'
		}
	},
	profilePhoto: {
		type: String,
		validate: {
			validator: validator.isURL,
			message: 'Invalid url'
		}
	},
	password: {
		type: String
	}
})

userSchema.pre('save', function () {
	this.password = hashSync(this.password)
})

export default mongoose.model('User', userSchema)

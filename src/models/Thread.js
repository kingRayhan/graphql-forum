import mongoose from 'mongoose'
import shortId from 'shortid'
const schmea = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true
		},
		slug: {
			type: String,
			trim: true,
			unique: true
		},
		body: {
			type: String,
			trim: true
		},
		author: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User'
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

schmea.pre('save', function () {
	this.slug =
		this.title.toLowerCase().split(' ').join('-') + '-' + shortId.generate()
})

export default mongoose.model('Thread', schmea)

import mongoose from 'mongoose'

mongoose
	.connect('mongodb://rayhan:rayhan123@ds255588.mlab.com:55588/graphql-forum', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('DB connected')
	})

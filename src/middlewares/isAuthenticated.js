import { verify } from 'jsonwebtoken'

function isAuthenticated(request) {
	if (!request.headers.authorization) throw new Error('Token not provided')

	let token = request.headers.authorization.replace('Bearer ', '')
	if (!token) throw new Error('Token not provided')
	let decoded = verify(token, process.env.APP_SECRET)

	if (!decoded) {
		throw new Error('Invalid token')
	}

	return decoded
}

export default isAuthenticated

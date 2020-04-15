const formatMongooseValidationError = (errors) => {
	const errorObj = {}

	Object.keys(errors).forEach((key) => {
		errorObj[key] = errors[key].message
	})

	return errorObj
}

export default formatMongooseValidationError

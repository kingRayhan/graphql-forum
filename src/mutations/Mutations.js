import userMutations from './user/userMutations'
import threadMutations from './threads/threadMutations'

const Mutation = {
	...threadMutations,
	...userMutations
}

export default Mutation

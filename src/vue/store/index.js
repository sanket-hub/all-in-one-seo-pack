import { createStore } from 'vuex'

// Store functionality
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

export default createStore({
	actions,
	getters,
	modules,
	mutations,
	state
})
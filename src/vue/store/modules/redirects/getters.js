export default {
	rows               : state => state.rows || [],
	logs               : state => state.logs || [],
	logs404            : state => state.logs404 || [],
	redirectOptions    : state => state.options || {},
	getCurrentFilter   : (state, getters, rootState) => rootState.route && 'logs-404' === rootState.route.name ? { slug: '404' } : state.filters.find(f => f.active),
	redirectServerTest : state => state.server.redirectTest || {},
	permalinkPath      : (state, getters, rootState) => rootState.currentPost.permalinkPath
}
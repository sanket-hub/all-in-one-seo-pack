import schema from './state/schema'

export default {
	pong            : true,
	loaded          : false,
	internalOptions : {},
	options         : {},
	dynamicOptions  : {},
	settings        : {},
	notifications   : {
		active    : [],
		new       : [],
		dismissed : [],
		force     : false
	},
	currentPost : {},
	metaBoxTabs : {
		mainSidebar   : {},
		main          : 'general',
		modal         : 'general',
		social        : 'facebook',
		socialModal   : 'facebook',
		linkAssistant : 'inbound-internal'
	},
	helpPanel         : {},
	tags              : {},
	backups           : [],
	addons            : [],
	license           : {},
	plugins           : {},
	userProfile       : {},
	showNotifications : false,
	loading           : false,
	analyzer          : null,
	analyzing         : false,
	analyzeError      : null,
	htaccessError     : null,
	isDirty           : false,
	// Network state.
	networkRobots     : {
		siteId : 'network',
		rules  : []
	},
	internalNetworkOptions : {},
	networkOptions         : {},
	networkBackups         : {},
	networkData            : {},
	...schema
}
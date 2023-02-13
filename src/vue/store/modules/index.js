// https://vuex.vuejs.org/en/modules.html
import indexNow from './index-now'
import integrations from './integrations'
import linkAssistant from './link-assistant'
import liveTags from './live-tags'
import original from './original'
import redirects from './redirects'
import searchStatistics from './search-statistics'
import wizard from './wizard'

export default {
	'index-now'         : indexNow,
	'live-tags'         : liveTags,
	'search-statistics' : searchStatistics,
	integrations,
	linkAssistant,
	original,
	redirects,
	wizard
}
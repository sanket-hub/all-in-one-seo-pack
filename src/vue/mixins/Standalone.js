import { mapState } from 'vuex'
import { getOptions } from '@/vue/utils/options'
import { merge } from 'lodash-es'
export const Standalone = {
	computed : {
		...mapState([ 'currentPost', 'options', 'dynamicOptions', 'settings' ])
	},
	async created () {
		const { options, settings, dynamicOptions, currentPost, internalOptions, tags } = await getOptions(this.$.appContext.app)
		this.$store.state.options         = merge({ ...this.$store.state.options }, { ...options })
		this.$store.state.settings        = merge({ ...this.$store.state.settings }, { ...settings })
		this.$store.state.dynamicOptions  = merge({ ...this.$store.state.dynamicOptions }, { ...dynamicOptions })
		this.$store.state.currentPost     = merge({ ...this.$store.state.currentPost }, { ...currentPost })
		this.$store.state.internalOptions = merge({ ...this.$store.state.internalOptions }, { ...internalOptions })
		this.$store.state.tags            = merge({ ...this.$store.state.tags }, { ...tags })
	}
}
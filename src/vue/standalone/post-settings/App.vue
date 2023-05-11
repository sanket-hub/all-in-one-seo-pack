<template>
	<!-- @click.stop is a Vue directive that prevents the click event from propagating further up the DOM tree. This is required inside Elementor. -->
	<div @click.stop>
		<alert v-if="'sidebar' !== this.$root._data.screenContext" />

		<main-view
			v-if="currentPost.id"
		/>
	</div>
</template>

<script>
import '@/vue/assets/scss/main.scss'
import MainView from './views/Main'
import { ScrollAndHighlight } from '@/vue/mixins'
import { getOptions } from '@/vue/utils/options'
import { merge } from 'lodash-es'
import { mapState } from 'vuex'
import Alert from './views/partials/Alert'
export default {
	components : {
		Alert,
		MainView
	},
	mixins : [ ScrollAndHighlight ],
	data () {
		return {
			scrollContainer           : '.interface-interface-skeleton__content',
			scrollTimeout             : 1000,
			ScrollAndHighlightTimeout : 2000
		}
	},
	computed : {
		...mapState([ 'currentPost' ])
	},
	async created () {
		const {
			internalOptions,
			options,
			dynamicOptions,
			settings,
			notifications,
			addons,
			license,
			currentPost,
			tags,
			linkAssistant,
			redirects,
			schema
		} = await getOptions(this.$.appContext.app)
		this.$store.state.internalOptions = merge({ ...this.$store.state.internalOptions }, { ...internalOptions })
		this.$store.state.options         = merge({ ...this.$store.state.options }, { ...options })
		this.$store.state.dynamicOptions  = merge({ ...this.$store.state.dynamicOptions }, { ...dynamicOptions })
		this.$store.state.settings        = merge({ ...this.$store.state.settings }, { ...settings })
		this.$store.state.notifications   = merge({ ...this.$store.state.notifications }, { ...notifications })
		this.$store.state.addons          = merge([ ...this.$store.state.addons ], [ ...addons ])
		this.$store.state.license         = merge({ ...this.$store.state.license }, { ...license })
		this.$store.state.currentPost     = merge({ ...this.$store.state.currentPost }, { ...currentPost })
		this.$store.state.tags            = merge({ ...this.$store.state.tags }, { ...tags })
		this.$store.state.linkAssistant   = merge({ ...this.$store.state.linkAssistant }, { ...linkAssistant })
		this.$store.state.redirects       = merge({ ...this.$store.state.redirects }, { ...redirects })
		this.$store.state.schema          = merge({ ...this.$store.state.schema }, { ...schema })
	}
}
</script>

<style lang="scss">
.aioseo-post-settings-sidebar-vue {
	> div {
		flex: 1;
	}

	.aioseo-loading-spinner {
		margin-top: 30px;
	}
}
</style>
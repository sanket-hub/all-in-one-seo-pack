<template>
	<div>
		<core-api-bar
			v-if="!pong"
		/>

		<core-license-key-bar
			v-if="$isPro && isUnlicensed && pong"
		/>

		<main-view
			v-if="currentPost.id"
		/>
	</div>
</template>

<script>
import Main from './views/Main'
import { getOptions } from '@/vue/utils/options'
import merge from 'lodash/merge'
import { mapGetters, mapState } from 'vuex'

export default {
	components : {
		'main-view' : Main
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'currentPost', 'pong' ])
	},
	async created () {
		const {
			internalOptions,
			options,
			dynamicOptions,
			networkOptions,
			settings,
			notifications,
			addons,
			license,
			currentPost,
			tags,
			linkAssistant,
			redirects
		} = await getOptions(this.$http)
		this.$set(this.$store.state, 'internalOptions', merge({ ...this.$store.state.internalOptions }, { ...internalOptions }))
		this.$set(this.$store.state, 'options', merge({ ...this.$store.state.options }, { ...options }))
		this.$set(this.$store.state, 'dynamicOptions', merge({ ...this.$store.state.dynamicOptions }, { ...dynamicOptions }))
		this.$set(this.$store.state, 'networkOptions', merge({ ...this.$store.state.networkOptions }, { ...networkOptions }))
		this.$set(this.$store.state, 'settings', merge({ ...this.$store.state.settings }, { ...settings }))
		this.$set(this.$store.state, 'notifications', merge({ ...this.$store.state.notifications }, { ...notifications }))
		this.$set(this.$store.state, 'addons', merge([ ...this.$store.state.addons ], [ ...addons ]))
		this.$set(this.$store.state, 'license', merge({ ...this.$store.state.license }, { ...license }))
		this.$set(this.$store.state, 'currentPost', merge({ ...this.$store.state.currentPost }, { ...currentPost }))
		this.$set(this.$store.state, 'tags', merge({ ...this.$store.state.tags }, { ...tags }))
		this.$set(this.$store.state, 'linkAssistant', merge({ ...this.$store.state.linkAssistant }, { ...linkAssistant }))
		this.$set(this.$store.state, 'redirects', merge({ ...this.$store.state.redirects }, { ...redirects }))
	}
}
</script>

<style lang="scss">
.aioseo-post-settings-sidebar-vue {
	display: flex;
	justify-content: center;

	.aioseo-loading-spinner {
		margin-top: 30px;
	}
}
</style>
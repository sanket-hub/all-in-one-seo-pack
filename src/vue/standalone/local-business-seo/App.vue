<template>
	<div>
		<main-view
			v-if="currentPost.id"
		/>
	</div>
</template>

<script>
import Main from './views/Main'
import { getOptions } from '@/vue/utils/options'
import { merge } from 'lodash-es'
import { mapState } from 'vuex'
export default {
	components : {
		'main-view' : Main
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
			currentPost,
			tags,
			backups,
			networkBackups
		} = await getOptions(this.$http)
		this.$set(this.$store.state, 'internalOptions', merge({ ...this.$store.state.internalOptions }, { ...internalOptions }))
		this.$set(this.$store.state, 'options', merge({ ...this.$store.state.options }, { ...options }))
		this.$set(this.$store.state, 'dynamicOptions', merge({ ...this.$store.state.dynamicOptions }, { ...dynamicOptions }))
		this.$set(this.$store.state, 'settings', merge({ ...this.$store.state.settings }, { ...settings }))
		this.$set(this.$store.state, 'notifications', merge({ ...this.$store.state.notifications }, { ...notifications }))
		this.$set(this.$store.state, 'addons', merge([ ...this.$store.state.addons ], [ ...addons ]))
		this.$set(this.$store.state, 'backups', merge([ ...this.$store.state.backups ], [ ...backups ]))
		this.$set(this.$store.state, 'networkBackups', merge({ ...this.$store.state.networkBackups }, { ...networkBackups }))
		this.$set(this.$store.state, 'currentPost', merge({ ...this.$store.state.currentPost }, { ...currentPost }))
		this.$set(this.$store.state, 'tags', merge({ ...this.$store.state.tags }, { ...tags }))
	}
}
</script>
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
import { mapState } from 'vuex'
export default {
	components : {
		'main-view' : Main
	},
	computed : {
		...mapState([ 'currentPost' ])
	},
	async created () {
		await getOptions(this.$.appContext.app)
	}
}
</script>
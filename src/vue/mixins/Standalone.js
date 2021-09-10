import { getOptions } from '@/vue/utils/options'
import merge from 'lodash/merge'
export const Standalone = {
	methods : {
		updateAioseo () {
			this.$set(this.$store.state, 'currentPost', merge({ ...this.$store.state.currentPost }, { ...window.aioseo.currentPost }))
		}
	},
	mounted () {
		this.$nextTick(() => {
			window.addEventListener('updateAioseo', this.updateAioseo)
		})
	},
	beforeDestroy () {
		window.removeEventListener('updateAioseo', this.updateAioseo)
	},
	async created () {
		const { options, dynamicOptions, currentPost, tags } = await getOptions()
		this.$set(this.$store.state, 'options', merge({ ...this.$store.state.options }, { ...options }))
		this.$set(this.$store.state, 'dynamicOptions', merge({ ...this.$store.state.dynamicOptions }, { ...dynamicOptions }))
		this.$set(this.$store.state, 'currentPost', merge({ ...this.$store.state.currentPost }, { ...currentPost }))
		this.$set(this.$store.state, 'tags', merge({ ...this.$store.state.tags }, { ...tags }))
	}
}
<template>
	<div
		class="aioseo-add-redirection-target-url"
		ref="redirect-target-url"
	>
		<base-input
			v-model="value"
			@keyup="searchChange"
			@focus="showResults = true"
			@input="$emit('input', value)"
			@blur="$emit('blur', value)"
			size="medium"
			placeholder="/target-page/"
			:class="{
				'aioseo-error'  : errors.length,
				'aioseo-active' : !errors.length && !warnings.length && url,
				'aioseo-warning' : warnings.length
			}"
		>
			<template #append-icon>
				<div class="append-icon">
					<template
						v-if="!isLoading"
					>
						<svg-circle-close
							v-if="errors.length"
						/>
						<svg-circle-check
							v-if="!errors.length && !warnings.length && url"
						/>
						<svg-circle-exclamation
							v-if="warnings.length"
						/>
					</template>

					<core-loader
						v-if="isLoading"
						dark
					/>
				</div>
			</template>
		</base-input>

		<core-add-redirection-url-results
			v-if="showResults && results.length"
			:results="results"
			:url="value"
			@set-url="setUrl"
		/>
	</div>
</template>

<script>
import { debounce } from '@/vue/utils/debounce'
import { mapActions, mapState } from 'vuex'
export default {
	props : {
		url      : String,
		errors   : Array,
		warnings : Array
	},
	data () {
		return {
			showResults : false,
			isLoading   : false,
			value       : null,
			results     : []
		}
	},
	watch : {
		value () {
			if (this.value) {
				this.value = this.value.replace(/(https?:\/)(\/)+|(\/)+/g, '$1$2$3')
			}
		},
		url : {
			immediate : true,
			handler () {
				this.value = this.url
			}
		}
	},
	computed : {
		...mapState([ 'currentPost' ])
	},
	methods : {
		...mapActions('redirects', [ 'getPosts' ]),
		onBlur () {
			setTimeout(() => {
				this.$emit('input', this.value)
			}, 150)
		},
		searchChange () {
			if (!this.value) {
				return
			}

			// Don't search if the string starts with known characters.
			if (
				this.value.startsWith('/') ||
				this.value.startsWith('http:') ||
				this.value.startsWith('https:')
			) {
				this.isLoading = false
				return
			}

			this.isLoading = true
			debounce(() => {
				if (!this.value) {
					this.isLoading = false
					return
				}

				this.showResults = true

				this.ajaxSearch(this.value)
					.then(() => (this.isLoading = false))
			}, 500)
		},
		ajaxSearch (query) {
			return this.getPosts({ query, postId: this.currentPost.id })
				.then((response) => {
					this.results = response.body.objects
				})
		},
		setUrl (url) {
			this.showResults = false
			this.value       = url.replace(this.$aioseo.urls.mainSiteUrl, '', url)
			this.$emit('input', this.value)
		},
		documentClick (event) {
			if (!this.showResults) {
				return
			}

			const target  = event && event.target ? event.target : null
			const element = this.$refs['redirect-target-url']

			if (element && element !== target && !element.contains(target)) {
				this.showResults = false
			}
		}
	},
	mounted () {
		document.addEventListener('click', this.documentClick)
	},
	beforeDestroy () {
		document.removeEventListener('click', this.documentClick)
	}
}
</script>

<style lang="scss">
.aioseo-add-redirection-target-url {
	position: relative;
}
</style>
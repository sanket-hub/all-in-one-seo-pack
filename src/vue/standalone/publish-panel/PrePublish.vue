<template>
	<div
		class="seo-overview"
		v-if="currentPost.id"
	>
		<ul class="pre-publish-checklist">
			<li
				v-for="(tip, index) in tips"
				:key="index"
			>
				<span class="icon">
					<component
						:is="tip.icon"
						:class="tip.type"
					/>
				</span>
				<span>{{ tip.label }}: <span class="result" :class="tip.value.endsWith('/100') ? tip.type : null">{{ tip.value }}</span></span>
				<span
					v-if="dynamicOptions.searchAppearance.postTypes[currentPost.postType] && dynamicOptions.searchAppearance.postTypes[currentPost.postType].advanced.showMetaBox"
					class="edit"
					@click="openSidebar(tip.name)"
				>
					<svg-pencil />
				</span>
			</li>
		</ul>
		<div
			class="snippet-preview"
			v-if="$allowed('aioseo_page_analysis')"
		>
			<p class="title">{{ strings.snippetPreview }}:</p>
			<core-google-search-preview
				:title="currentPost.title || currentPost.tags.title || '#post_title #separator_sa #site_title'"
				:separator="options.searchAppearance.global.separator"
				:description="currentPost.description || currentPost.tags.description || '#post_content'"
				:class="{ ismobile: currentPost.generalMobilePrev }"
			>
				<template #domain>
					<a :href="liveTags.permalink" target="_blank">
						{{ liveTags.permalink }}
					</a>
				</template>
			</core-google-search-preview>
		</div>
		<div
			class="canonical-url"
			v-if="$allowed('aioseo_page_analysis') && currentPost.canonicalUrl"
		>
			<p class="title">
				{{ strings.canonicalUrl }}:
				<span class="edit" @click="openSidebar('canonical')">
					<svg-pencil />
				</span>
			</p>
			<a :href="currentPost.canonicalUrl" target="_blank" rel="noopener noreferrer">
				<span>{{ currentPost.canonicalUrl }}</span>
				<svg-external />
			</a>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Standalone } from '@/vue/mixins/Standalone'
export default {
	mixins : [ Standalone ],
	data () {
		return {
			strings : {
				snippetPreview : this.$t.__('Snippet Preview', this.$td),
				canonicalUrl   : this.$t.__('Canonical URL', this.$td)
			}
		}
	},
	computed : {
		...mapState('live-tags', [ 'liveTags' ]),
		tips () {
			const tips = [
				{
					label  : this.$t.__('Visibility', this.$td),
					name   : 'visibility',
					access : 'aioseo_page_advanced_settings'
				},
				{
					label  : this.$t.__('SEO Analysis', this.$td),
					name   : 'seoAnalysis',
					access : 'aioseo_page_analysis'
				},
				{
					label  : this.$t.__('Readability', this.$td),
					name   : 'redabilityAnalysis',
					access : 'aioseo_page_analysis'
				},
				{
					label  : this.$t.__('Focus Keyphrase', this.$td),
					name   : 'focusKeyphrase',
					access : 'aioseo_page_analysis'
				}
			].filter((tip) => {
				return this.$allowed(tip.access) && (
					// Exclude items which require TruSEO to be enabled.
					'aioseo_page_analysis' !== tip.access ||
					this.options.advanced.truSeo
				)
			})

			tips.forEach((tip, index) => {
				tips[index] = { ...tip, ...this.getData(tip.name) }
			})

			return tips
		},
		canImprove () {
			return this.tips.some(tip => 'error' === tip.type)
		}
	},
	methods : {
		getIcon (type) {
			switch (type) {
				case 'error':
					return 'svg-circle-close'
				case 'warning':
					return 'svg-circle-exclamation'
				case 'success':
				default:
					return 'svg-circle-check'
			}
		},
		getData (tipName) {
			const result = {}
			let value

			switch (tipName) {
				case 'visibility':
					result.value = this.$t.__('Good!', this.$td)
					result.type  = 'success'

					value = this.currentPost.default
						? (
							this.dynamicOptions.searchAppearance.postTypes[this.currentPost.postType] &&
							!this.dynamicOptions.searchAppearance.postTypes[this.currentPost.postType].advanced.robotsMeta.default &&
							this.dynamicOptions.searchAppearance.postTypes[this.currentPost.postType].advanced.robotsMeta.noindex
						)
						: this.currentPost.noindex
					if (value) {
						result.value = this.$t.__('Blocked!', this.$td)
						result.type  = 'error'
					}
					break
				case 'seoAnalysis':
					result.value = this.$t.__('N/A', this.$td)
					result.type  = 'error'

					value = this.currentPost.seo_score
					if (Number.isInteger(value)) {
						result.value = value + '/100'
						result.type  = 80 < value ? 'success' : 50 < value ? 'warning' : 'error'
					}
					break
				case 'redabilityAnalysis':
					result.value = this.$t.__('Good!', this.$td)
					result.type  = 'success'

					value = this.currentPost.page_analysis.analysis.readability.errors
					if (value && 0 < value) {
						// Translators: 1 - How many errors were found.
						result.value = this.$t.sprintf(this.$t._n('%1$s error found!', '%1$s errors found!', value, this.$td), value)
						result.type  = 'error'
					}
					break
				case 'focusKeyphrase':
					result.value = this.$t.__('No focus keyphrase!', this.$td)
					result.type  = 'error'

					value = this.currentPost.keyphrases.focus
					if (value && value.keyphrase) {
						result.value = value.score + '/100'
						result.type  = 80 < value.score ? 'success' : 50 < value.score ? 'warning' : 'error'
					}
					break
			}

			return { ...result, icon: this.getIcon(result.type) }
		},
		openSidebar (tipName) {
			const { closePublishSidebar, openGeneralSidebar } = window.wp.data.dispatch(
				'core/edit-post'
			)

			closePublishSidebar()
			openGeneralSidebar('aioseo-post-settings-sidebar/aioseo-post-settings-sidebar')

			switch (tipName) {
				case 'canonical':
				case 'visibility':
					this.$bus.$emit('open-post-settings', { tab: 'advanced' })
					break
				case 'seoAnalysis':
					this.$bus.$emit('open-post-settings', { tab: 'general', card: 'basicseo' })
					break
				case 'redabilityAnalysis':
					this.$bus.$emit('open-post-settings', { tab: 'general', card: 'readability' })
					break
				case 'focusKeyphrase':
					this.$bus.$emit('open-post-settings', { tab: 'general', card: 'focus' })
					break
			}
		}
	},
	mounted () {
		this.$nextTick(() => {
			const menuItem = document.querySelector('.aioseo-pre-publish .editor-post-publish-panel__link')
			if (menuItem) {
				menuItem.innerHTML = this.canImprove
					? this.$t.__('Your post needs improvement!', this.$td)
					: this.$t.__('You\'re good to go!', this.$td)
			}
		})
	}
}
</script>

<style lang="scss">
.aioseo-seo-overview {
	&.components-panel__body {
		.components-button {
			display: inline-block;
			line-height: 140%;
		}
		&.is-opened {
			.components-panel__body-title,
			.components-panel__body-title:hover {
				border-bottom: 1px solid #e0e0e0;
			}
		}
	}
}
.seo-overview {
	ul {
		margin: 16px 0;
		padding-bottom: 6px;
		border-bottom: 1px solid #E8E8EB;
		li {
			display: flex;
			align-items: center;
			margin-bottom: 12px;
		}
		.icon {
			margin-right: 10px;
			line-height: 0;

			svg {
				width: 22px;
				height: 22px;
			}
		}
		.result {
			font-weight: 700;
		}

		.warning {
			color: $orange;
		}

		.info {
			color: $blue;
		}

		.success {
			color: $green;
		}

		.error {
			color: $red;
		}
	}
	.title {
		font-size: 13px;
		line-height: 130%;
		color: $placeholder-color;
		margin-bottom: 8px;
		display: flex;
	}
	.edit {
		cursor: pointer;
		margin-left: auto;
		margin-right: 5px;
		svg {
			width: 14px;
			height: 14px;
			color: $black2;
		}
		&:hover {
			svg {
				color: $black2-hover;
			}
		}
	}
	.snippet-preview {
		margin-bottom: 16px;
		.aioseo-google-search-preview {
			padding: 10px;
			a {
				color: #3c4043;
				text-decoration: none;
			}
		}
	}
	.canonical-url {
		a {
			font-size: 12px;
			color: $blue;
			svg {
				margin-left: 5px;
				width: 16px;
				height: 16px;
				vertical-align: middle;
			}
		}
		span {
			vertical-align: middle;
			overflow-wrap: break-word;
		}
	}
}
</style>
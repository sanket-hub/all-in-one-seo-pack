<template>
	<div
		class="aioseo-seo-setup"
		:class="isWpDashboard ? 'aioseo-seo-setup--wp-styles' : ''"
	>
		<div class="aioseo-seo-setup-content">
			<div class="progress">
				<svg-progress-circle :percent="percent" />

				<span v-html="steps" />
			</div>

			<p class="description">{{ strings.description }}</p>

			<base-button
				v-if="!isWpDashboard"
				type="blue"
				size="medium"
				tag="a"
				:href="wizardUrl"
			>
				<svg-rocket /> {{ strings.improveSeo }}
			</base-button>

			<a
				v-if="isWpDashboard"
				:href="wizardUrl"
				class="button button-primary"
			>
				<svg-rocket /> {{ strings.improveSeo }}
			</a>
		</div>

		<svg-seo />
	</div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import SvgProgressCircle from '@/vue/components/common/svg/ProgressCircle'
import SvgRocket from '@/vue/components/common/svg/Rocket'
import SvgSeo from '@/vue/components/common/svg/Seo'
export default {
	components : {
		SvgProgressCircle,
		SvgRocket,
		SvgSeo
	},
	props : {
		isWpDashboard : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	data () {
		return {
			strings : {
				description : this.$t.__('You\'re almost there! Once you complete the SEO setup your site will be optimized to rank in search engine results!', this.$td),
				improveSeo  : this.$t.__('Improve SEO Rankings', this.$td)
			}
		}
	},
	computed : {
		...mapGetters('wizard', [ 'getCurrentStageCount', 'getTotalStageCount', 'getNextLink' ]),
		...mapState('wizard', [ 'stages' ]),
		...mapGetters('wizard', [ 'shouldShowImportStep' ]),
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'internalOptions' ]),
		steps () {
			const currentHtml = `<strong>${this.getCurrentStageCount}</strong>`
			const totalHtml   = `<strong>${this.getTotalStageCount}</strong>`

			return this.$t.sprintf(
				// Translators: 1 - The current step count. 2 - The total step count.
				this.$t.__('Step %1$s of %2$s', this.$td),
				currentHtml,
				totalHtml
			)
		},
		percent () {
			return Math.ceil((100 * this.getCurrentStageCount) / this.getTotalStageCount)
		},
		wizardUrl () {
			return `${this.$aioseo.urls.aio.wizard}#/${this.getNextLink.name}`
		}
	},
	methods : {
		...mapMutations('wizard', [ 'loadState', 'setStages' ]),
		deleteStage (stage) {
			const stages = [ ...this.stages ]
			const index = stages.findIndex(s => stage === s)
			if (-1 !== index) {
				this.$delete(stages, index)
			}

			this.setStages(stages)
		}
	},
	mounted () {
		if (this.internalOptions.internal.wizard) {
			const wizard = JSON.parse(this.internalOptions.internal.wizard)
			this.loadState(wizard)
		}

		if (!this.shouldShowImportStep) {
			this.deleteStage('import')
		}

		if (!this.isUnlicensed) {
			this.deleteStage('license-key')
		}

		if (this.$isPro) {
			this.deleteStage('smart-recommendations')
		}
	}
}
</script>

<style lang="scss">
.aioseo-seo-setup {
	display: flex;
	flex-direction: row;
	align-items: center;

	.progress {
		display: inline-flex;
		align-items: center;
		line-height: 1;
		padding: 8px 14px 8px 8px;
		border: 1px solid #C3C4C7;
		border-radius: 100px;
		margin-bottom: 20px;
		color: $black;

		.aioseo-progress-circle {
			width: 18px;
			margin-right: 8px;
		}
	}

	.aioseo-button {
		svg {
			width: 14px;
			height: 14px;
			margin-right: 10px;
		}
	}

	.description {
		font-size: 14px;
		margin-bottom: 20px;
		color: $black2;
	}

	.aioseo-seo {
		max-width: 300px;
		min-width: 275px;
		width: 100%;
		height: auto;
		@media screen and (max-width: 1280px) {
			min-width: 0;
		}
	}

	@media screen and (max-width: 912px) {
		flex-direction: column;
	}

	&--wp-styles {
		.progress {
			margin-bottom: 12px;
		}

		.description {
			color: #3C434A;
			margin-bottom: 12px;
		}

		.button {
			svg {
				vertical-align: text-bottom;
				width: 14px;
				height: 14px;
				margin-right: 10px;
			}
		}

		.aioseo-seo {
			max-width: 225px;
			min-width: 0;
		}

		@media screen and (max-width: 520px) {
			flex-direction: column;
		}
	}
}
</style>
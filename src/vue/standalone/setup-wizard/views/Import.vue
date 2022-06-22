<template>
	<div class="aioseo-wizard-import">
		<wizard-header />
		<wizard-container>

			<wizard-body>
				<wizard-steps />

				<div class="header">
					{{ strings.importData }}
				</div>

				<div class="description">{{ strings.weHaveDetected }}</div>

				<div class="plugins">
					<grid-row>
						<grid-column
							v-for="(plugin, index) in getPlugins"
							:key="index"
							md="6"
						>
							<base-highlight-toggle
								type="checkbox"
								round
								:active="isActive(plugin)"
								:name="plugin.name"
								:value="getValue(plugin)"
								@input="checked => updateValue(checked, plugin)"
							>
								<img
									:alt="plugin.name + ' Plugin Icon'"
									v-if="pluginImages[plugin.slug]"
									:src="pluginImages[plugin.slug]"
									class="icon"
									:class="plugin.slug"
								/>
								<span
									v-if="!pluginImages[plugin.slug]"
									class="icon dashicons dashicons-admin-plugins"
								/>
								{{ plugin.name }}
							</base-highlight-toggle>
						</grid-column>
					</grid-row>
				</div>

				<template #footer>
					<div class="go-back">
						<router-link :to="getPrevLink" class="no-underline">&larr;</router-link>
						&nbsp;
						<router-link :to="getPrevLink">{{ strings.goBack }}</router-link>
					</div>
					<div class="spacer"></div>
					<base-button
						type="gray"
						@click="skipStep"
					>{{ strings.skipThisStep }}</base-button>
					<base-button
						type="blue"
						:loading="loading"
						@click="saveAndContinue"
					>{{ strings.importDataAndContinue }} &rarr;</base-button>
				</template>
			</wizard-body>

			<wizard-close-and-exit />
		</wizard-container>
	</div>
</template>

<script>
import { Wizard } from '@/vue/mixins'
import { mapActions, mapMutations } from 'vuex'
import yoastSeoImg from '@/vue/assets/images/plugins/yoast-logo-small.png'
import rankMathSeoImg from '@/vue/assets/images/plugins/rank-math-seo-logo-small.png'
import seopressImg from '@/vue/assets/images/plugins/seopress-free-logo-small.svg'
import seopressProImg from '@/vue/assets/images/plugins/seopress-pro-logo-small.svg'
import BaseHighlightToggle from '@/vue/components/common/base/HighlightToggle'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
import WizardBody from '@/vue/components/common/wizard/Body'
import WizardCloseAndExit from '@/vue/components/common/wizard/CloseAndExit'
import WizardContainer from '@/vue/components/common/wizard/Container'
import WizardHeader from '@/vue/components/common/wizard/Header'
import WizardSteps from '@/vue/components/common/wizard/Steps'
export default {
	components : {
		BaseHighlightToggle,
		GridColumn,
		GridRow,
		WizardBody,
		WizardCloseAndExit,
		WizardContainer,
		WizardHeader,
		WizardSteps
	},
	mixins : [ Wizard ],
	data () {
		return {
			loading : false,
			stage   : 'import',
			strings : {
				importData     : this.$t.__('Import data from your current plugins', this.$td),
				weHaveDetected : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO").
					this.$t.__('We have detected other SEO plugins installed on your website. Select which plugins you would like to import data to %1$s.', this.$td),
					import.meta.env.VITE_SHORT_NAME
				),
				importDataAndContinue : this.$t.__('Import Data and Continue', this.$td)
			},
			pluginImages : {
				'yoast-seo'         : this.$getImgUrl(yoastSeoImg),
				'yoast-seo-premium' : this.$getImgUrl(yoastSeoImg),
				'rank-math-seo'     : this.$getImgUrl(rankMathSeoImg),
				seopress            : this.$getImgUrl(seopressImg),
				'seopress-pro'      : this.$getImgUrl(seopressProImg)
			},
			selected : []
		}
	},
	watch : {
		selected (newVal) {
			this.updateImporters(newVal.map(v => v.slug))
		}
	},
	computed : {
		getPlugins () {
			return this.$aioseo.importers
				.filter(plugin => plugin.canImport)
		}
	},
	methods : {
		...mapMutations('wizard', [ 'updateImporters' ]),
		...mapActions('wizard', [ 'saveWizard' ]),
		updateValue (checked, plugin) {
			if (checked) {
				this.selected.push(plugin)
				return
			}

			const index = this.selected.findIndex(p => p.value === plugin.value)
			if (-1 !== index) {
				this.$delete(this.selected, index)
			}
		},
		getValue (plugin) {
			return this.selected.includes(plugin)
		},
		isActive (plugin) {
			const index = this.selected.findIndex(p => p.slug === plugin.slug)
			if (-1 !== index) {
				return true
			}

			return false
		},
		saveAndContinue () {
			this.loading = true
			this.saveWizard('importers')
				.then(() => {
					this.$router.push(this.getNextLink)
				})
		},
		skipStep () {
			this.saveWizard()
			this.$router.push(this.getNextLink)
		}
	}
}
</script>

<style lang="scss">
.aioseo-wizard-import {
	font-size: 16px;

	.header {
		font-size: 24px;
		color: $black;
		font-weight: 600;
	}

	.description {
		line-height: 1.4;
		margin-top: 20px;
		font-size: 16px;
		color: $black2;
		margin-bottom: 56px;
	}

	.plugins {
		margin-bottom: 10px;

		img {
			width: 36px;
			height: auto;

			&.seopress,
			&.seopress-pro {
				width: 26px;
				margin: 5px 10px 5px 5px;
			}
		}
	}

	.go-back {
		a {
			color: $black2;
			font-size: 14px;
		}
	}
}
</style>
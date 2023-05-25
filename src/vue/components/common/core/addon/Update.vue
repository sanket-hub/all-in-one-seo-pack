<template>
	<cta
		:cta-button-visible="$addons.userCanUpdate(addonSlug)"
		:cta-button-visible-warning="strings.permissionWarning"
		:cta-link="`${$aioseo.urls.aio.featureManager}&aioseo-activate=${addonSlug}`"
		cta-button-action
		:cta-button-loading="activationLoading"
		@cta-button-click="upgradeAddon"
		same-tab
		:button-text="ctaButtonText"
		:learn-more-link="learnMoreLink"
		:feature-list="featureList"
		:align-top="alignTop"
	>
		<template #header-text>
			{{ ctaHeader }}
		</template>
		<template #description>
			<core-alert
				type="yellow"
			>
				{{ strings.updateRequired }}
			</core-alert>
			<core-alert
				v-if="failed"
				type="red"
			>
				{{ strings.activateError }}
			</core-alert>
			{{ ctaDescription }}
		</template>

		<template #learn-more-text>
			{{ learnMoreText }}
		</template>
	</cta>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import CoreAlert from '@/vue/components/common/core/alert/Index'
import Cta from '@/vue/components/common/cta/Index'
export default {
	emits      : [ 'addon-activated' ],
	components : {
		CoreAlert,
		Cta
	},
	props : {
		addonSlug : {
			type     : String,
			required : true
		},
		featureList : {
			type    : Array,
			default : () => []
		},
		postActivationPromises : {
			type    : Array,
			default : () => []
		},
		addonName        : String,
		installedVersion : String,
		minimumVersion   : String,
		ctaButtonText    : String,
		ctaHeader        : String,
		ctaDescription   : String,
		learnMoreText    : String,
		learnMoreLink    : String,
		alignTop         : Boolean
	},
	data () {
		return {
			strings : {
				activateError     : this.$t.__('An error occurred while activating the addon. Please upload it manually or contact support for more information.', this.$td),
				permissionWarning : this.$t.__('You currently don\'t have permission to activate this addon. Please ask a site administrator to activate first.', this.$td),
				updateRequired    : this.$t.sprintf(
					// Translators: 1 - Plugin Short Name ("AIOSEO"), 2 - Pro, 3 - Version Number (e.g. "1.0.0"), 4 - Addon name (e.g. "Redirection Manager"), 5 - Version Number (e.g. "1.0.0").
					this.$t.__('This addon requires an update. %1$s %2$s requires a minimum version of %3$s for the %4$s addon. You currently have %5$s installed.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro',
					this.$addons.getAddon(this.addonSlug).installedVersion,
					this.$addons.getAddon(this.addonSlug).name,
					this.$addons.getAddon(this.addonSlug).installedVersion
				)
			},
			failed            : false,
			activationLoading : false
		}
	},
	methods : {
		...mapActions([ 'upgradePlugins' ]),
		...mapMutations([ 'updateAddon' ]),
		upgradeAddon () {
			this.failed            = false
			this.activationLoading = true
			const addon            = this.$addons.getAddon(this.addonSlug)
			this.upgradePlugins([ { plugin: addon.sku } ])
				.then(response => {
					if (response.body.failed.length) {
						this.activationLoading = false
						this.failed            = true
						return
					}

					const promises = this.postActivationPromises.map(promise => promise())

					Promise.all(promises)
						.then(() => {
							const updatedAddon      = response.body.completed[addon.sku]
							this.activationLoading  = false
							addon.hasMinimumVersion = true
							addon.isActive          = true
							addon.installedVersion  = updatedAddon.installedVersion
							this.updateAddon(addon)

							// Emit event to do any post processing.
							this.$emit('addon-activated', addon)
						})
				})
				.catch(() => {
					this.activationLoading = false
				})
		}
	}
}
</script>
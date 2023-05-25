<template>
	<cta
		:cta-button-visible="$addons.userCanInstallOrActivate(addonSlug)"
		:cta-button-visible-warning="strings.permissionWarning"
		:cta-link="`${$aioseo.urls.aio.featureManager}&aioseo-activate=${addonSlug}`"
		cta-button-action
		:cta-button-loading="activationLoading"
		@cta-button-click="activateAddon"
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
		ctaButtonText  : String,
		ctaHeader      : String,
		ctaDescription : String,
		learnMoreText  : String,
		learnMoreLink  : String,
		alignTop       : Boolean
	},
	data () {
		return {
			strings : {
				activateError     : this.$t.__('An error occurred while activating the addon. Please upload it manually or contact support for more information.', this.$td),
				permissionWarning : this.$t.__('You currently don\'t have permission to activate this addon. Please ask a site administrator to activate first.', this.$td)
			},
			failed            : false,
			activationLoading : false
		}
	},
	methods : {
		...mapActions([ 'installPlugins' ]),
		...mapMutations([ 'updateAddon' ]),
		activateAddon () {
			this.failed            = false
			this.activationLoading = true
			const addon            = this.$addons.getAddon(this.addonSlug)
			this.installPlugins([ { plugin: addon.basename } ])
				.then(response => {
					if (response.body.failed.length) {
						this.activationLoading = false
						this.failed            = true
						return
					}

					const promises = this.postActivationPromises.map(promise => promise())

					Promise.all(promises)
						.then(() => {
							this.activationLoading  = false
							addon.hasMinimumVersion = true
							addon.isActive          = true
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
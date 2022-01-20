import { mapGetters } from 'vuex'

export const AddonConditions = {
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		shouldShowMain () {
			return !this.isUnlicensed &&
				this.$addons.isActive(this.addonSlug) &&
				!this.$addons.requiresUpgrade(this.addonSlug) &&
				this.$addons.hasMinimumVersion(this.addonSlug)
		},
		shouldShowActivate () {
			return !this.isUnlicensed &&
				!this.$addons.isActive(this.addonSlug) &&
				this.$addons.canActivate(this.addonSlug) &&
				!this.$addons.requiresUpgrade(this.addonSlug) &&
				(
					this.$addons.hasMinimumVersion(this.addonSlug) ||
					!this.$addons.isInstalled(this.addonSlug)
				)
		},
		shouldShowUpdate () {
			return !this.isUnlicensed &&
				this.$addons.isInstalled(this.addonSlug) &&
				!this.$addons.requiresUpgrade(this.addonSlug) &&
				!this.$addons.hasMinimumVersion(this.addonSlug)
		},
		shouldShowLite () {
			return this.isUnlicensed || this.$addons.requiresUpgrade(this.addonSlug)
		}
	}
}
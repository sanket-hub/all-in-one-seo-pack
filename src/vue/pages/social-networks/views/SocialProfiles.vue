<template>
	<div class="aioseo-social-networking-profiles">
		<core-card
			slug="socialProfiles"
			:header-text="strings.socialProfiles"
		>
			<div class="aioseo-settings-row aioseo-section-description">
				{{ strings.description }}
			</div>

			<core-social-profiles/>
		</core-card>
	</div>
</template>

<script>
import CoreCard from '@/vue/components/common/core/Card'
import CoreSocialProfiles from '@/vue/components/common/core/SocialProfiles'
export default {
	components : {
		CoreCard,
		CoreSocialProfiles
	},
	data () {
		return {
			strings : {
				// Translators: This refers to social media profiles.
				socialProfiles : this.$t.__('Social Profiles', this.$td),
				description    : this.$t.__('To let search engines know which profiles are associated with this site, enter them below:', this.$td)
			}
		}
	}
}
</script>
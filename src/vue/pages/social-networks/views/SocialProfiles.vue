<template>
	<div class="aioseo-social-networking-profiles">
		<core-card
			slug="socialProfiles"
			:header-text="strings.socialProfiles"
		>
			<div class="aioseo-settings-row aioseo-section-description">
				{{ strings.description }}
			</div>

			<core-social-profiles
				:options="options"
			/>
		</core-card>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data () {
		return {
			strings : {
				// Translators: This refers to social media profiles.
				socialProfiles : this.$t.__('Social Profiles', this.$td),
				description    : this.$t.sprintf(this.$t.__('To let search engines know which profiles are associated with this site, enter them below:', this.$td), process.env.VUE_APP_NAME)
			}
		}
	},
	computed : {
		...mapState([ 'options' ])
	}
}
</script>
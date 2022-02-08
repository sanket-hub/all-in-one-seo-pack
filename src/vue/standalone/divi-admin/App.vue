<template>
	<div class="aioseo-divi-seo-admin-notice-container">
		<core-alert v-html="strings.alert" />
	</div>
</template>

<script>
import { Standalone } from '@/vue/mixins/Standalone'

const searchAppearanceUrl = window.aioseo.urls.aio.searchAppearance

export default {
	mixins : [ Standalone ],
	data () {
		return {
			strings : {
				// Translators: 1 - The plugin name ("All in One SEO"), 2 - Opening HTML link tag, 3 - Closing HTML link tag.
				alert : this.$t.sprintf(
					this.$t.__('The options below are disabled because you are using %1$s to manage your SEO. They can be changed in the %2$sSearch Appearance menu%3$s.', this.$td),
					process.env.VUE_APP_NAME,
					`<a href="${searchAppearanceUrl}" target="_blank">`,
					'</a>'
				)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-divi-seo-admin-notice-container {
	margin-bottom: 20px;
}

#wrap-seo .et-epanel-box {
	filter: blur(2px);
}
</style>
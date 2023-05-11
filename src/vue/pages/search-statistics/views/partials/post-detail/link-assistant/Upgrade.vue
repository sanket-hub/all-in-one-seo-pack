<template>
	<div class="aioseo-search-statistics-link-assistant">
		<blur />

		<cta :type="4">
			<template #header-text>
				<span v-html="strings.ctaHeader" />
			</template>
			<template #description>
				{{ strings.ctaDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
import Blur from './Blur'
import Cta from '@/vue/components/common/cta/Index'
export default {
	components : {
		Blur,
		Cta
	},
	data () {
		return {
			strings : {
				ctaHeader : this.$t.sprintf(
					// Translators: 1 - Opening HTML link tag, 2 - Plugin short name ("AIOSEO"), 3 - "Pro", 4 - Closing HTML link tag.
					this.$t.__('%1$sUpgrade to %2$s %3$s%4$s to see Link Suggestions', this.$td),
					`<a href="${this.$links.getPricingUrl('search-statistics', 'search-statistics-upsell')}" target="_blank">`,
					import.meta.env.VITE_SHORT_NAME,
					'Pro',
					'</a>'
				),
				ctaDescription : this.$t.__('Get internal link suggestions for all your content including orphaned posts that have no internal links.', this.$td)
			}
		}
	}
}
</script>
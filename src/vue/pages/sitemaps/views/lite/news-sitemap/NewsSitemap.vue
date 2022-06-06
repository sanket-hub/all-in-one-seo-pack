<template>
	<div class="aioseo-news-sitemap-lite">
		<core-card
			slug="newsSitemap"
			:noSlide="true"
		>
			<template #header>
				{{ strings.news }}
				<core-pro-badge />
			</template>

			<blur />

			<cta
				:feature-list="[
					strings.setPublicationName,
					strings.exclude
				]"
				:cta-link="$links.getPricingUrl('news-sitemap', 'news-sitemap-upsell')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('news-sitemap', null, 'home')"
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					<core-alert
						v-if="$isPro && $addons.requiresUpgrade('aioseo-news-sitemap') && $addons.currentPlans('aioseo-news-sitemap')"
						type="red"
					>
						{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans('aioseo-news-sitemap') }}</strong>
					</core-alert>

					{{ strings.description }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
import { NewsSitemap } from '@/vue/pages/sitemaps/mixins'
import Blur from './Blur'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreCard from '@/vue/components/common/core/Card'
import CoreProBadge from '@/vue/components/common/core/ProBadge'
import Cta from '@/vue/components/common/cta/Index.vue'
export default {
	components : {
		Blur,
		CoreAlert,
		CoreCard,
		CoreProBadge,
		Cta
	},
	mixins : [ NewsSitemap ]
}
</script>

<style lang="scss">
.aioseo-news-sitemap-lite {
	.aioseo-card .content {
		min-height: 600px;
	}

	.aioseo-sitemap-preview {
		margin-right: 10px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		.aioseo-select {
			max-width: 180px;
			margin-right: 10px;
		}

		svg.aioseo-external {
			width: 14px;
			height: 14px;
			margin-right: 10px;
		}
	}
}
</style>
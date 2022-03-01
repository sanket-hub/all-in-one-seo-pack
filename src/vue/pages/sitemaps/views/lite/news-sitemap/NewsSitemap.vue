<template>
	<div class="aioseo-news-sitemap-lite">
		<core-card
			slug="newsSitemap"
			:header-text="strings.news"
			:noSlide="true"
		>
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
import Blur from './Blur'
import { NewsSitemap } from '@/vue/pages/sitemaps/mixins'
export default {
	mixins     : [ NewsSitemap ],
	components : {
		Blur
	}
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
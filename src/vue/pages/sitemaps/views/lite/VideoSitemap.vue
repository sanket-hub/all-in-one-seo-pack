<template>
	<div class="aioseo-video-sitemap-lite">
		<core-card
			slug="videoSitemap"
			:header-text="strings.video"
		>
			<core-blur>
				<div class="aioseo-settings-row aioseo-section-description">
					{{ strings.description }}
					<span
						v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'videoSitemaps', true)"
					/>
				</div>

				<core-settings-row
					:name="strings.enableSitemap"
				>
					<template #content>
						<base-toggle
							:value="true"
						/>
					</template>
				</core-settings-row>

				<core-settings-row
					:name="$constants.GLOBAL_STRINGS.preview"
				>
					<template #content>
						<div class="aioseo-sitemap-preview">
							<base-button
								size="medium"
								type="blue"
							>
								<svg-external />
								{{ strings.openSitemap }}
							</base-button>
						</div>

						<div class="aioseo-description">
							{{ strings.noIndexDisplayed }}
							<br>
							{{ strings.doYou404 }}

							<span
								v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'blankSitemap', true)"
							/>
						</div>
					</template>
				</core-settings-row>
			</core-blur>

			<cta
				:feature-list="[
					strings.customFieldSupport,
					strings.exclude
				]"
				:cta-link="$links.getPricingUrl('video-sitemap', 'video-sitemap-upsell')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('video-sitemap', null, 'home')"
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					<core-alert
						v-if="$isPro && $addons.requiresUpgrade('aioseo-video-sitemap') && $addons.currentPlans('aioseo-video-sitemap')"
						type="red"
					>
						{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans('aioseo-video-sitemap') }}</strong>
					</core-alert>

					{{ strings.description }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
import { VideoSitemap } from '@/vue/pages/sitemaps/mixins'
export default {
	mixins : [ VideoSitemap ]
}
</script>

<style lang="scss">
.aioseo-video-sitemap-lite {
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
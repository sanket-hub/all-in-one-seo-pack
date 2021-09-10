<template>
	<div class="aioseo-opening-hours">
		<core-card
			slug="localBusinessOpeningHours"
		>

			<template #header>
				{{ strings.openingHours }}
				<core-pro-badge />
			</template>

			<core-blur>
				<core-settings-row
					:name="strings.hours"
					class="info-hours-row"
					align
				>
					<template #content>
						<div class="aioseo-col col-xs-12 text-xs-left">
							<base-toggle>
								{{ strings.open247 }}
							</base-toggle>
						</div>
						<div class="aioseo-col col-xs-12 text-xs-left mt-16">
							<base-toggle>
								{{ strings.use24hFormat }}
							</base-toggle>
						</div>

						<div
							class="aioseo-col col-xs-12 text-xs-left"
						>
							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.monday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>

							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.tuesday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>

							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.wednesday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>

							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.thursday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>

							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.friday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>

							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.saturday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>

							<div class="aioseo-col-flex text-xs-left">
								<div class="aioseo-col-day text-xs-left">
									{{ strings.sunday }}
								</div>
								<div class="aioseo-col-hours text-xs-left">
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
									<span class="separator">-</span>
									<base-select
										size="medium"
										:options="$constants.HOURS_24H_FORMAT"
									/>
								</div>
								<div class="aioseo-col-alwaysopen text-xs-left">
									<base-checkbox
										size="medium"
									>
											{{ strings.open24h }}
									</base-checkbox>

									<base-checkbox
										size="medium"
										class="closed-label"
									>
											{{ strings.closed }}
									</base-checkbox>
								</div>
							</div>
						</div>
					</template>
				</core-settings-row>
			</core-blur>

			<cta
				:cta-link="$links.getPricingUrl('local-seo', 'local-seo-upsell', 'opening-hours')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('local-seo', null, 'home')"
				:feature-list="features"
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					{{ strings.locationInfo1 }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			features : [
				this.$t.__('Show Opening Hours', this.$td),
				this.$t.__('Multiple Locations', this.$td),
				this.$t.__('Opening Hours block, widget and shortcode', this.$td)
			],
			strings : {
				locationInfo1       : this.$t.__('Local Business schema markup enables you to tell Google about your business, including your business name, address and phone number, opening hours and price range. This information may be displayed as a Knowledge Graph card or business carousel.', this.$td),
				openingHours        : this.$t.__('Opening Hours Settings', this.$td),
				displayOpeningHours : this.$t.__('Display Opening Hours', this.$td),
				labels              : this.$t.__('Labels', this.$td),
				closedLabel         : this.$t.__('Closed label', this.$td),
				closedLabelDesc     : this.$t.__('Text to display when \'Closed\' setting is checked', this.$td),
				alwaysOpenLabel     : this.$t.__('Open 24h label', this.$td),
				alwaysOpenLabelDesc : this.$t.__('Text to display when \'Open 24h\' setting is checked', this.$td),
				open247             : this.$t.__('Open 24/7', this.$td),
				use24hFormat        : this.$t.__('Use 24h format', this.$td),
				timezone            : this.$t.__('Timezone', this.$td),
				selectTimeZone      : this.$t.__('Select your timezone:', this.$td),
				hours               : this.$t.__('Opening Hours', this.$td),
				monday              : this.$t.__('Monday', this.$td),
				tuesday             : this.$t.__('Tuesday', this.$td),
				wednesday           : this.$t.__('Wednesday', this.$td),
				thursday            : this.$t.__('Thursday', this.$td),
				friday              : this.$t.__('Friday', this.$td),
				saturday            : this.$t.__('Saturday', this.$td),
				sunday              : this.$t.__('Sunday', this.$td),
				open24h             : this.$t.__('Open 24h', this.$td),
				closed              : this.$t.__('Closed', this.$td),
				ctaButtonText       : this.$t.__('Upgrade to Pro and Unlock Local SEO', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader           : this.$t.sprintf(this.$t.__('Local SEO is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				selectTimeZoneCTA   : this.$t.__('Select your timezone', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-opening-hours {
	.aioseo-input,
	.aioseo-select,
	.aioseo-multiselect {
		max-width: 480px;
	}
	.mt-10 {
		display: inline-block;
		margin-top: 10px;
		font-size: 14px;
	}
	.mt-16 {
		margin-top: 16px;
	}
}
.aioseo-col-flex {
	display: flex;
	align-items: center;
	padding: 12px 0;
	border-bottom: 1px solid $border;
	&:first-of-type {
		padding-top: 0;
	}
	&:last-of-type {
		padding-bottom: 0;
		border: none;
	}
	.aioseo-col-day {
		flex: 1
	}
	.aioseo-col-hours,
	.aioseo-col-alwaysopen {
		flex: 2
	}
	span.separator {
		margin: 0 20px;
	}
	.aioseo-select {
		display: inline-block;
		max-width: 125px;
	}
	.multiselect--disabled {
		.multiselect__tags,
		.multiselect__single {
			background: $background;
		}
	}
}
</style>
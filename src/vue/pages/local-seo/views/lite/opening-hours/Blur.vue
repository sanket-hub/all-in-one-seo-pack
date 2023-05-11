<template>
	<div class="aioseo-opening-hours-blur">
		<core-blur>
			<core-settings-row
				:name="strings.showOpeningHours"
				class="info-openinghours-row"
				align
			>
				<template #content>
					<div class="aioseo-col col-xs-12 text-xs-left">
						<base-radio-toggle
							name="openingHours"
							:modelValue="true"
							:options="[
								{ label: $constants.GLOBAL_STRINGS.no, value: false },
								{ label: $constants.GLOBAL_STRINGS.yes, value: true }
							]"
						/>
					</div>
				</template>
			</core-settings-row>

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

					<div class="aioseo-col col-xs-12 text-xs-left">
						<div class="aioseo-col-flex text-xs-left">
							<div class="aioseo-col-day text-xs-left">
								{{ strings.monday }}
							</div>
							<div class="aioseo-col-hours text-xs-left">
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
									modelValue="09:00"
								/>
								<span class="separator">-</span>
								<base-select
									size="medium"
									:options="$constants.HOURS_24H_FORMAT"
									modelValue="17:00"
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
	</div>
</template>

<script>
import BaseCheckbox from '@/vue/components/common/base/Checkbox'
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
export default {
	components : {
		BaseCheckbox,
		BaseRadioToggle,
		CoreBlur,
		CoreSettingsRow
	},
	data () {
		return {
			strings : {
				showOpeningHours    : this.$t.__('Show Opening Hours', this.$td),
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
				closed              : this.$t.__('Closed', this.$td)
			}
		}
	}
}
</script>
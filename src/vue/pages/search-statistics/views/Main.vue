<template>
	<core-main
		:page-name="strings.pageName"
		:exclude-tabs="excludeTabs"
		:showTabs="!excludeTabs.includes($route.name)"
		:containerClasses="containerClasses"
	>
		<template #extra>
			<base-date-picker
				v-if="showDatePicker"
				@change="onDateChange"
				@updated="rolling => highlightShortcut(rolling)"
				:defaultValue="defaultRange"
				:defaultRolling="$aioseo.searchStatistics.rolling"
				:isDisabledDate="isDisabledDate"
				:shortcuts="datepickerShortcuts"
				size="small"
			/>
		</template>

		<div>
			<authentication-alert />

			<div
				v-if="showConnectCta"
				class="connect-cta"
			>
				<core-blur>
					<component :is="$route.name" />
				</core-blur>

				<cta
					cta-button-action
					@cta-button-click="connect"
					:cta-button-loading="loadingConnect"
					:show-link="false"
					:button-text="strings.ctaButtonText"
					:alignTop="true"
					:feature-list="[
						strings.feature1,
						strings.feature2,
						strings.feature3,
						strings.feature4
					]"
				>
					<template #header-text>
						{{ strings.ctaHeaderText }}
					</template>
					<template #description>
						{{ strings.ctaDescription }}
					</template>
				</cta>
			</div>

			<component
				v-if="!showConnectCta"
				:is="$route.name"
			/>
		</div>
	</core-main>
</template>

<script>
import { DateTime } from 'luxon'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import AuthenticationAlert from './partials/AuthenticationAlert'
import BaseDatePicker from '@/vue/components/common/base/DatePicker'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreMain from '@/vue/components/common/core/main/Index'
import ContentRankings from './ContentRankings'
import Cta from '@/vue/components/common/cta/Index'
import Dashboard from './Dashboard'
import KeywordRankings from './KeywordRankings'
import PostDetail from './AIOSEO_VERSION/PostDetail'
import SeoStatistics from './SeoStatistics'
import Settings from './AIOSEO_VERSION/Settings'
export default {
	emits      : [ 'rolling' ],
	components : {
		AuthenticationAlert,
		BaseDatePicker,
		CoreBlur,
		CoreMain,
		ContentRankings,
		Cta,
		Dashboard,
		KeywordRankings,
		PostDetail,
		Settings,
		SeoStatistics
	},
	data () {
		return {
			maxDate        : null,
			minDate        : null,
			loadingConnect : false,
			strings        : {
				pageName       : this.$t.__('Search Statistics', this.$td),
				ctaHeaderText  : this.$t.__('Connect your website to Google Search Console', this.$td),
				ctaDescription : this.$t.__('Connect to Google Search Console to receive valuable insights on how your content is being discovered. Identify areas for improvement in order to improve search engine rankings and drive more traffic to your website.', this.$td),
				ctaButtonText  : this.$t.__('Connect to Google Search Console', this.$td),
				feature1       : this.$t.__('Search traffic insights', this.$td),
				feature2       : this.$t.__('Improved visibility', this.$td),
				feature3       : this.$t.__('Track page and keyword rankings', this.$td),
				feature4       : this.$t.__('Speed tests for individual pages/posts', this.$td)
			}
		}
	},
	computed : {
		...mapState('search-statistics', [
			'range',
			'isConnected',
			'fetching',
			'scanPercentage',
			'showScanPopup',
			'unverifiedSite'
		]),
		...mapGetters([ 'isUnlicensed' ]),
		defaultRange () {
			const start = new Date(`${this.range.start} 00:00:00`)
			const end   = new Date(`${this.range.end} 00:00:00`)

			return [ start, end ]
		},
		excludeTabs () {
			const exclude = [ 'post-detail' ]

			if (this.isUnlicensed || !this.$license.hasCoreFeature(this.$aioseo, 'search-statistics')) {
				exclude.push('settings')
			}

			return exclude
		},
		isSettings () {
			return 'settings' === this.$route.name
		},
		showConnectCta () {
			return ((this.$license.hasCoreFeature(this.$aioseo, 'search-statistics') && !this.isConnected) || this.unverifiedSite) && !this.isSettings
		},
		showDatePicker () {
			return ![ 'settings', 'content-rankings' ].includes(this.$route.name) && this.isConnected && !this.unverifiedSite
		},
		containerClasses () {
			const classes = []

			// Add the blur to the main container if we are fetching data.
			if (this.fetching) {
				classes.push('aioseo-blur')
			}

			return classes
		},
		getOriginalMaxDate () {
			if (!this.$aioseo.searchStatistics.latestAvailableDate) {
				return DateTime.local().plus({ days: -2 })
			}

			return DateTime.fromFormat(this.$aioseo.searchStatistics.latestAvailableDate, 'yyyy-MM-dd').setZone(DateTime.zone) ||
				DateTime.local().plus({ days: -2 })
		},
		datepickerShortcuts () {
			return [
				{
					text  : this.$t.__('Last 7 Days', this.$td),
					value : () => {
						window.aioseoBus.$emit('rolling', 'last7Days')
						return [ this.getOriginalMaxDate.plus({ days: -6 }).toJSDate(), this.getOriginalMaxDate.toJSDate() ]
					}
				},
				{
					text  : this.$t.__('Last 28 Days', this.$td),
					value : () => {
						window.aioseoBus.$emit('rolling', 'last28Days')
						return [ this.getOriginalMaxDate.plus({ days: -27 }).toJSDate(), this.getOriginalMaxDate.toJSDate() ]
					}
				},
				{
					text  : this.$t.__('Last 3 Months', this.$td),
					value : () => {
						window.aioseoBus.$emit('rolling', 'last3Months')
						return [ this.getOriginalMaxDate.plus({ days: -89 }).toJSDate(), this.getOriginalMaxDate.toJSDate() ]
					}
				}
			]
		}
	},
	methods : {
		...mapActions('search-statistics', [ 'setDateRange', 'getAuthUrl' ]),
		...mapMutations('search-statistics', [ 'toggleShowScanPopup' ]),
		isDisabledDate (date) {
			if (null === this.minDate) {
				return true
			}

			return date.getTime() < this.minDate.getTime() || date.getTime() > this.maxDate.getTime()
		},
		onDateChange (dateRange, rolling) {
			this.setDateRange({
				dateRange,
				rolling
			})
		},
		connect () {
			this.loadingConnect = true
			this.getAuthUrl()
				.then(url => {
					window.location = url
				})
		},
		highlightShortcut (rolling) {
			if (!rolling) {
				return
			}

			const shortcutButtons = document.querySelectorAll('.el-picker-panel__shortcut')
			shortcutButtons.forEach((button) => {
				switch (button.innerText) {
					case this.$t.__('Last 7 Days', this.$td) :
						if ('last7Days' === rolling) {
							button.classList.add('active')
						} else {
							button.classList.remove('active')
						}
						break
					case this.$t.__('Last 28 Days', this.$td) :
						if ('last28Days' === rolling) {
							button.classList.add('active')
						} else {
							button.classList.remove('active')
						}
						break
					case this.$t.__('Last 3 Months', this.$td) :
						if ('last3Months' === rolling) {
							button.classList.add('active')
						} else {
							button.classList.remove('active')
						}
						break
					case this.$t.__('Last 6 Months', this.$td) :
						if ('last6Months' === rolling) {
							button.classList.add('active')
						} else {
							button.classList.remove('active')
						}
						break
					default:
						button.classList.remove('active')
				}
			})
		}
	},
	mounted () {
		// GSC only gives us data for a max of 16 months.
		// This means that we can't allow the user to select a date range that is more than 16 months.
		this.minDate = DateTime.now().plus({ months: -16 }).toJSDate()
		this.maxDate = this.getOriginalMaxDate.toJSDate()
	}
}
</script>

<style lang="scss">
.aioseo-app {
	.aioseo-card {
		margin: 0 0 20px;

		// Styles for the CardFooter be aligned on bottom.
		&:has(.aioseo-card-footer) {
			position: relative;
			padding-bottom: 44px;

			.content {
				position: static;
			}
		}
	}

	.aioseo-datepicker-picker {
		font-weight: 700;
	}

	.aioseo-wp-table {
		tbody {
			td {
				font-size: 14px;
			}

			.post-title,
			.keyword {
				a {
					font-weight: bold;
					color: $black;

					&:hover {
						color: $blue;
					}
				}
			}

			.no-results {
				font-size: 16px;
			}
		}
	}

	.connect-cta {
		position: relative;
	}
}
</style>
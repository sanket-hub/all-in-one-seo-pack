<template>
	<div class="aioseo-modal-content">
		<div class="mobile-radio-buttons">
			<core-main-tabs
				:tabs="getTabs"
				:showSaveButton="false"
				:active="metaBoxTabs.modal"
				internal
				@changed="value => processChangeTab(value)"
			/>
		</div>

		<div class="component-wrapper">
			<transition name="route-fade" mode="out-in">
				<component
					:is="this.activeTab"
					parentComponentContext="modal"
				/>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import General from './General'
import Social from './Social'
import SvgSettings from '@/vue/components/common/svg/Settings'
import SvgShare from '@/vue/components/common/svg/Share'
export default {
	components : {
		CoreMainTabs,
		CoreSettingsRow,
		General,
		Social,
		SvgSettings,
		SvgShare
	},
	data () {
		return {
			activeTab : 'general',
			strings   : {
				pageName : this.$t.__('Modal Content', this.$td)
			},
			tabs : [
				{
					slug : 'general',
					icon : 'svg-settings',
					name : 'General'
				},
				{
					slug : 'social',
					icon : 'svg-share',
					name : 'Social'
				}
			]
		}
	},
	computed : {
		...mapState([ 'metaBoxTabs' ]),
		getTabs () {
			return this.tabs.filter(tab => this.$allowed(`aioseo_page_${tab.slug}_settings`))
		}
	},
	methods : {
		...mapMutations([ 'changeTabSettings' ]),
		processChangeTab (newTabValue) {
			this.activeTab = newTabValue
			this.changeTabSettings({ setting: 'modal', value: newTabValue })
		}
	}
}
</script>
<style lang="scss">
.aioseo-modal-content {
	.mobile-radio-buttons {
		display: block!important;
		> .col-md-3 {
			display: none;
		}
		> .col-md-9 {
			padding: 0;
			flex-basis: 100%!important;
			max-width: 100%!important;
		}
	}
	.aioseo-settings-row {
		> .col-md-3 {
			padding-bottom: 0;
		}
		> .col-md-3,
		> .col-md-9 {
			flex-basis: 100%;
			max-width: 100%;
		}
	}
	> .aioseo-settings-row {
		.aioseo-tabs {
			&.internal {
				padding-left: 40px;
			}
			.md-button-content {
				display: flex;
				align-items: center;
				svg {
					display: inline;
					width: 16px;
					height: 16px;
				}
			}
			.md-button {
				&:before {
					height: auto!important;
					border-radius: 0!important;
				}
				.label {
					display: inline!important;
					margin-left: 10px;
				}
			}
		}
	}
	> .aioseo-settings-row.mobile-radio-buttons {
		.md-button {
			max-height: 46px;
		}
	}
	.aioseo-tab-content {
		position: relative;
		padding: 30px 40px !important;
		&.aioseo-post-social {
			padding: 22px 40px !important;
		}
	}
}
</style>
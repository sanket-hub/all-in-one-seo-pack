<template>
	<div class="aioseo-app aioseo-post-settings">
		<core-main-tabs
			:tabs="tabs"
			:showSaveButton="false"
			:active="tab"
			internal
			disableMobile
			@changed="value => processChangeTab(value)"
		/>
		<transition name="route-fade" mode="out-in">
			<component
				:is="tab"
			/>
		</transition>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BusinessInfo from './BusinessInfo'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import OpeningHours from './OpeningHours'
import Maps from './Maps'
import SvgSettings from '@/vue/components/common/svg/Settings'
import { debounce } from '@/vue/utils/debounce'

export default {
	components : {
		BusinessInfo,
		CoreMainTabs,
		OpeningHours,
		Maps,
		SvgSettings
	},
	watch : {
		currentPost : {
			deep : true,
			handler () {
				debounce(this.savePostState, 250)
			}
		}
	},
	data () {
		return {
			tab  : 'business-info',
			tabs : [
				{
					slug : 'business-info',
					icon : 'svg-settings',
					name : this.$t.__('Business Info', this.$td)
				},
				{
					slug : 'opening-hours',
					icon : 'svg-settings',
					name : this.$t.__('Opening Hours', this.$td)
				},
				{
					slug : 'maps',
					icon : 'svg-settings',
					name : this.$t.__('Maps', this.$td)
				}
			]
		}
	},
	computed : {
		...mapState([ 'currentPost' ])
	},
	methods : {
		...mapActions([ 'savePostState' ]),
		processChangeTab (newTabValue) {
			this.tab = newTabValue
		}
	}
}
</script>
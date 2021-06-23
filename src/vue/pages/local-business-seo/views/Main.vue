<template>
	<div class="aioseo-app">
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
import BusinessInfo from './BusinessInfo' // TODO: Use code from local-seo
import OpeningHours from './OpeningHours' // TODO: Use code from local-seo
import { debounce } from '@/vue/utils/debounce'
export default {
	components : {
		BusinessInfo,
		OpeningHours
	},
	watch : {
		currentPost : {
			deep : true,
			handler () {
				debounce(() => {
					this.savePostState()
				}, 250)
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
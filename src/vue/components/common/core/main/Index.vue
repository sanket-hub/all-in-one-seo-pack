<template>
	<div>
		<core-notifications />

		<div class="aioseo-main">
			<core-header
				:page-name="pageName"
			/>
			<grid-container>
				<core-main-tabs
					:key="tabsKey"
					v-if="showTabs"
					:tabs="tabs"
					:showSaveButton="shouldShowSaveButton"
				/>

				<transition name="route-fade" mode="out-in">
					<slot />
				</transition>

				<div
					v-if="shouldShowSaveButton"
					class="save-changes"
				>
					<base-button
						type="blue"
						size="medium"
						:loading="loading"
						@click="processSaveChanges"
					>
						{{ strings.saveChanges }}
					</base-button>
				</div>
			</grid-container>
		</div>

		<core-help
			v-if="helpPanel.docs && Object.keys(helpPanel.docs).length"
		/>
	</div>
</template>

<script>
import '@/vue/assets/scss/main.scss'
import { getParams, removeParam } from '@/vue/utils/params'
import { SaveChanges } from '@/vue/mixins'
import { mapGetters, mapMutations, mapState } from 'vuex'
import CoreHeader from '@/vue/components/common/core/Header'
import CoreHelp from '@/vue/components/common/core/Help'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import CoreNotifications from '@/vue/components/common/core/Notifications'
import GridContainer from '@/vue/components/common/grid/Container'
export default {
	components : {
		CoreHeader,
		CoreHelp,
		CoreMainTabs,
		CoreNotifications,
		GridContainer
	},
	mixins : [ SaveChanges ],
	props  : {
		pageName : {
			type     : String,
			required : true
		},
		showTabs : {
			type : Boolean,
			default () {
				return true
			}
		},
		showSaveButton : {
			type : Boolean,
			default () {
				return true
			}
		},
		excludeTabs : {
			type : Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			tabsKey : 0,
			strings : {
				saveChanges : this.$t.__('Save Changes', this.$td)
			}
		}
	},
	watch : {
		excludeTabs () {
			this.tabsKey += 1
		}
	},
	computed : {
		...mapGetters([ 'settings' ]),
		...mapState([ 'loading', 'options', 'showNotifications', 'helpPanel', 'notifications' ]),
		tabs () {
			return this.$router.options.routes
				.filter(route => route.name && route.meta && route.meta.name)
				.filter(route => this.$allowed(route.meta.access))
				.filter(route => {
					if ('lite' === route.meta.display && this.$isPro) {
						return false
					}
					if ('pro' === route.meta.display && !this.$isPro) {
						return false
					}
					return true
				})
				.filter(route => !this.excludeTabs.includes(route.name))
				.map(route => {
					return {
						slug   : route.name,
						name   : route.meta.name,
						url    : { name: route.name },
						access : route.meta.access,
						pro    : !!route.meta.pro
					}
				})
		},
		shouldShowSaveButton () {
			if (this.$route && this.$route.name) {
				const route = this.$router.options.routes.find(route => route.name === this.$route.name)
				if (route && route.meta && route.meta.hideSaveButton) {
					return false
				}
			}
			return this.showSaveButton
		}
	},
	methods : {
		...mapMutations([ 'toggleNotifications', 'disableForceShowNotifications' ])
	},
	mounted () {
		if (getParams().notifications) {
			if (!this.showNotifications) {
				this.toggleNotifications()
			}

			setTimeout(() => {
				removeParam('notifications')
			}, 500)
		}

		if (this.notifications.force && this.notifications.active.length) {
			// First, disable the force show.
			this.disableForceShowNotifications()

			// Then show the notifications.
			this.toggleNotifications()
		}
	}
}
</script>
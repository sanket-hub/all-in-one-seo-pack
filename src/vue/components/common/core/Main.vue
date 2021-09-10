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
					:showSaveButton="showSaveButton"
				/>

				<transition name="route-fade" mode="out-in">
					<slot />
				</transition>

				<div
					v-if="showSaveButton"
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
import '@/vue/components/AIOSEO_VERSION'
// import { debounce } from '@/vue/utils/debounce' // @TODO: [V4+] If we auto-save in the future, add this back in.
import { getParams, removeParam } from '@/vue/utils/params'
import { SaveChanges } from '@/vue/mixins'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
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
		// @TODO: [V4+] Maybe auto-save again in the future? for now, let's play it safe.
		// options : {
		//  deep : true,
		//  handler () {
		//      debounce(() => this.saveChanges(), 1000)
		//  }
		// }
	},
	computed : {
		...mapGetters([ 'settings' ]),
		...mapState([ 'loading', 'options', 'showNotifications', 'helpPanel' ]),
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
		}
	},
	methods : {
		...mapMutations([ 'toggleNotifications' ])
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
	}
}
</script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { MetaTag } from '@/vue/mixins'
export const WebmasterTools = {
	mixins : [ MetaTag ],
	props  : {
		tool : {
			type     : Object,
			required : true
		},
		isConnected : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options' ])
	}
}

export const MiOrEm = {
	data () {
		return {
			installingPlugin  : false,
			miInstalled       : false,
			miInstalledFailed : false,
			showMiPromo       : true
		}
	},
	computed : {
		gaActivated () {
			return this.$aioseo.plugins.miLite.activated ||
				this.$aioseo.plugins.emLite.activated ||
				this.$aioseo.plugins.miPro.activated ||
				this.$aioseo.plugins.emPro.activated
		},
		prefersEm () {
			return (this.$aioseo.plugins.emLite.installed ||
				this.$aioseo.plugins.emPro.installed) &&
				(!this.$aioseo.plugins.miLite.installed &&
				!this.$aioseo.plugins.miPro.installed)
		}
	},
	methods : {
		...mapActions([ 'installPlugins', 'upgradePlugins' ]),
		installMi () {
			this.installingPlugin = true
			this.installPlugins([
				{
					plugin : 'miLite',
					type   : 'plugin'
				}
			])
				.then(response => {
					this.installingPlugin = false
					if (response.body.failed.length) {
						this.miInstalledFailed = true
						return
					}

					this.miInstalled = true
					setTimeout(() => {
						this.showMiPromo = false

						// Update the active status globally.
						this.$aioseo.plugins.miLite.activated  = true
						window.aioseo.plugins.miLite.activated = true
					}, 3000)
				})
				.catch(error => {
					console.error(error)
				})
		}
	}
}
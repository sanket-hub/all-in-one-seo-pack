import { mapActions } from 'vuex'
export const SaveChanges = {
	methods : {
		...mapActions([ 'saveChanges', 'saveHtaccess', 'saveNetworkRobots' ]),
		processSaveChanges () {
			this.$store.commit('loading', true)
			let switchBack = false,
				saved      = false,
				action     = 'saveChanges'
			setTimeout(() => {
				switchBack = true
				if (saved) {
					this.$store.commit('loading', false)
				}
			}, 1500)

			if ('htaccess-editor' === this.$store.state.route.name) {
				action = 'saveHtaccess'
				this.$store.commit('setHtaccessError', null)
			}

			if (
				this.$aioseo.data.isNetworkAdmin &&
				'robots-editor' === this.$store.state.route.name
			) {
				action = 'saveNetworkRobots'
			}

			this[action]()
				.then(response => {
					if (response && response.body.redirection) {
						return
					}

					if (switchBack || 'htaccess-editor' === this.$store.state.route.name) {
						this.$store.commit('loading', false)
					} else {
						saved = true
					}

					this.$bus.$emit('changes-saved')
				})
		}
	}
}
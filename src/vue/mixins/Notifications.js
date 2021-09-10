import { mapGetters, mapMutations } from 'vuex'
export const Notifications = {
	data () {
		return {
			strings : {
				notifications       : this.$t.__('Notifications', this.$td),
				newNotifications    : this.$t.__('New Notifications', this.$td),
				activeNotifications : this.$t.__('Active Notifications', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'activeNotifications', 'activeNotificationsCount', 'dismissedNotifications', 'dismissedNotificationsCount' ]),
		notificationsCount () {
			return this.dismissed ? this.dismissedNotificationsCount : this.activeNotificationsCount
		},
		notifications () {
			return this.dismissed ? this.dismissedNotifications : this.activeNotifications
		},
		notificationTitle () {
			return this.dismissed ? this.strings.notifications : this.strings.newNotifications
		}
	},
	methods : {
		...mapMutations([ 'toggleDismissedNotifications', 'toggleNotifications' ]),
		async canShowImage (url) {
			if (!url) {
				return false
			}

			let canShow = false

			const image = new Image()
			image.onload = await (() => {
				canShow = true

				let ratio    = 0
				const width  = image.width
				const height = image.height

				if (width && height) {
					ratio = width / height
				}

				if (this.images[url]) {
					return
				}

				this.$set(this.images, url, {
					image,
					ratio,
					vertical : (1.5 > ratio || 2 < ratio) || 600 > width || 315 > height
				})
			})

			image.src = url

			return canShow
		}
	}
}
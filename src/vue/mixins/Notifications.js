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
		...mapMutations([ 'toggleDismissedNotifications', 'toggleNotifications' ])
	}
}
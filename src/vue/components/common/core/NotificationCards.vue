<template>
	<div class="aioseo-notification-cards">
		<template
			v-if="notifications.length"
		>
			<component
				:is="notification.component ? notification.component : 'core-notification'"
				v-for="notification in notifications"
				:key="notification.slug"
				:notification="notification"
				ref="notification"
				@dismissed-notification="$emit('dismissed-notification')"
			/>
		</template>

		<div
			v-if="!notifications.length"
			key="no-notifications"
		>
			<slot name="no-notifications">
				<div class="no-notifications">
					<img
						alt="Dannie the Detective"
						:src="$getImgUrl(dannieDetectiveImg)"
					/>

					<div class="great-scott">
						{{ strings.greatScott }}
					</div>
					<div class="no-new-notifications">
						{{ strings.noNewNotifications }}
					</div>
					<a
						v-if="dismissedCount"
						href="#"
						class="dismiss"
						@click.stop="$emit('toggle-dismissed')"
					>
						{{ strings.seeDismissed }}
					</a>
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
import dannieDetectiveImg from '@/vue/assets/images/aio/dannie-detective.png'
import CoreNotification from '@/vue/components/common/core/Notification'
import NotificationsReview from '@/vue/components/common/notifications/Review'
import NotificationsReview2 from '@/vue/components/common/notifications/Review2'
import NotificationsUnlicensedAddons from '@/vue/components/common/notifications/UnlicensedAddons'
export default {
	components : {
		CoreNotification,
		NotificationsReview,
		NotificationsReview2,
		NotificationsUnlicensedAddons
	},
	props : {
		dismissedCount : {
			type     : Number,
			required : true
		},
		notifications : {
			type     : Array,
			required : true
		}
	},
	data () {
		return {
			dannieDetectiveImg,
			strings : {
				greatScott         : this.$t.__('Great Scott! Where\'d they all go?', this.$td),
				noNewNotifications : this.$t.__('You have no new notifications.', this.$td),
				seeDismissed       : this.$t.__('See Dismissed Notifications', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-notification-cards {
	.aioseo-notification:last-child {
		> div {
			border-bottom: none;
			margin-bottom: none;
		}
	}

	.no-notifications {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 100px;
		font-size: 16px;
		color: $placeholder-color;

		img {
			width: 30%;
			height: auto;
		}

		.great-scott {
			margin: 20px 0 10px;
			font-size: 24px;
			font-weight: 600;
			color: $black2;
		}

		.no-new-notifications {
			margin-bottom: 10px;
		}
	}
}
</style>
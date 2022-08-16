<template>
	<transition-slide
		class="aioseo-notification"
		:active="active"
	>
		<div>
			<div class="icon">
				<svg-circle-check class="success" />
			</div>

			<div class="body">
				<div class="title">
					<div>{{ title }}</div>
				</div>
				<div
					class="notification-content"
					v-html="content"
				/>

				<div class="actions">
					<base-button
						tag="a"
						href="https://wordpress.org/support/plugin/all-in-one-seo-pack/reviews/?filter=5#new-post"
						size="small"
						type="blue"
						target="_blank"
						rel="noopener noreferrer"
						@click="processDismissNotification(false)"
					>
						{{ strings.okYouDeserveIt }}
					</base-button>

					<base-button
						size="small"
						type="gray"
						@click.stop.prevent="processDismissNotification(true)"
					>
						{{ strings.nopeMaybeLater }}
					</base-button>

					<a
						v-if="!notification.dismissed"
						href="#"
						class="dismiss"
						@click.stop.prevent="processDismissNotification(false)"
					>{{ strings.dismiss }}</a>
				</div>
			</div>
		</div>
	</transition-slide>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
import TransitionSlide from '@/vue/components/common/transition/Slide'
export default {
	components : {
		SvgCircleCheck,
		TransitionSlide
	},
	props : {
		notification : {
			type     : Object,
			required : true
		}
	},
	data () {
		return {
			active  : true,
			strings : {
				dismiss        : this.$t.__('Dismiss', this.$td),
				yesILoveIt     : this.$t.__('Yes, I love it!', this.$td),
				notReally      : this.$t.__('Not Really...', this.$td),
				okYouDeserveIt : this.$t.__('Ok, you deserve it', this.$td),
				nopeMaybeLater : this.$t.__('Nope, maybe later', this.$td),
				giveFeedback   : this.$t.__('Give feedback', this.$td),
				noThanks       : this.$t.__('No thanks', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'options' ]),
		title () {
			return this.$t.sprintf(
				// Translators: 1 - The plugin short name ("AIOSEO").
				this.$t.__('Are you enjoying %1$s?', this.$td),
				import.meta.env.VITE_SHORT_NAME
			)
		},
		content () {
			return this.$t.sprintf(
				// Translators: 1 - The plugin name ("All in One SEO").
				this.$t.__('Hey, I noticed you have been using %1$s for some time - that’s awesome! Could you please do me a BIG favor and give it a 5-star rating on WordPress to help us spread the word and boost our motivation?', this.$td),
				'<strong>' + import.meta.env.VITE_NAME + '</strong>'
			) +
			'<br><br><strong>~ Syed Balkhi<br>' +
			this.$t.sprintf(
				// Translators: 1 - The plugin name ("All in One SEO").
				this.$t.__('CEO of %1$s', this.$td),
				import.meta.env.VITE_NAME
			) + '</strong>'
		}
	},
	methods : {
		...mapActions([ 'dismissNotifications', 'processButtonAction' ]),
		processDismissNotification (delay = false) {
			this.active = false
			this.dismissNotifications([ this.notification.slug + (delay ? '-delay' : '') ])
			this.$emit('dismissed-notification')
		}
	}
}
</script>

<style lang="scss">
.aioseo-notification {
	margin-bottom: 20px;

	> div {
		display: flex;
		align-items: flex-start;
		padding-bottom: 10px;
		border-bottom: 1px solid $border;

		.icon {
			margin-right: 20px;

			svg {
				width: 20px;
				height: 20px;
				color: $green;

				&.warning {
					color: $orange;
				}

				&.info {
					color: $blue;
				}

				&.success {
					color: $green;
				}

				&.error {
					color: $red;
				}
			}
		}

		.body {
			margin-right: 20px;
			flex: 1;

			.title {
				font-size: 16px;
				font-weight: 600;
				color: $black;
				margin-bottom: 7px;
				display: flex;
				align-items: center;

				div:first-child {
					flex: 1;
					margin-right: 5px;
					line-height: 1.4;
				}
			}

			.notification-content {
				margin-bottom: 10px;
				max-width: 400px;
			}

			.actions {
				flex-wrap: wrap;
				display: flex;
				align-items: center;

				> * {
					margin-bottom: 10px;
				}

				.aioseo-button {
					margin-right: 20px;
				}

				.dismiss {
					color: $placeholder-color;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
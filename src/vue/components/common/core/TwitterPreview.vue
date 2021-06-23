<template>
	<div class="aioseo-twitter-preview">
		<div class="twitter-post">
			<div class="twitter-header">
				<div class="profile-photo">
					<img src="@/vue/assets/images/aio/dannie-profile.png" />
				</div>
				<div class="poster">
					<div class="poster-name">
						{{ appName }}
					</div>
					<div class="poster-username">
						@aioseopack
					</div>
				</div>
			</div>
			<div
				class="twitter-container"
				:class="'summary_large_image' === getCard && !image ? 'summary' : getCard"
			>
				<div class="twitter-content">
					<div
						v-if="canShowImage(image) || !image"
						class="twitter-image-preview"
						:style="{
							backgroundImage: 'summary' === getCard ? `url('${image}')` : ''
						}"
					>
						<svg-book
							v-if="!image"
						/>
						<img
							v-if="'summary_large_image' === getCard && image"
							:src="image"
						/>
					</div>

					<div class="twitter-site-description">
						<div class="site-title">
							<slot name="site-title" />
						</div>
						<div class="site-description">
							<slot name="site-description" />
						</div>
						<div class="site-domain">
							{{ $aioseo.urls.domain }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { CanShowImage } from '@/vue/mixins'
import { mapState } from 'vuex'
export default {
	mixins : [ CanShowImage ],
	props  : {
		image : String,
		card  : String
	},
	computed : {
		...mapState([ 'options' ]),
		appName () {
			return process.env.VUE_APP_NAME
		},
		getCard () {
			if ('default' === this.card) {
				return this.options.social.twitter.general.defaultCardType
			}

			return this.card
		}
	}
}
</script>

<style lang="scss">
.aioseo-twitter-preview {
	background-color: $fb-background;
	padding: 30px;
	display: flex;
	align-items: center;
	justify-content: center;

	.twitter-post {
		width: 100%;
		max-width: 500px;
		border-radius: 5px;
		border: 1px solid #E1E8ED;
		background-color: #fff;

		.twitter-header {
			height: 65px;
			padding: 0 18px;
			display: flex;
			align-items: center;

			.profile-photo {
				overflow: hidden;
				width: 40px;
				height: 40px;
				border: 1px solid $border;
				border-radius: 50%;

				img {
					height: 100%;
					width: 100%;
				}
			}

			.poster {
				margin-left: 10px;
				flex: 1 0 auto;

				.poster-name {
					font-size: 15px;
					color: #1C2022;
					font-weight: 600;
				}
				.poster-username {
					color: #697882;
					font-weight: 500;
					font-size: 13px;
				}
			}
		}

		.twitter-container {
			padding: 0 20px 20px 20px;

			&.summary {
				.twitter-content {
					flex-direction: row;

					.twitter-image-preview {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #E1E8ED;
						min-width: 125px;
						min-height: 125px;
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center center;

						svg.aioseo-book {
							width: 50px;
							height: 50px;
							color: #8999A5;
						}
					}
				}
			}

			.twitter-content {
				border-radius: 10px;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				border: 1px solid #E1E8ED;

				img {
					width: 100%;
					height: auto;
				}

				.twitter-site-description {
					padding: 18px;
					color: #1C2022;

					.site-domain {
						font-size: 14px;
						color: #8899A6;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.site-title {
						font-size: 15px;
						font-weight: 600;
					}

					.site-description {
						font-size: 14px;
						margin: 5px 0;
					}
				}
			}
		}
	}
}
</style>
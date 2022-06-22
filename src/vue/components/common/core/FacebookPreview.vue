<template>
	<div class="aioseo-facebook-preview">
		<div class="facebook-post">
			<div class="facebook-header">
				<div class="profile-photo">
					<img
						alt="Facebook Preview Image"
						:src="$getImgUrl(dannieProfileImg)"
					/>
				</div>
				<div class="poster">
					<div class="poster-name">
						{{ appName }}
					</div>
					<div class="poster-date">
						{{ date }}
					</div>
				</div>
				<div class="ellipsis">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div
				class="facebook-content"
				:class="{ vertical: images[image] && images[image].vertical }"
			>
				<base-img
					:debounce="false"
					:src="image"
					@images="results => images = results"
				/>

				<div v-if="loading" class="loader">
					<core-loader />
				</div>

				<div class="facebook-site-description">
					<div class="site-domain">
						<slot name="site-url">
							{{ $aioseo.urls.domain }}
						</slot>
					</div>
					<div class="site-title">
						<slot name="site-title" />
					</div>
					<div class="site-description">
						<slot name="site-description" />
					</div>
				</div>
			</div>

			<div class="facebook-footer"></div>
		</div>
	</div>
</template>

<script>
import dannieProfileImg from '@/vue/assets/images/aio/dannie-profile.png'
import BaseImg from '@/vue/components/common/base/Img'
import CoreLoader from '@/vue/components/common/core/Loader'
export default {
	components : {
		BaseImg,
		CoreLoader
	},
	props : {
		image   : String,
		loading : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	data () {
		return {
			dannieProfileImg,
			images : {}
		}
	},
	computed : {
		appName () {
			return import.meta.env.VITE_NAME
		},
		date () {
			const today = new Date()
			return today.toLocaleString('default', { month: 'long' }) + ' ' + today.getDay()
		}
	}
}
</script>

<style lang="scss">
.aioseo-facebook-preview {
	background-color: $fb-background;
	padding: 30px;
	display: flex;
	align-items: center;
	justify-content: center;

	.facebook-post {
		width: 100%;
		max-width: 525px;
		border-radius: 10px;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
		background-color: #fff;

		.facebook-header {
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
					color: #050505;
					font-weight: 500;
				}
				.poster-date {
					color: #65676B;
					font-size: 13px;
				}
			}

			.ellipsis {
				display: inline-flex;
				align-items: center;

				div {
					background-color: #5E666F;
					width: 4px;
					height: 4px;
					border-radius: 50%;
					margin: 0 2px;

					&:first-child {
						margin-left: 0;
					}

					&:last-child {
						margin-right: 0;
					}
				}
			}
		}

		.facebook-content {
			display: flex;
			flex-direction: column;

			img {
				width: 100%;
				height: auto;
			}

			.loader {
				width: 100%;
				height: 100px;
				align-self: stretch;
				background-color: $fb-background2;
				position: relative;

				.aioseo-loading-spinner {
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
				}
			}

			&.vertical {
				flex-direction: row;

				img {
					max-width: 158px;
					max-height: 158px;
					width: auto;
					height: auto;
				}

				.loader {
					max-width: 158px;
					height: auto;
				}
			}

			.facebook-site-description {
				flex: 1;
				background-color: $fb-background2;
				padding: 9px 13px;
				color: #606770;
				min-width: 0;

				.site-domain {
					font-size: 13px;
					text-transform: uppercase;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

				}

				.site-title {
					color: #1D2129;
					font-size: 17px;
					font-weight: 600;
					margin: 5px 0;
				}

				.site-description {
					font-size: 14px;
				}
			}
		}

		.facebook-footer {
			height: 24px;
		}
	}
}
</style>
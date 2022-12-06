<template>
	<div class="aioseo-google-search-preview">
		<div class="google-post">
			<div class="domain">
				<slot name="domain">
					{{ domain }}
				</slot>
			</div>

			<div
				class="site-title"
				v-html="truncate(title, 100)"
			/>

			<div
				class="meta-description"
				v-html="truncate(description)"
			/>
		</div>
	</div>
</template>

<script>
import { truncate } from '@/vue/utils/html'

export default {
	methods : {
		truncate
	},
	props : {
		title : {
			type     : String,
			required : true
		},
		description : {
			type     : String,
			required : true
		},
		domain : {
			type : String,
			default () {
				return this.$aioseo.urls.mainSiteUrl
			}
		},
		separator : String
	}
}
</script>

<style lang="scss" scoped>
.aioseo-google-search-preview {
	align-items: center;
	display: flex;
	justify-content: center;

	.google-post {
		background-color: #fff;
		border: 1px solid $border;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 15px;
		width: 100%;

		.domain,
		.site-title,
		.meta-description {
			font-family: $font-family;
			font-style: normal;
			font-weight: 400;
			line-height: 1.4;
			letter-spacing: normal;
			margin: 0;
			padding: 0;
			text-transform: none;
		}

		.domain {
			color: $black3;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.site-title {
			color: #1A0DAB;
			font-size: 20px;
		}

		.meta-description {
			color: #4d5156;
			font-size: 14px;
			max-width: 600px;
			width: 100%;

			&:empty {
				display: none;
			}
		}
	}
}
</style>

<style lang="scss">
#wpwrap {
	.edit-post-sidebar,
	.editor-post-publish-panel {
		.google-post {
			.domain {
				font-size: 13px;
			}

			.site-title {
				font-size: 16px;
			}

			.meta-description {
				font-size: 12px;
			}
		}
	}

	.aioseo-modal-content {
		.google-post {
			.domain,
			.meta-description {
				font-size: 14px;
			}

			.site-title {
				font-size: 20px;
			}
		}
	}
}
</style>
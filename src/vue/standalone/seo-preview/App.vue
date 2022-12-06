<template>
	<core-modal
		v-if="display"
		:classes="['aioseo-app', 'aioseo-seo-preview-standalone']"
		@close="display = false"
	>
		<template #headerTitle>
			{{ strings.modalHeader }}
		</template>

		<div slot="body" class="aioseo-modal-content">
			<core-main-tabs
				:tabs="tabs"
				:showSaveButton="false"
				:active="activeTab"
				@changed="value => this.activeTab = value"
			>
				<template #md-tab-icon="{ tab }">
					<component :is="tab.icon"/>
				</template>
			</core-main-tabs>

			<div class="component-overflow">
				<div class="component-container">
					<div
						class="component-wrapper"
						:class="'tab'+activeTab"
					>
						<component
							:is="activeTab"
							parentComponentContext="modal"
						/>
					</div>
				</div>
			</div>
		</div>

		<template #footer>
			<div
				v-if="editSnippetData().url || editObjectData().url"
				class="btn-edit-preview-data-wrapper"
			>
				<base-button
					:href="editSnippetData().url || editObjectData().url"
					:loading="loadingEditPreviewDataBtn"
					@click.exact="loadingEditPreviewDataBtn = true"
					class="btn-edit-preview-data"
					type="gray"
					size="small"
					tag="a"
				>
					<svg-icon-pencil/>
					{{ editSnippetData().btnText || editObjectData().btnText }}
				</base-button>
			</div>
		</template>
	</core-modal>
</template>

<script>
import BaseButton from '@/vue/components/common/base/Button'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import CoreModal from '@/vue/components/common/core/modal/Index'
import SvgIconFacebook from '@/vue/components/common/svg/icon/Facebook'
import SvgIconGoogle from '@/vue/components/common/svg/icon/Google'
import SvgIconPencil from '@/vue/components/common/svg/Pencil'
import SvgIconSettings from '@/vue/components/common/svg/Settings'
import SvgIconTwitter from '@/vue/components/common/svg/icon/Twitter'
import ViewFacebook from './views/Facebook'
import ViewGoogle from './views/Google'
import ViewSeoInspector from './views/SeoInspector'
import ViewTwitter from './views/Twitter'

export default {
	components : {
		BaseButton,
		CoreMainTabs,
		CoreModal,
		SvgIconFacebook,
		SvgIconGoogle,
		SvgIconPencil,
		SvgIconSettings,
		SvgIconTwitter,
		ViewFacebook,
		ViewGoogle,
		ViewSeoInspector,
		ViewTwitter
	},
	methods : {
		watchClicks () {
			const elSeoPreviewMenuItem = document.querySelector('#wp-admin-bar-aioseo-seo-preview a')

			if (elSeoPreviewMenuItem) {
				elSeoPreviewMenuItem.addEventListener('click', (e) => {
					e.preventDefault()

					this.display = true
				})
			}
		}
	},
	data () {
		return {
			activeTab                 : 'ViewGoogle',
			display                   : false,
			loadingEditPreviewDataBtn : false,
			strings                   : {
				modalHeader : this.$t.__('SEO Preview', this.$td)
			},
			tabs : [
				{
					slug      : 'ViewGoogle',
					icon      : 'svg-icon-google',
					name      : 'Google',
					component : 'ViewGoogle'
				},
				{
					slug      : 'ViewFacebook',
					icon      : 'svg-icon-facebook',
					name      : 'Facebook',
					component : 'ViewFacebook'
				},
				{
					slug      : 'ViewTwitter',
					icon      : 'svg-icon-twitter',
					name      : 'Twitter',
					component : 'ViewTwitter'
				},
				{
					slug      : 'ViewSeoInspector',
					icon      : 'svg-icon-settings',
					name      : this.$t.__('SEO Inspector', this.$td),
					component : 'ViewSeoInspector'
				}
			],
			editSnippetData () {
				const data = {
					url     : '',
					btnText : ''
				}

				if ('ViewGoogle' === this.activeTab) {
					data.url = this.$aioseo.currentPost?.editGoogleSnippetUrl || ''
					data.btnText = this.$t.__('Edit Snippet', this.$td)
				} else if ('ViewFacebook' === this.activeTab) {
					data.url = this.$aioseo.currentPost?.editFacebookSnippetUrl || ''
					data.btnText = this.$t.__('Edit Facebook Meta Data', this.$td)
				} else if ('ViewTwitter' === this.activeTab) {
					data.url = this.$aioseo.currentPost?.editTwitterSnippetUrl || ''
					data.btnText = this.$t.__('Edit Twitter Meta Data', this.$td)
				}

				return data
			},
			editObjectData () {
				const data = {
					url     : '',
					btnText : ''
				}

				if ('ViewSeoInspector' === this.activeTab) {
					data.url = this.$aioseo.currentPost?.editObjectUrl || ''
					data.btnText = this.$aioseo.currentPost?.editObjectBtnText || ''
				}

				return data
			}
		}
	},
	mounted () {
		this.watchClicks()
	}
}
</script>

<style lang="scss" scoped>
.aioseo-seo-preview-standalone {
	font-family: $font-family;
	line-height: 1.4;

	::v-deep {
		* {
			box-sizing: border-box;
			letter-spacing: normal;
		}

		.modal-mask {
			z-index: 100000; // This is higher then the wp admin bar (#wpadminbar) by one.
		}

		.modal-wrapper {
			.modal-container {
				display: flex;
				flex-direction: column;
				height: 720px;

				.modal-header {
					flex: 0 0 60px;
					padding-left: 20px;

					.aioseo-close {
						color: $black;
						min-height: 14px;
						min-width: 14px;
					}
				}

				.modal-body {
					flex: 1 1 100%;
				}

				.aioseo-modal-content {
					display: flex;
					flex-direction: column;
					height: 100%;

					.component-overflow {
						flex: 1 1 100%;
						overflow-y: auto;

						.component-container {
							display: table;
							width: 100%;
							height: 100%;

							.component-wrapper {
								background-color: $white2;
								display: table-cell;
								vertical-align: middle;

								&.tabViewSeoInspector {
									background-color: #fff;
									vertical-align: top;
								}

								.preview-wrapper {
									margin: 20px;

									> * {
										padding: 0;
									}
								}
							}
						}
					}
				}
			}
		}

		.aioseo-tabs {
			margin-bottom: 0;

			.md-tabs {
				.md-tabs-navigation {
					margin-top: 0;

					.md-button {
						.md-ripple {
							padding: 0 20px;
						}
					}
				}
			}

			.md-button-content {
				align-items: center;
				display: flex;
				gap: 6px;

				svg {
					width: 20px;
				}

				.label {
					font-weight: 700;
					text-transform: none;
				}
			}

			.aioseo-mobile-tabs {
				margin-top: 0;
			}
		}

		.btn-edit-preview-data-wrapper {
			padding: 20px;

			.btn-edit-preview-data {
				gap: 6px;

				svg {
					width: 14px;
				}
			}
		}
	}
}
</style>
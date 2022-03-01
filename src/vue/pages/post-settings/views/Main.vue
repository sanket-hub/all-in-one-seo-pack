<template>
	<div class="aioseo-app aioseo-post-settings">
		<core-main-tabs
			:tabs="getTabs"
			:showSaveButton="false"
			:active="activeTab"
			internal
			disableMobile
			@changed="value => processChangeTab(value)"
		/>

		<transition name="route-fade" mode="out-in">
			<component
				:is="activeTab"
				parentComponentContext="metabox"
			/>
		</transition>

		<core-modal
			v-if="currentPost.modalOpen && 'sidebar' === $root._data.screenContext"
			@close="closeModal"
			isolate
			:classes="[
				'post-settings-modal'
			]"
		>
			<div slot="headerTitle">
				{{ strings.modalTitle }}
			</div>
			<div slot="body">
				<ModalContent />
			</div>
		</core-modal>
	</div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { getParams, removeParam } from '@/vue/utils/params'
import Advanced from './Advanced'
import General from './General'
import Schema from './Schema'
import Social from './Social'
import ModalContent from './ModalContent'
import LinkAssistant from './Links'
import Redirects from './Redirects'

export default {
	components : {
		Advanced,
		General,
		Schema,
		Social,
		ModalContent,
		LinkAssistant,
		Redirects
	},
	data () {
		return {
			activeTab : 'general',
			modal     : false,
			strings   : {
				pageName   : 'General',
				modalTitle : this.$t.__('Preview Snippet Editor', this.$td)
			},
			sidebarFirstOpen : false
		}
	},
	watch : {
		currentPost : {
			deep : true,
			handler () {
				this.savePostState()
			}
		}
	},
	computed : {
		...mapState([ 'currentPost', 'redirects' ]),
		tabs () {
			const tabs = [
				{
					slug : 'general',
					icon : 'svg-settings',
					name : 'General'
				},
				{
					slug : 'social',
					icon : 'svg-share',
					name : 'Social'
				},
				{
					slug : 'schema',
					icon : 'svg-receipt',
					name : 'Schema'
				},
				{
					slug       : 'redirects',
					icon       : 'svg-redirect-crossed-arrows',
					name       : 'Redirects',
					warning    : ('undefined' !== typeof this.redirects && 0 < this.redirects.rows.filter(row => !!row.enabled).length),
					permission : 'aioseo_page_redirects_manage'
				},
				{
					slug : 'advanced',
					icon : 'svg-build',
					name : 'Advanced'
				}
			]

			if (
				!this.$aioseo.integration &&
				'post' === this.currentPost.context &&
				(!this.currentPost.linkAssistant || !this.currentPost.linkAssistant.isExcludedPost)
			) {
				tabs.splice(3, 0, {
					slug : 'linkAssistant',
					icon : 'svg-link-suggestion',
					name : 'Link Assistant'
				})
			}

			return tabs
		},
		initTab : function () {
			let tabPermission = this.getTabPermission(this.currentPost.tabs.tab)
			if ('sidebar' === this.$root._data.screenContext) {
				tabPermission = this.getTabPermission(this.currentPost.tabs.tab_sidebar)
				return (this.currentPost.tabs.tab_sidebar && this.$allowed(tabPermission, true)) ? this.currentPost.tabs.tab_sidebar : this.$allowed('aioseo_page_general_settings') ? 'general' : this.$allowed('aioseo_page_social_settings') ? 'social' : this.$allowed('aioseo_page_schema_settings') ? 'schema' : 'advanced'
			}
			return (this.currentPost.tabs.tab && this.$allowed(tabPermission, true)) ? this.currentPost.tabs.tab : this.$allowed('aioseo_page_general_settings') ? 'general' : this.$allowed('aioseo_page_social_settings') ? 'social' : this.$allowed('aioseo_page_schema_settings') ? 'schema' : 'advanced'
		},
		getTabs () {
			if ('term' === this.currentPost.context || this.currentPost.isWooCommercePageWithoutSchema) {
				return this.tabs.filter((tab) => {
					return 'schema' !== tab.slug && this.$allowed(this.getTabPermission(tab.slug), true)
				})
			}

			return this.tabs.filter(tab => {
				if (this.$allowed(this.getTabPermission(tab.slug), true)) {
					return true
				}

				return (
					'general' === tab.slug &&
					(
						this.$allowed('aioseo_page_analysis') ||
						this.$allowed(this.getTabPermission(tab.slug), true)
					)
				)
			})
		}
	},
	methods : {
		...mapMutations([ 'toggleLinkAssistantModal', 'toggleRedirectsModal' ]),
		...mapActions([ 'openModal', 'updateState', 'savePostState' ]),
		processChangeTab (newTabValue) {
			this.activeTab = newTabValue
			switch (this.$root._data.screenContext) {
				case 'sidebar' :
					this.$set(this.currentPost.tabs, 'tab_sidebar', newTabValue)
					break
				default :
					this.$set(this.currentPost.tabs, 'tab', newTabValue)
					break
			}

			if (this.sidebarFirstOpen) {
				this.sidebarFirstOpen = false
				return
			}

			if ('sidebar' !== this.$root._data.screenContext) {
				return
			}

			switch (newTabValue) {
				case 'social':
					if (!this.currentPost.modalOpen) {
						this.$store.commit('changeTabSettings', { setting: 'tab_modal', value: 'social' })
						this.openModal(true)
					}
					break
				case 'linkAssistant':
					if (this.currentPost.linkAssistant && !this.currentPost.linkAssistant.modalOpen) {
						this.toggleLinkAssistantModal()
					}
					break
				case 'redirects':
					if (this.currentPost.redirects  && !this.currentPost.redirects.modalOpen) {
						this.toggleRedirectsModal()
					}
					break
				default:
					break
			}
		},
		closeModal () {
			this.openModal(false)
		},
		getTabPermission (slug) {
			const tab = this.tabs.find(tab => tab.slug === slug)
			return 'undefined' !== typeof tab.permission ? tab.permission : `aioseo_page_${tab.slug}_settings`
		}
	},
	created () {
		this.sidebarFirstOpen = true
		this.modal = getParams()['aioseo-modaltab'] || this.modal
		if (this.modal) {
			this.$set(this.currentPost.tabs, 'tab_modal', this.modal)
			this.openModal(true)
			setTimeout(() => {
				removeParam('aioseo-modaltab')
			}, 500)
		}

		this.$bus.$on('open-post-settings', (param) => {
			this.processChangeTab(param.tab)
		})

		this.$bus.$on('standalone-update-post', (param) => {
			Object.keys(param).forEach(option => {
				this.$set(this.currentPost, option, param[option])
			})
		})

		switch (this.$root._data.screenContext) {
			case 'sidebar' :
				this.activeTab = getParams()['aioseo-sidebartab'] || this.initTab
				this.$set(this.currentPost.tabs, 'tab_sidebar', this.activeTab)
				setTimeout(() => {
					removeParam('aioseo-sidebartab')
				}, 500)
				break
			default :
				this.activeTab = getParams()['aioseo-tab'] || this.initTab
				this.$set(this.currentPost.tabs, 'tab', this.activeTab)
				setTimeout(() => {
					removeParam('aioseo-tab')
				}, 500)
				break
		}
	}
}
</script>

<style lang="scss">
.aioseo-post-settings,
.aioseo-metabox .aioseo-post-settings {
	background: #fff;
	color: $black;
	.aioseo-tabs {
		border-bottom-width: 2px;
		background: $background;
		.md-tabs-navigation {
			margin-top: 0 !important;
		}
		.md-button {
			height: 50px !important;
			font-size:14px !important;
			color: $black2 !important;
			&.md-active {
				color: $black !important;
				-webkit-text-stroke-width: 0.2px;
				-webkit-text-stroke-color: $black;
			}
			.icon {
				display: none;
			}
		}
		svg {
			display: none;
			@media screen and (max-width: 785px) {
				&.aioseo-caret {
					display: inline;
				}
			}
		}
	}
	.aioseo-tab-content {
		background: #fff;
		border-top: 0;
		padding: 30px;
		font-size: 13px;
	}
	.aioseo-settings-row {
		margin-bottom: 16px;
		padding-bottom: 16px;
	}
	.aioseo-sidebar-content-title {
		font-weight: bold;
		font-size: 14px;
		padding-bottom: 5px;
	}
}
.edit-post-sidebar {
	.col-xs-12,
	.col-sm-6,
	.col-md-4,
	.col-md-3 {
		width: 100%;
		flex-basis: 100%!important;
		max-width: 100%!important;
	}
	.components-panel {
		border-bottom: none;
	}
	.aioseo-mobile-tabs {
		display: none;
	}
	.tabs-scroller {
		display: block!important;
		width: 100%;
	}
	.aioseo-tabs {
		background: #FAFAFA;
		.md-button {
			height: 51px!important;
			color: $black !important;
			.md-ripple {
				padding: 0 10px!important;
			}
			.icon {
				display: inline;
				line-height: 1.3rem;
				&:before {
					line-height: inherit;
				}
			}
			.label {
				display: none;
			}
			&.md-active {
				color: $black !important;
				/*.label {
					display: inline;
				}*/
			}
			svg {
				display: inline;
				width: 16px;
				height: 16px;
				margin-top: 4px;
				color: $placeholder-color;
				&.aioseo-crossed-arrows {
					width: 14px;
					height: 14px;
				}
			}
			&:not(.md-active) {
				min-width: 36px!important;
				margin: 0 3px!important;
				&:before {
					top: 8px !important;
					border-radius: 50%;
					height: 36px;
					color: $black;
				}
				&:hover,
				&:focus {
					svg {
						color: $black;
					}
				}
			}
		}
	}
	.aioseo-app {
		input {
			border: 1px solid $input-border;
			&:focus {
				border-color: $blue;
				box-shadow: 0 0 0 1px $blue;
			}
			&::placeholder {
				color: $placeholder-color;
			}
		}
		.aioseo-textarea-autosize {
			border: 1px solid $input-border;
		}
		.aioseo-tab-content {
			padding: 20px 16px;
			border: none;
		}
		.aioseo-description {
			margin: 0;
		}
	}
	.aioseo-settings-row {
		margin-bottom: 16px;
		padding-bottom: 16px;
		&:last-of-type {
			border-bottom: 0;
			margin-bottom: 0!important;
			padding-bottom: 0!important;
		}
		> .aioseo-col {
			padding-top: 0;
		}
		.settings-name .name {
			font-size: 14px;
			font-weight: bold;
			margin-bottom: 0;
		}
	}
}
.aioseo-app.post-settings-modal {
	.aioseo-modal-content {
		.aioseo-tabs.internal {
			border-bottom-width: 1px !important;

			@media screen and (max-width: 520px) {
				padding-left: 20px !important;
			}
		}
		.md-tabs-navigation {
			.md-tabs-indicator {
				bottom: -1px !important;
			}
		}
		@media only screen and (min-width: 782px) {
			.col-md-4 {
				-ms-flex-preferred-size: 33.33333333% !important;
				flex-basis: 33.33333333% !important;
				max-width: 33.33333333% !important;
			}
			.col-md-5 {
				-ms-flex-preferred-size: 41.66666667% !important;
				flex-basis: 41.66666667% !important;
				max-width: 41.66666667% !important;
			}
			.col-md-7 {
				-ms-flex-preferred-size: 58.33333333% !important;
				flex-basis: 58.33333333% !important;
				max-width: 58.33333333% !important;
			}
			.col-md-8 {
				-ms-flex-preferred-size: 66.66666667% !important;
				flex-basis: 66.66666667% !important;
				max-width: 66.66666667% !important;
			}
		}
	}
}
.aioseo-redirects-modal {
	.bd {
		padding: 20px;
	}
	.modal-mask .modal-wrapper .modal-container {
		max-width: 1000px;
	}
}
</style>
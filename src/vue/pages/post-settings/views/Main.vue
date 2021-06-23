<template>
	<div class="aioseo-app">
		<core-main-tabs
			:tabs="getTabs"
			:showSaveButton="false"
			:active="this.activeTab"
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
import { mapActions, mapState } from 'vuex'
import { getParams, removeParam } from '@/vue/utils/params'
import { debounce } from '@/vue/utils/debounce'
import Advanced from './Advanced'
import General from './General'
import Schema from './Schema'
import Social from './Social'
import ModalContent from './ModalContent'
export default {
	components : {
		Advanced,
		General,
		Schema,
		Social,
		ModalContent
	},
	data () {
		return {
			activeTab : 'general',
			modal     : false,
			strings   : {
				pageName   : 'General',
				modalTitle : this.$t.__('Preview Snippet Editor', this.$td)
			},
			tabs : [
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
					slug : 'advanced',
					icon : 'svg-build',
					name : 'Advanced'
				}
			]
		}
	},
	watch : {
		currentPost : {
			deep : true,
			handler () {
				debounce(() => {
					this.savePostState()
				}, 500)
			}
		}
	},
	computed : {
		...mapState([ 'currentPost' ]),
		initTab : function () {
			if ('sidebar' === this.$root._data.screenContext) {
				return (this.currentPost.tabs.tab_sidebar && this.$allowed(`aioseo_page_${this.currentPost.tabs.tab_sidebar}_settings`)) ? this.currentPost.tabs.tab_sidebar : this.$allowed('aioseo_page_general_settings') ? 'general' : this.$allowed('aioseo_page_social_settings') ? 'social' : this.$allowed('aioseo_page_schema_settings') ? 'schema' : 'advanced'
			}
			return (this.currentPost.tabs.tab && this.$allowed(`aioseo_page_${this.currentPost.tabs.tab}_settings`)) ? this.currentPost.tabs.tab : this.$allowed('aioseo_page_general_settings') ? 'general' : this.$allowed('aioseo_page_social_settings') ? 'social' : this.$allowed('aioseo_page_schema_settings') ? 'schema' : 'advanced'
		},
		getTabs () {
			if ('term' === this.currentPost.context || this.currentPost.isWooCommercePage) {
				return this.tabs.filter((tab) => 'schema' !== tab.slug && this.$allowed(`aioseo_page_${tab.slug}_settings`))
			}
			return this.tabs.filter(tab => ('general' === tab.slug && (this.$allowed('aioseo_page_analysis') || this.$allowed(`aioseo_page_${tab.slug}_settings`))) || this.$allowed(`aioseo_page_${tab.slug}_settings`))
		}
	},
	methods : {
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
		},
		closeModal () {
			this.openModal(false)
		}
	},
	created () {
		this.modal = getParams()['aioseo-modaltab'] || this.modal
		if (this.modal) {
			this.$set(this.currentPost.tabs, 'tab_modal', this.modal)
			this.openModal(true)
			setTimeout(() => {
				removeParam('aioseo-modaltab')
			}, 500)
		}

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
.aioseo-app,
.aioseo-metabox .aioseo-app {
	background: #fff;
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
				font-weight: bold !important;
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
	}
	.aioseo-settings-row {
		margin-bottom: 16px;
		padding-bottom: 16px;
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
				.label {
					display: inline;
					margin-left: 10px;
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
				svg {
					display: inline;
					width: 16px;
					height: 16px;
					margin-top: 4px;
					color: $placeholder-color;
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
</style>
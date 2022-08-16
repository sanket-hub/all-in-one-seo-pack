<template>
	<div class="aioseo-app aioseo-post-settings">
		<core-main-tabs
			:tabs="getTabs"
			:showSaveButton="false"
			:active="activeTab"
			internal
			disableMobile
			@changed="value => processChangeTab(value)"
			v-if="'sidebar' !== $root._data.screenContext"
		>
			<template #md-tab-icon="{ tab }">
				<component
					:class="[
						{ warning: tab.data.warning }
					]"
					:is="tab.icon"
				/>
			</template>
		</core-main-tabs>

		<transition name="route-fade" mode="out-in">
			<div
				v-if="'sidebar' === $root._data.screenContext && null === activeTab"
				class="aioseo-sidepanel"
			>
				<a
					v-for="(tab, index) in getTabs"
					:key="index"
					href="#"
					class="aioseo-sidepanel-button"
					@click.prevent="processChangeTab(tab.slug)"
				>
					<component class="icon" :is="tab.icon"/>

					<div class="name">{{ tab.name }}</div>

					<svg-circle-information-solid
						v-if="tab.warning"
						width="15"
						height="15"
					/>

					<svg-caret />
				</a>
			</div>
		</transition>

		<transition name="route-fade" mode="out-in">
			<div
				v-if="activeTab"
				:key="activeTab"
				class="aioseo-tab"
				:class="{ 'is-page-builder': !!$aioseo.integration }"
			>
				<div
					v-if="'sidebar' === $root._data.screenContext"
					class="aioseo-tab-title"
				>
					<span>{{ getTabName(activeTab) }}</span>

					<svg-close @click="processChangeTab(null)"/>
				</div>

				<alert v-if="'sidebar' === this.$root._data.screenContext" />

				<component
					:is="activeTab"
					parentComponentContext="metabox"
					@changeTab="newTab => processChangeTab(newTab)"
				/>
			</div>
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
import { debounceContext } from '@/vue/utils/debounce'
import Advanced from './Advanced'
import Alert from './partials/Alert'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import CoreModal from '@/vue/components/common/core/Modal'
import General from './General'
import LinkAssistant from './Links'
import ModalContent from './ModalContent'
import Redirects from './Redirects'
import Schema from './Schema'
import Social from './Social'
import SvgBuild from '@/vue/components/common/svg/Build'
import SvgCaret from '@/vue/components/common/svg/Caret'
import SvgCircleInformationSolid from '@/vue/components/common/svg/circle/InformationSolid'
import SvgClose from '@/vue/components/common/svg/Close'
import SvgLinkSuggestion from '@/vue/components/common/svg/link/Suggestion'
import SvgReceipt from '@/vue/components/common/svg/Receipt'
import SvgRedirectCrossedArrows from '@/vue/components/common/svg/redirect/CrossedArrows'
import SvgSettings from '@/vue/components/common/svg/Settings'
import SvgShare from '@/vue/components/common/svg/Share'
export default {
	components : {
		Advanced,
		Alert,
		CoreMainTabs,
		CoreModal,
		General,
		LinkAssistant,
		ModalContent,
		Redirects,
		Schema,
		Social,
		SvgBuild,
		SvgCaret,
		SvgCircleInformationSolid,
		SvgClose,
		SvgLinkSuggestion,
		SvgReceipt,
		SvgRedirectCrossedArrows,
		SvgSettings,
		SvgShare
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
				debounceContext(this.savePostState, 250)
			}
		},
		'currentPost.modalOpen' (isModalOpen) {
			if ('general' !== this.activeTab) {
				this.maybeResetActiveTab(isModalOpen)
			}
		},
		'currentPost.linkAssistant.modalOpen' (isModalOpen) {
			this.maybeResetActiveTab(isModalOpen)
		},
		'currentPost.redirects.modalOpen' (isModalOpen) {
			this.maybeResetActiveTab(isModalOpen)
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
					warning    : (0 < this?.redirects?.rows.filter(row => !!row.enabled).length),
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
		initTab () {
			return this.getTabs[0].slug
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
		...mapMutations([ 'toggleLinkAssistantModal', 'toggleRedirectsModal', 'changeTabSettings' ]),
		...mapActions([ 'openModal', 'updateState', 'savePostState' ]),
		processChangeTab (newTabValue) {
			this.activeTab = newTabValue

			switch (this.$root._data.screenContext) {
				case 'sidebar' :
					// Change the WordPress components panel header to static if there's a tab open.
					document.querySelectorAll('.components-panel__header').forEach(el => {
						const position = null === newTabValue ? 'sticky' : 'static'
						el.style.position = position
					})
					break
				default :
					this.changeTabSettings({ setting: 'main', value: newTabValue })
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
						this.changeTabSettings({ setting: 'modal', value: 'social' })
						this.openModal(true)
					}
					break
				case 'linkAssistant':
					if (this.currentPost.linkAssistant && !this.currentPost.linkAssistant.modalOpen) {
						this.toggleLinkAssistantModal()
					}
					break
				case 'redirects':
					if (this.currentPost.redirects && !this.currentPost.redirects.modalOpen) {
						this.toggleRedirectsModal()
					}
					break
				default:
					break
			}
		},
		maybeResetActiveTab (isModalOpen) {
			if (isModalOpen) {
				return
			}

			if ('sidebar' !== this.$root._data.screenContext) {
				return
			}

			this.$nextTick(() => {
				this.processChangeTab(null)
			})
		},
		closeModal () {
			this.openModal(false)
		},
		getTabPermission (slug) {
			const tab = this.tabs.find(t => t.slug === slug)
			return 'undefined' !== typeof tab.permission ? tab.permission : `aioseo_page_${tab.slug}_settings`
		},
		getTabName (slug) {
			const tab = this.tabs.find(t => t.slug === slug)
			return tab?.name
		}
	},
	created () {
		this.sidebarFirstOpen = true
		this.modal = getParams()['aioseo-modaltab'] || this.modal
		if (this.modal) {
			this.changeTabSettings({ setting: 'modal', value: this.modal })
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
				this.activeTab = null
				break
			default :
				this.activeTab = getParams()['aioseo-tab'] || this.initTab
				this.changeTabSettings({ setting: 'main', value: this.activeTab })
				setTimeout(() => {
					removeParam('aioseo-tab')
				}, 500)
				break
		}
	},
	beforeMount () {
		/**
		 * Make unpin button visible.
		 * @link all-in-one-seo-pack-pro/src/react/headline-analyzer/index.jsx:151
		 */
		const unpinButton = document.querySelector('.interface-complementary-area__pin-unpin-item')
		if (unpinButton && null !== unpinButton) {
			unpinButton.style.display = 'block'
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
			font-size: 14px !important;
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

	.aioseo-sidepanel {
		.aioseo-sidepanel-button {
			display: flex;
			align-items: center;
			padding: 12px;
			color: $black2-hover;
			text-decoration: none;

			&:not(:last-child) {
				border-bottom: 1px solid #DDDDDD;
			}

			&:focus {
				box-shadow: none;
			}

			.icon {
				display: inline;
				width: 16px;
				height: 16px;
				margin-right: 8px;
			}

			.name {
				font-weight: 700;
			}

			.aioseo-circle-information-solid {
				margin-left: 8px;
				color: $orange;
			}

			.aioseo-caret {
				margin-left: auto;
				width: 24px;
				height: 24px;
				cursor: pointer;
				transform: rotate(-90deg);
			}
		}
	}

	.aioseo-tab-title {
		display: flex;
		align-items: center;
		color: $black2-hover;
		font-weight: 700;
		padding: 12px;
		border-bottom: 1px solid #DDDDDD;
		background: #fff;
		position: sticky;
		z-index: 1;
		top: 0;

		svg {
			margin-left: auto;
			width: 10px;
			height: 10px;
			cursor: pointer;
		}
	}

	.aioseo-tab-content {
		background: #fff;
		border-top: 0;
		padding: 30px;
		font-size: 13px;
		position: relative;
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
		flex-basis: 100% !important;
		max-width: 100% !important;
	}

	.components-panel {
		border-bottom: none;
	}

	.aioseo-mobile-tabs {
		display: none;
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

		.aioseo-tab:not(.is-page-builder) {
			position: relative;
			top: -45px;
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

		.route-fade {
			&-enter-active,
			&-leave-active {
				transition: opacity 0.2s, transform 0.2s;
			}
			&-enter,
			&-leave-active {
				position: absolute;
				top: 0;
			}
		}
	}

	.aioseo-settings-row {
		margin-bottom: 16px;
		padding-bottom: 16px;

		&:last-of-type {
			border-bottom: 0;
			margin-bottom: 0 !important;
			padding-bottom: 0 !important;
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
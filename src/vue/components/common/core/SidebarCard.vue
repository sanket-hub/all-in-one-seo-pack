<template>
	<div
		class="aioseo-card aioseo-sidebar-card"
	>
		<div
			v-if="!hideHeader"
			class="header"
			@click="toggleCard({ slug, shouldSave : saveToggleStatus })"
		>
			<div class="text">
				<slot name="header">
					{{ headerText }}
				</slot>

				<slot
					name="alt"
					v-if="focusScore >= 0"
				>
					<span
						class="card-score"
						:class="getScoreClass(focusScore)"
					>
						{{ focusScore }}/100
					</span>
				</slot>

				<slot
					name="alt"
					v-if="trueSeoScore >= 0"
				>
					<span
						class="card-score"
						:class="getErrorClass(trueSeoScore)"
					>
						<svg-ellipse
							v-if="0 < trueSeoScore"
							width="6"
						/>
						<svg-circle-check
							v-if="0 === trueSeoScore"
							width="12"
						/>
						{{ getErrorDisplay(trueSeoScore) }}
					</span>
				</slot>

				<core-tooltip
					v-if="$slots.tooltip"
				>
					<svg-circle-question-mark />

					<template #tooltip>
						<slot name="tooltip" />
					</template>
				</core-tooltip>
			</div>

			<svg-caret
				v-if="toggles && settings.toggledCards"
				:class="{ rotated: !settings.toggledCards[slug] }"
			/>
		</div>

		<transition-slide
			v-if="settings.toggledCards || noSlide"
			:active="(settings.toggledCards[slug] && toggles) || noSlide"
		>
			<div
				v-if="$slots['before-tabs']"
				class="content"
			>
				<slot name="before-tabs" />
			</div>

			<slot name="tabs" />

			<div
				v-if="$slots.default"
				class="content"
			>
				<slot />
			</div>
		</transition-slide>
	</div>
</template>

<script>
import { TruSeoScore } from '@/vue/mixins'
import { mapActions, mapGetters } from 'vuex'
export default {
	mixins : [ TruSeoScore ],
	props  : {
		slug : {
			type     : String,
			required : true
		},
		headerText   : String,
		focusScore   : Number,
		trueSeoScore : Number,
		toggles      : {
			type : Boolean,
			default () {
				return true
			}
		},
		hideHeader       : Boolean,
		noSlide          : Boolean,
		saveToggleStatus : {
			type : Boolean,
			default () {
				return true
			}
		}
	},
	computed : {
		...mapGetters([ 'settings' ])
	},
	methods : {
		...mapActions([ 'toggleCard' ])
	},
	created () {
		this.$bus.$on('open-post-settings', (param) => {
			for (const card in this.settings.toggledCards) {
				if (this.settings.toggledCards[card]) {
					this.toggleCard({ slug: card })
				}
			}
			this.toggleCard({ slug: param.card })
		})
	}
}
</script>

<style lang="scss">
.aioseo-sidebar-card {
	.header {
		height: 46px;
		&:hover {
			cursor: pointer;
		}
	}
	.content {
		padding-bottom: 8px !important;
	}
	ul {
		margin-bottom: 0;
		li {
			margin-bottom: 16px;
			padding-left: 25px;
		}
		.description {
			margin: 0;
		}
	}
}
</style>
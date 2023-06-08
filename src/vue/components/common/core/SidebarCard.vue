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
						v-if="null !== focusScore"
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
import { mapActions, mapState, mapGetters } from 'vuex'
import { useTruSeoScore } from '@/vue/composables'
import { TruSeoScore } from '@/vue/mixins'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import SvgCaret from '@/vue/components/common/svg/Caret'
import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
import SvgCircleQuestionMark from '@/vue/components/common/svg/circle/QuestionMark'
import SvgEllipse from '@/vue/components/common/svg/Ellipse'
import TransitionSlide from '@/vue/components/common/transition/Slide'
export default {
	setup () {
		const { strings } = useTruSeoScore()

		return {
			strings
		}
	},
	components : {
		CoreTooltip,
		SvgCaret,
		SvgCircleCheck,
		SvgCircleQuestionMark,
		SvgEllipse,
		TransitionSlide
	},
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
	watch : {
		'metaBoxTabs.mainSidebar' : {
			deep : true,
			handler (mainSidebar) {
				if ('sidebar' === this.$root._data.screenContext) {
					this.openCard(mainSidebar.card)
				}
			}
		}
	},
	computed : {
		...mapGetters([ 'settings' ]),
		...mapState([ 'metaBoxTabs' ])
	},
	methods : {
		...mapActions([ 'toggleCard' ]),
		openCard (card) {
			for (const toggledCard in this.settings.toggledCards) {
				if (this.settings.toggledCards[toggledCard]) {
					this.toggleCard({ slug: toggledCard })
				}
			}
			this.toggleCard({ slug: card })
		}
	},
	created () {
		this.openCard(this.metaBoxTabs.mainSidebar.card)
	}
}
</script>

<style lang="scss">
.aioseo-card {

	&.aioseo-sidebar-card {

		.header {
			height: 46px;

			&:hover {
				cursor: pointer;
			}
		}

		ul {
			margin-bottom: 0;

			li {
				padding-left: 24px;
				margin-bottom: 0;

				+ li {
					margin-top: 12px;
				}
			}

			.description {
				margin: 0;
			}
		}
	}
}
</style>
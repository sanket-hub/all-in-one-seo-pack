<template>
	<div class="aioseo-ai-generator">
		<core-tooltip
			type="action"
			:offset="'-30px,0'"
		>
			<button
				type="button"
				@click="setModalState({
					modalName : 'aiGenerator',
					value : type
				})"
			>
				<svg-ai-robot
				@click="setModalState({
					modalName : 'aiGenerator',
					value : type
				})"
				/>
			</button>

			<template #tooltip>
				{{ strings.useAiGenerator }}
			</template>
		</core-tooltip>

		<ai-modal
			v-if="modals.aiGenerator === type"
			:type="type"
		/>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import AiModal from '../../../AIOSEO_VERSION/partials-ai/Modal'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import SvgAiRobot from '@/vue/components/common/svg/ai/Robot'
export default {
	props : {
		type : {
			type     : String,
			required : true
		}
	},
	components : {
		AiModal,
		CoreTooltip,
		SvgAiRobot
	},
	data () {
		return {
			strings : {
				useAiGenerator : this.$t.__('Use AI Generator', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'modals' ])
	},
	methods : {
		...mapMutations([ 'setModalState' ])
	}
}
</script>

<style lang="scss">
.aioseo-post-general {

	.aioseo-ai-generator {

		button {
			display: flex;
			align-items: center;
			justify-content: center;

			svg.aioseo-ai-robot {
				width: 15px;
				height: 13px;
				color: $black;

				&:hover {
					color: $black2;
				}
			}
		}
	}

	.snippet-title-row {
		.aioseo-editor .aioseo-editor-single .ql-editor {
			padding: 7px 55px 7px 10px;
		}
	}

	.snippet-description-row {
		.aioseo-editor .ql-editor {
			padding: 15px 55px 15px 15px;
		}
	}
}
</style>
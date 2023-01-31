<template>
	<popper
		class="aioseo-tooltip"
		:trigger="trigger"
		:force-show="forceShow"
		:disabled="disabled"
		:options="{
			placement,
			modifiers : {
				flip: {
					enabled : flip
				},
				preventOverflow : {
					escapeWithReference : true
				},
				offset : {
					offset : offset
				}
			}
		}"
	>
		<div
			class="popper"
			:class="{ [type]: type }"
			:style="{
				zIndex
			}"
		>
			<component
				:is="tag"
				v-if="tooltip"
			>{{ tooltip }}</component>
			<slot name="tooltip" />
		</div>

		<slot slot="reference" />
	</popper>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/vue-popper.css'
export default {
	props : {
		tooltip   : String,
		type      : String,
		disabled  : Boolean,
		placement : {
			type : String,
			default () {
				return 'top'
			}
		},
		trigger : {
			type : String,
			default () {
				return 'hover'
			}
		},
		forceShow : {
			type : Boolean,
			default () {
				return false
			}
		},
		tag : {
			type : String,
			default () {
				return 'span'
			}
		},
		offset : {
			type : String,
			default () {
				return '0,0'
			}
		},
		flip : {
			type : Boolean,
			default () {
				return false
			}
		},
		zIndex : String
	},
	components : {
		popper : Popper
	}
}
</script>

<style lang="scss">
.aioseo-tooltip {
	margin-left: 12px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
</style>
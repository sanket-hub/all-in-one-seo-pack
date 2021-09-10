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
					enabled : false
				},
				preventOverflow : {
					escapeWithReference : true
				}
			}
		}"
	>
		<div
			class="popper"
			:class="{ [type]: type }"
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
		disabled  : Boolean,
		forceShow : {
			type : Boolean,
			default () {
				return false
			}
		},
		type : String,
		tag  : {
			type : String,
			default () {
				return 'span'
			}
		}
	},
	components : {
		popper : Popper
	}
}
</script>

<style lang="scss">
.aioseo-tooltip {
	margin-left: 14px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
</style>
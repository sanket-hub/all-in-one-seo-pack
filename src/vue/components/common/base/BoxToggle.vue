<template>
	<div class="aioseo-box-toggle">
		<grid-row>
			<grid-column
				v-for="(option, index) in options"
				:key="index"
				sm="6"
				md="4"
			>
				<input
					:id="`id_${name}_${index}`"
					:name="name"
					type="radio"
					@input="$emit('update:modelValue', option.value)"
					:checked="option.value === modelValue"
				/>
				<label
					:for="`id_${name}_${index}`"
				>
					<slot :name="option.slot">
						{{ option.label }}
					</slot>
				</label>
			</grid-column>
		</grid-row>
	</div>
</template>

<script>
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
export default {
	components : {
		GridColumn,
		GridRow
	},
	props : {
		options : {
			type     : Array,
			required : true
		},
		name : {
			type     : String,
			required : true
		},
		modelValue : String
	}
}
</script>

<style lang="scss">
.aioseo-box-toggle {
	.aioseo-row {
		.aioseo-col {
			max-width: calc(200px + 1em);
			@media only screen and (max-width: 48em) {
				max-width: 100%;
			}
		}
	}

	input {
		position: absolute !important;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		width: 1px;
		border: 0;
		overflow: hidden;

		&:checked + label {
			background-color: #fff;
			box-shadow: 0px 5px 10px rgba(0, 90, 224, 0.1);
			border: 2px solid $blue;
			font-weight: 600;
		}
	}

	label {
		background-color: $box-background;
		color: $black;
		font-size: 16px;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border: 2px solid transparent;
		box-shadow: 0 0 0 1px $border;
		transition: all 0.1s ease-in-out;
		border-radius: 3px;
		height: 165px;
		position: relative;

		svg {
			margin: 0;
			flex: 1;
			color: $black2;
		}

		p {
			font-size: $font-md;
			line-height: 22px;
			position: relative;
			bottom: unset;
			margin: 0 0 12px;
		}

		&:hover {
			cursor: pointer;
		}
	}
}
</style>
<template>
	<label
		class="aioseo-checkbox"
		:class="[
			labelClass,
			{ [size]: size },
			{ disabled: disabled },
			{ round: round }
		]"
		@keydown.enter="labelToggle"
		@keydown.space="labelToggle"
		@click.stop="() => {}"
	>
		<slot name="header"></slot>

		<span class="form-checkbox-wrapper">
			<span class="form-checkbox">
				<input
					type="checkbox"
					@input="$emit('input', $event.target.checked)"
					:checked="value"
					:name="name"
					:id="id"
					:class="inputClass"
					:disabled="disabled"
					ref="input"
				>
				<span
					class="fancy-checkbox"
					:class="type"
				>
					<svg-checkmark />
				</span>
			</span>
		</span>

		<slot />
	</label>
</template>
<script>
import SvgCheckmark from '@/vue/components/common/svg/Checkmark'
export default {
	components : {
		SvgCheckmark
	},
	props : {
		value      : Boolean,
		name       : String,
		labelClass : {
			type : String,
			default () {
				return ''
			}
		},
		inputClass : {
			type : String,
			default () {
				return ''
			}
		},
		id       : String,
		size     : String,
		disabled : Boolean,
		round    : Boolean,
		type     : {
			type : String,
			default () {
				return 'blue'
			}
		}
	},
	methods : {
		labelToggle () {
			this.$refs.input.click()
		}
	}
}
</script>

<style lang="scss">
.aioseo-checkbox {
	display: inline-flex;
	align-items: center;

	&.disabled,
	&.no-clicks {
		cursor: default;

		.form-checkbox {
			.fancy-checkbox {
				cursor: default;
			}
		}
	}

	.form-checkbox-wrapper {
		margin-right: 10px;
		display: flex;
	}

	&.medium {
		.form-checkbox {
			width: 20px;
			height: 20px;

			.fancy-checkbox {
				svg {
					width: 12px;
					height: 12px;
				}
			}

			span {
				&:before {
					height: 18px;
					width: 18px;
					line-height: 20px;
				}
			}
		}
	}

	&.round {
		.form-checkbox {
			span {
				border-radius: 50%;

				&:before {
					border-radius: 50%;
				}
			}
		}
	}

	.form-checkbox {
		position:relative;
		display: inline-block;
		width: 28px;
		height: 28px;
		color: white;
		vertical-align: bottom;
		text-align: center;

		/* Hide default HTML checkbox */
		input {
			display: none;

			&:checked + .fancy-checkbox {
				&.blue {
					background: $blue;
				}

				&.green {
					background: $green;
				}

				&:before {
					background: transparent;
				}
			}

			&:disabled + .fancy-checkbox {
				background: $border !important;
				border: 1px solid $input-border;
				cursor: default;

				svg {
					color: $placeholder-color;
				}
			}

			&:not(:checked):disabled + .fancy-checkbox {
				&:before {
					left: 0;
					bottom: 0;
					background: $border;
				}
			}
		}

		.fancy-checkbox {
			svg {
				color: #fff;
				width: 16px;
				height: 16px;
			}
		}

		/* The fancy-checkbox */
		span {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: $input-border;
			transition: 0.2s;
			border-radius: 3px;
			display: flex;
			align-items: center;
			justify-content: center;

			&:before {
				position: absolute;
				content: "";
				height: 26px;
				width: 26px;
				left: 1px;
				bottom: 1px;
				background-color: #fff;
				transition: 0.2s;
				font-size: 18px;
				line-height: 28px;
				border-radius: 2px;
			}
		}
	}
}
</style>
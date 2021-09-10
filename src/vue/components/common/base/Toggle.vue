<template>
	<label
		class="aioseo-toggle"
		:class="{ disabled: disabled }"
		tabindex="0"
		@keydown.enter="labelToggle"
		@keydown.space="labelToggle"
	>
		<div class="toggle-content">
			<input
				:disabled="disabled"
				type="checkbox"
				:checked="value"
				@input="toggle($event.target.checked)"
				ref="input"
			>
			<span class="toggle-switch"></span>
		</div>
		<slot />
	</label>
</template>

<script>
export default {
	props : {
		value    : Boolean,
		disabled : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	methods : {
		labelToggle () {
			this.$refs.input.click()
		},
		toggle (checked) {
			this.$emit('input', checked)
		}
	}
}
</script>

<style lang="scss">
.aioseo-toggle {
	display: inline-flex;

	&:active,
	&:focus {
		outline: 2px solid transparent;
	}

	&.disabled {
		pointer-events: none;

		.toggle-content {
			opacity: 0.5;
		}
	}

	.toggle-content {
		position: relative;
		display: inline-block;
		width: 36px;
		height: 20px;
		margin-right: 10px;

		input {
			display: none;

			&:checked {
				&+ .toggle-switch {
					border: 1px solid $blue;
					background-color: $blue;

					&:focus {
						outline: 2px solid transparent;
					}

					&:before {
						background-color: #fff;
						transform: translateX(15px);
					}
				}
			}

			&:focus {
				&+ .toggle-switch {
					box-shadow: 0 0 1px $blue;
					outline: 2px solid transparent;
				}
			}
		}

		.toggle-switch {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #fff;
			border: 1px solid $input-border;
			border-radius: 15px;
			transition: 0.2s;

			&:before {
				position: absolute;
				content: "";
				height: 14px;
				width: 14px;
				left: 3px;
				bottom: 2px;
				background-color: $input-border;
				border-radius: 50%;
				transition: 0.2s;
			}
		}
	}
}
</style>
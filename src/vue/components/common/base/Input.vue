<template>
	<div
		class="aioseo-input"
		:class="{ file: 'file' === type }"
	>
		<div
			v-if="!$slots.prependIcon && prependIcon"
			class="prepend-icon"
			:class="{ [size]: size }"
		>
			<component
				:is="`svg-${prependIcon}`"
			/>
		</div>

		<slot
			v-if="$slots['prepend-icon']"
			name="prepend-icon"
		/>

		<input
			:disabled="disabled"
			:type="type"
			:value="value"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:readonly="readonly"
			:spellcheck="spellcheck"
			:max="'number' === type ? max : null"
			:min="'number' === type ? min : null"
			:step="'number' === type ? step : null"
			@input="$emit('input', $event.target.value)"
			@blur="$emit('blur', $event.target.value)"
			@change="$emit('change', $event.target.value)"
			@focus="$emit('focus', $event.target.value)"
			@keyup="$emit('keyup', $event)"
			@keydown="$emit('keydown', $event)"
			:class="[
				{ [size]: size },
				{ prepend: prependIcon },
				{ append: appendIcon }
			]"
			:id="inputId"
		/>

		<div
			v-if="!$slots.append && appendIcon"
			class="append-icon"
			:class="{ [size]: size, clickable : $listeners['append-icon-click'] }"
			@click="$emit('append-icon-click', $event)"
		>
			<component
				:is="`svg-${appendIcon}`"
			/>
		</div>

		<slot
			v-if="$slots['append-icon']"
			name="append-icon"
		/>
	</div>
</template>

<script>
import SvgCircleCheck from '@/vue/components/common/svg/circle/Check'
import SvgSearch from '@/vue/components/common/svg/Search'
export default {
	components : {
		SvgCircleCheck,
		SvgSearch
	},
	props : {
		value        : [ String, Number ],
		appendIcon   : String,
		prependIcon  : String,
		placeholder  : String,
		autocomplete : String,
		readonly     : Boolean,
		disabled     : Boolean,
		max          : {
			type    : Number,
			default : Number.MAX_SAFE_INTEGER
		},
		min : {
			type    : Number,
			default : Number.MIN_SAFE_INTEGER
		},
		spellcheck : {
			type : Boolean,
			default () {
				return true
			}
		},
		type : {
			type : String,
			default () {
				return 'text'
			}
		},
		size : {
			type        : String,
			default     : '',
			description : 'Button size (small|medium|large)'
		},
		step : {
			type     : Number,
			required : false
		},
		inputId : String
	}
}
</script>

<style lang="scss" scoped>
.aioseo-input {
	position: relative;
	width: 100%;

	&.file {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: 0;
		padding: 0;

		input[type=file] {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			margin: 0;
			padding: 0;
			cursor: pointer;
			opacity: 0;

			&::-webkit-file-upload-button {
				visibility: hidden;
			}

			&:focus {
				box-shadow: none;
			}
		}
	}

	input {
		height: 48px;
		width: 100%;
		background-color: #fff;
		border: 1px solid $input-border;
		border-radius: 3px;
		padding: 15px;
		font-size: 18px;
		position: relative;
		overflow: hidden;
		margin: 0;

		&:disabled {
			background: $box-background;
		}

		&:focus {
			border-color: $blue;
			box-shadow: 0 0 0 1px $blue;
		}

		&::placeholder {
			color: $placeholder-color;
		}

		&.prepend {
			padding-left: 50px;
		}

		&.append {
			padding-right: 50px;
		}

		&.small {
			height: 30px;
			padding: 10px;
			font-size: 14px;

			&.prepend {
				padding-left: 30px;
			}

			&.append {
				padding-right: 30px;
			}
		}

		&.medium {
			height: 40px;
			padding: 12px;
			font-size: 16px;

			&.prepend {
				padding-left: 35px;
			}

			&.append {
				padding-right: 35px;
			}
		}
	}

	&.aioseo-active {
		input {
			border-color: $green;

			&:active,
			&:focus {
				box-shadow: 0 0 0 1px $green;
			}
		}

		.prepend-icon,
		.append-icon {
			color: $green;
		}
	}

	&.aioseo-error {
		input {
			border-color: $red;

			&:active,
			&:focus {
				box-shadow: 0 0 0 1px $red;
			}
		}

		.prepend-icon,
		.append-icon {
			color: $red;
		}
	}

	&.aioseo-warning {
		input {
			border-color: $orange;

			&:active,
			&:focus {
				box-shadow: 0 0 0 1px $orange;
			}
		}

		.prepend-icon,
		.append-icon {
			color: $orange;
		}
	}

	.prepend-icon {
		position: absolute;
		top: 0;
		left: 10px;
		width: 30px;
		height: 100%;
		color: $input-border;
		display: flex;
		align-items: center;
		z-index: 1;

		svg {
			width: 30px;
			height: 30px;
		}

		&.small {
			width: 20px;

			svg {
				width: 10px;
				height: 10px;
			}
		}

		&.medium {
			width: 15px;

			svg {
				width: 15px;
				height: 15px;
			}
		}
	}

	.append-icon {
		position: absolute;
		top: 0;
		right: 10px;
		width: 30px;
		height: 100%;
		color: $input-border;
		display: flex;
		align-items: center;
		z-index: 1;

		svg {
			width: 30px;
			height: 30px;
		}

		&.small {
			width: 10px;
		}

		&.medium {
			width: 15px;
		}

		&.clickable {
			cursor: pointer;
			padding: 0 5px;
			background: #F3F4F5;
			border: 1px solid $input-border;
			color: #434960;
			right: 0;
			width: 30px;
			border-radius: 0 3px 3px 0;

			&.small {
				width: 15px;
			}

			&.medium {
				padding: 0 10px;
				width: 40px;
			}
		}
	}
}
</style>
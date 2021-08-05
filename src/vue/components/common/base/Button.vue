<template>
	<component
		:is="tag"
		:type="tag === 'button' ? nativeType : ''"
		:disabled="disabled || loading"
		:to="tag === 'router-link' ? to : ''"
		@click="handleClick"
		@mouseenter="$emit('mouseenter', $event)"
		@mouseleave="$emit('mouseleave', $event)"
		class="aioseo-button"
		:class="[
			{ [type]: type },
			{ [size]: size },
			{ 'btn-link': link },
			{ disabled: disabled && tag !== 'button' },
			{ color: color },
			{ loading: loading }
		]"
	>
		<slot name="loading">
			<core-loader
				v-if="loading"
				:dark="'gray' === type"
			/>
		</slot>
		<slot></slot>
	</component>
</template>

<script>
export default {
	name  : 'base-button',
	props : {
		color : String,
		tag   : {
			type        : String,
			default     : 'button',
			description : 'Button html tag'
		},
		block    : Boolean,
		loading  : Boolean,
		wide     : Boolean,
		disabled : Boolean,
		type     : {
			type        : String,
			default     : 'default',
			description : 'Button type (blue|green|gred|gray|wp-blue)'
		},
		nativeType : {
			type        : String,
			default     : 'button',
			description : 'Button native type (e.g button, input etc)'
		},
		size : {
			type        : String,
			default     : '',
			description : 'Button size (small|medium|large)'
		},
		link : {
			type        : Boolean,
			description : 'Whether button is a link (no borders or background)'
		},
		to : {
			type        : [ Object, String ],
			description : 'The router link object or string'
		}
	},
	methods : {
		handleClick (event) {
			this.$emit('click', event)
		}
	}
}
</script>
<style lang="scss">
.aioseo-button {
	flex-shrink: 0;
	line-height: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	font-weight: 600;
	padding: 0 24px;
	border-radius: 4px;
	-webkit-appearance: none;
	cursor: pointer;
	height: 48px;
	transition: background-color 0.2s ease;
	position: relative;
	overflow: hidden;
	text-decoration: none;
	color: $black;
	white-space: nowrap;

	&.small {
		height: 30px;
		font-size: 14px;
		padding: 0 12px;

		.loading-spinner {
			width: 25px;
			height: 25px;
		}
	}

	&.medium {
		height: 40px;
		font-size: 14px;
		padding: 0 18px;

		.loading-spinner {
			width: 35px;
			height: 35px;
		}
	}

	&.xl {
		height: 66px;
		border-radius: 4px;
		font-size: 18px;
		padding: 0 48px;
	}

	&.gray {
		border: 1px solid $gray;
		background-color: $background;

		&:hover {
			background-color: #fff;
			color: $black;
		}

		&:active {
			background-color: $background;
		}
	}

	&.green {
		border: none;
		background-color: $green;
		color: #fff;

		&:hover {
			background-color: $green2;
		}

		&:active {
			background-color: $green3;
		}
	}

	&.blue {
		border: none;
		background-color: $blue;
		color: #fff;

		&:hover {
			background-color: $blue2;
		}

		&:active {
			background-color: $blue3;
		}
	}

	&.wp-blue {
		border: 1px solid $blue;
		background-color: $gray4;
		color: $blue;

		&:hover {
			background-color: $blue2;
			border-color: $blue2;
			color: #fff;
		}

		&:active {
			background-color: $blue3;
			border-color: $blue3;
			color: #fff;
		}
	}

	&.black {
		border: none;
		background-color: $black2;
		color: #fff;

		&:hover {
			background-color: $black2-hover;
		}

		&:active {
			background-color: $black;
		}
	}

	&.red {
		border: 1px solid $red;
		background-color: #fff;
		color: $red;

		&:hover {
			background-color: $red;
			color: #fff;
		}

		&:active {
			background-color: $red2;
		}
	}

	&.loading {
		&.blue {
			background-color: $blue3;
			color: $blue3;

			&:hover {
				background-color: $blue3;
				color: $blue3;
			}
		}

		&.green {
			background-color: $green3;
			color: $green3;

			&:hover {
				background-color: $green3;
				color: $green3;
			}
		}

		&.gray {
			background-color: $background;
			color: $background;

			&:hover {
				background-color: $background;
				color: $background;
			}
		}

		&.black {
			background-color: $black;
			color: $black;

			&:hover {
				background-color: $black;
				color: $black;
			}
		}
	}

	&:disabled {
		border: 1px solid $gray;
		color: $placeholder-color;
		background-color: $background;
		cursor: default;

		&.gray {
			&:hover {
				color: $placeholder-color;
			}
		}

		&.wp-blue {
			border-color: #DDDDDD;
			background-color: #F7F7F7;

			&:hover {
				border-color: #DDDDDD;
				color: $placeholder-color;
			}
		}

		&:hover {
			background-color: $background;
		}
	}
}
</style>
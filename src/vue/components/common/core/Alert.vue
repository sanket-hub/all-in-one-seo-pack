<template>
	<div
		class="aioseo-alert"
		:class="{
			[type] : type,
			[size] : size
		}"
	>
		<slot />

		<span
			@click="$emit('close-alert')"
			class="aioseo-alert-close"
			v-if="showClose"
		>
			<svg-close />
		</span>
	</div>
</template>

<script>
export default {
	props : {
		type : {
			type : String,
			default () {
				return 'blue'
			}
		},
		size : {
			type : String,
			default () {
				return 'medium'
			}
		},
		showClose : Boolean
	}
}
</script>

<style lang="scss">
.aioseo-alert {
	position: relative;
	border-radius: 3px;
	padding: 24px;
	font-size: 16px;
	color: $black;
	line-height: 1.4;

	&.small {
		padding: 8px;
		font-size: 13px;
	}

	.aioseo-alert-close {
		cursor: pointer;
		position: absolute;
		top: -9px;
		right: -9px;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		padding: 5px;
		display: inline-flex;
		justify-content: center;
		align-content: center;

		svg {
			width: 100%;
			height: 100%;
		}
	}

	&.blue {
		border: 1px solid $blue;
		background-color: $inline-background;

		.aioseo-alert-close {
			background-color: $blue;
			color: #fff;
		}
	}

	&.green {
		border: 1px solid $green;
		background-color: #f2fdf8;

		.aioseo-alert-close {
			background-color: $green;
			color: #fff;
		}
	}

	&.red {
		border: 1px solid $red;
		background-color: lighten($red2, 55%);

		.aioseo-alert-close {
			background-color: $red;
			color: #fff;
		}
	}

	&.yellow {
		border: 1px solid $orange;
		background-color: $yellow;

		.aioseo-alert-close {
			background-color: $orange;
			color: #fff;
		}
	}

	&.no-border {
		border-width: 0;
	}

	&.text-center {
		text-align: center;
	}
}
</style>
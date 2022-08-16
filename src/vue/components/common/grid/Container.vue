<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
export default {
	props : {
		hero      : { type: Boolean, default: false },
		fluid     : { type: Boolean, default: false },
		fullWidth : Boolean,
		small     : Boolean
	},
	computed : {
		classes () {
			let c = this.fluid ? 'aioseo-container-fluid ' : 'aioseo-container '
			c += this.hero ? 'aioseo-hero ' : ''
			c += this.fullWidth ? 'full-width ' : ''
			c += this.small ? 'small ' : ''
			return c
		}
	}
}
</script>

<style lang="scss">
.aioseo-container-fluid, .aioseo-container {
	margin-right: auto;
	margin-left: auto;
}

.aioseo-container {
	padding: 0 20px;
}

.aioseo-container-fluid.hero, .aioseo-container.hero {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.aioseo-container-fluid {
	padding-right: 2rem;
	padding-left: 2rem;
}

@media only screen and (min-width: 782px) {
	.aioseo-container {
		padding: 0 30px;
	}
}

@media only screen and (min-width: 1042px) {
	.aioseo-container {
		max-width: 1240px;

		&.full-width {
			max-width: 100%;
		}

		&.small {
			max-width: 810px;
		}
	}
}
</style>
<template>
	<div class="aioseo-add-template-tag">
		<svg-plus />
		<slot />
	</div>
</template>

<script>
import SvgPlus from '@/vue/components/common/svg/Plus'
export default {
	components : {
		SvgPlus
	}
}
</script>

<style lang="scss">
.aioseo-add-template-tag {
	border-radius: 3px;
	padding: 5px 10px;
	color: $black;
	font-size: 14px;
	border: 1px solid $border;
	cursor: pointer;
	user-select: none;
	font-weight: 600;

	&:hover {
		background-color: $background;
	}

	svg.aioseo-plus {
		width: 10px;
		height: 10px;
		color: $blue;
	}
}
</style>
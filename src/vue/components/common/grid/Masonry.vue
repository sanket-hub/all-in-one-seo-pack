<template>
	<div class="aioseo-masonry">
		<slot />
	</div>
</template>

<style lang="scss">
.aioseo-masonry {
	column-count: 0;
	column-gap: 20px;
	counter-reset: brick-counter;

	> * {
		box-sizing: border-box;
		break-inside: avoid;
		counter-increment: brick-counter;
		margin-bottom: 20px;
	}

	@media only screen and (min-width: 782px) {
		column-count: 1;
	}
	@media only screen and (min-width: 912px) {
		column-count: 2;
	}
	@media only screen and (min-width: 1042px) {
		column-count: 3;
	}
}
</style>
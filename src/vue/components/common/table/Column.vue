<template>
	<div class="aioseo-table-column">
		<slot />
	</div>
</template>

<style lang="scss">
.aioseo-table-column {
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex: 1;
	padding: 5px;
	justify-content: center;
}
</style>
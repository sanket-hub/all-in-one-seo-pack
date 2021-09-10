<template>
	<div class="aioseo-pro-badge">
		<slot>
			PRO
		</slot>
	</div>
</template>

<style lang="scss">
.aioseo-pro-badge {
	height: 24px;
	border-radius: 3px;
	background: $border;
	color: $black2;
	font-size: 14px;
	font-weight: 600;
	display: inline-flex;
	padding: 0 8px;
	align-items: center;
}
</style>
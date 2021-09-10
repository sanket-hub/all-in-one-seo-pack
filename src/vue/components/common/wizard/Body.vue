<template>
	<div class="aioseo-wizard-body">
		<div class="body-content">
			<slot />
		</div>
		<div
			v-if="$slots.cta"
			class="cta"
		>
			<slot name="cta" />
		</div>
		<div class="body-footer">
			<slot name="footer" />
		</div>
	</div>
</template>

<style lang="scss">
.aioseo-wizard-body {
	background-color: #fff;
	max-width: 900px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);

	.body-content {
		padding: 80px 140px;

		@media screen and (max-width: 782px) {
			padding: 40px;
		}

		.header {
			line-height: 1.4;
		}
	}

	.body-footer {
		border-top: 1px solid $border;
		padding: 30px;
		display: flex;
		align-items: center;

		> * {
			margin-right: 10px;

			&:last-child {
				margin-right: 0;
			}
		}

		.spacer {
			flex: 1 0 auto;
		}
	}
}
</style>
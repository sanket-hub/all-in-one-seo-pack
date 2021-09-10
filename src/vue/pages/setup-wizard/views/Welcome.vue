<template>
	<div class="aioseo-setup-wizard-welcome">
		<svg-giant-gear />

		<div class="aioseo-welcome-container">
			<div class="aioseo-welcome-content">
				<span class="header">{{ strings.welcome }}</span>

				<span class="description">
					{{ strings.description }}
				</span>

				<base-button
					type="green"
					size="xl"
					inline
					tag="router-link"
					:to="getNextLink"
				>
					{{ strings.letsGetStarted }} &rarr;
				</base-button>

				<div class="aioseo-go-back">
					<a :href="$aioseo.urls.aio.dashboard" class="no-underline">&larr;</a>
					&nbsp;
					<a :href="$aioseo.urls.aio.dashboard">{{ strings.goBack }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Wizard } from '@/vue/mixins'
export default {
	mixins : [ Wizard ],
	data () {
		return {
			stage   : 'welcome',
			strings : {
				// Translators: 1 - The plugin short name ("AIOSEO").
				welcome        : this.$t.sprintf(this.$t.__('Welcome to the %1$s Setup Wizard!', this.$td), process.env.VUE_APP_SHORT_NAME),
				// Translators: 1 - The plugin short name ("AIOSEO").
				description    : this.$t.sprintf(this.$t.__('%1$s makes it easy to configure your site\'s SEO settings without the need to hire an expert. And it takes less than 10 minutes too!', this.$td), process.env.VUE_APP_SHORT_NAME),
				letsGetStarted : this.$t.__('Let\'s Get Started', this.$td),
				goBack         : this.$t.__('Go back to the Dashboard', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-setup-wizard-welcome {
	padding: 25px;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	svg.aioseo-giant-gear {
		width: 904px;
		min-width: 904px;
		height: auto;
		color: #DDDEE2;
		opacity: 0.3;
	}

	.aioseo-welcome-container {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.aioseo-welcome-content {
			position: relative;
			width: 100%;
			max-width: 640px;
			background-color: #fff;
			border: 1px solid $border;
			box-shadow: 0px 2px 10px rgba(0, 90, 224, 0.2);
			padding: 70px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			text-align: center;

			.aioseo-go-back {
				position: absolute;
				bottom: -80px;
				align-self: center;

				a {
					color: $placeholder-color;
				}
			}

			.header {
				font-size: 24px;
				color: $black;
				font-weight: 600;
				margin-bottom: 30px;
			}

			.description {
				line-height: 1.4;
				font-size: 16px;
				color: $black2;
			}

			.aioseo-button {
				margin-top: 40px;
				max-width: 265px;
				align-self: center;
			}
		}
	}

	@media screen and (max-width: 782px) {
		.aioseo-welcome-container {
			.aioseo-welcome-content {
				padding: 30px;
			}
		}
	}
}
</style>
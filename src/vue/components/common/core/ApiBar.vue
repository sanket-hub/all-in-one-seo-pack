<template>
	<div class="aioseo-api-bar">
		<div class="upgrade-text">
			<svg-aioseo-logo-gear />

			<div v-html="upgradeText" />
		</div>
	</div>
</template>

<script>
import SvgAioseoLogoGear from '@/vue/components/common/svg/aioseo/LogoGear'
export default {
	components : {
		SvgAioseoLogoGear
	},
	data () {
		return {
			strings : {
				boldText : this.$t.sprintf(
					'<strong>%1$s %2$s</strong>',
					import.meta.env.VITE_SHORT_NAME,
					this.$isPro ? 'Pro' : ''
				),
				linkText : this.$t.__('Click here to learn more', this.$td)
			}
		}
	},
	computed : {
		link () {
			return this.$t.sprintf(
				'<strong><a href="%1$s" target="_blank" class="text-white">%2$s</a></strong>',
				this.$links.getDocUrl('restApi'),
				this.strings.linkText
			)
		},
		upgradeText () {
			return this.$t.sprintf(
				// Translators: 1 - The plugin name ("All in One SEO"), 2 - "upgrading to Pro".
				this.$t.__('%1$s relies on the WordPress Rest API and your site might have it disabled. %2$s.', this.$td),
				this.strings.boldText,
				this.link
			)
		}
	},
	mounted () {
		document.body.classList.add('aioseo-has-bar')
	},
	beforeDestroy () {
		document.body.classList.remove('aioseo-has-bar')
	}
}
</script>

<style lang="scss">
.aioseo-api-bar {
	display: flex;
	align-items: center;
	height: 40px;
	background-color: $red;
	justify-content: center;
	color: #fff;
	font-size: 13px;
	padding: 0 14px 0 40px;

	.upgrade-text {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: center;
	}

	strong {
		font-weight: 600;
	}

	svg.aioseo-logo-gear {
		width: 20px;
		height: 20px;
		min-width: 20px;
		margin-right: 14px;
	}

	svg.aioseo-close {
		cursor: pointer;
		width: 12px;
		height: 12px;
	}

	a {
		color: #fff;
		text-decoration: underline;

		&:hover {
			text-decoration: none;
		}
	}

	@media screen and (max-width: 782px) {
		padding: 0 10px;
		height: 60px;
	}
}
</style>
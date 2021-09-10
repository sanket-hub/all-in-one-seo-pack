<template>
	<div
		class="aioseo-flyout-menu"
		:class="{ open: isOpen }"
	>
		<div class="aioseo-flyout-menu-items">
			<a
				v-for="(item, index) in items"
				:key="index"
				:href="item.url"
				target="_blank"
				:style="{ transitionDelay: `${items.length - index}00ms` }"
				@mouseover="hovering = index"
				@mouseleave="hovering = null"
			>
				<span class="aioseo-flyout-menu-label">{{ item.label }}</span>
				<div class="aioseo-flyout-menu-label icon">
					<component :is="item.icon" :active="index === hovering"/>
				</div>
			</a>
		</div>
		<div
			@click="isOpen = !isOpen"
			class="aioseo-flyout-menu-button"
		>
			<span class="aioseo-flyout-menu-label">{{ strings.quickLinks }}</span>
			<component :is="isOpen ? 'svg-flyout-dannie-up' : 'svg-flyout-dannie'"/>
		</div>
	</div>
</template>

<script>
import { Standalone } from '@/vue/mixins/Standalone'
import { mapState } from 'vuex'
export default {
	mixins : [ Standalone ],
	data () {
		return {
			isOpen   : false,
			hovering : null,
			strings  : {
				quickLinks : this.$t.__('Quick Links', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'pong' ]),
		items () {
			const items = [
				{
					label : this.$t.__('Support & Docs', this.$td),
					url   : this.$links.utmUrl(
						'flyout-menu',
						'support-docs',
						this.$links.docLinks.home
					),
					icon : 'svg-support'
				},
				{
					label : this.$t.__('Join Our Community', this.$td),
					url   : this.$links.utmUrl(
						'flyout-menu',
						'join-our-community',
						'plugin/facebook/'
					),
					icon : 'svg-message'
				},
				{
					label : this.$t.__('Suggest a Feature', this.$td),
					url   : this.$links.utmUrl(
						'flyout-menu',
						'suggest-a-feature',
						'suggest-a-feature/'
					),
					icon : 'svg-light-bulb'
				}
			]

			if (!this.$isPro && this.pong) {
				items.unshift({
					// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro" string.
					label : this.$t.sprintf(this.$t.__('Upgrade to %1$s %2$s', this.$td), process.env.VUE_APP_SHORT_NAME, this.$t.__('Pro', this.$td)),
					url   : this.$links.utmUrl(
						'flyout-menu',
						'upgrade-to-pro'
					),
					icon : 'svg-star'
				})
			}

			return items
		}
	}
}
</script>

<style lang="scss">
.aioseo-flyout-menu {
	position: fixed;
    z-index: 1000;
    right: 20px;
    bottom: 30px;
	&-label {
		font-weight: 600;
		font-size: 12px;
		line-height: 15px;

		color: $black;
		background: $white;

		border: 1px solid $gray;
		box-sizing: border-box;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05), 0 9px 12px rgba(0, 0, 0, 0.05);
		border-radius: 80px;

		transition: all 0.05s ease;
	}
	&-button {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		cursor: pointer;
		> span {
			position: relative;
			z-index: 0;
			padding: 8px 16px;

			transition: all 0.2s ease;
			opacity: 0;
			transform: translateX(100%) scale(0.5)
		}
		svg {
			position: relative;
			z-index: 1;

			background: $white;
			border: 2px solid #004F9D;
			box-sizing: border-box;
			box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05), 0px 9px 12px rgba(0, 0, 0, 0.05);
			border-radius: 70px;

			margin-left: 12px;
		}
		&:hover {
			> span {
				opacity: 1;
				transform: translateX(0%) scale(1)
			}
		}
	}
	&-items {
		visibility: hidden;
		margin-bottom: 20px;
		margin-right: 8px;
		a {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 12px;

			text-decoration: none;
			transition: all 0.2s ease;
			opacity: 0;
			transform: translateX(100%);
			span {
				flex-shrink: 0;
				padding: 8px 16px;
			}
			.icon {
				width: 40px;
				height: 40px;
				margin-left: 8px;
				display: flex;
				justify-content: center;
				align-items: center;
				svg {
					max-width: 60%;
					max-height: 60%;
					transition: all 0.2s ease;
					path,
					g {
						will-change: transform, opacity;
						transition-property: transform, opacity;
						transition-duration: 0.5s;
						transition-timing-function: ease;
					}
				}
			}
			&:hover {
				.aioseo-flyout-menu-label {
					border-color: $blue3;
					color: $blue3;
					box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05), 0 9px 12px rgba(0, 0, 0, 0.05), inset 0 0 0 1px $blue3;
				}
				.icon {
					svg {
						max-width: 80%;
						max-height: 80%;
					}
				}
			}
		}
	}
	&.open &-items {
		visibility: visible;
		a {
			opacity: 1;
			transform: translateX(0%)
		}
	}
}
</style>
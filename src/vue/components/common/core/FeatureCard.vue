<template>
	<div class="aioseo-feature-card">
		<div
			class="feature-card-body"
			:class="{ static: staticCard }"
		>
			<div class="feature-card-header">
				<slot name="title" />
			</div>

			<div class="feature-card-description">
				<slot name="description" />

				<div
					v-if="(!activated || feature.requiresUpgrade) && !staticCard"
					class="learn-more"
				>
					<a
						:href="$links.utmUrl('feature-manager-addon-link', feature.sku, feature.learnMoreUrl)"
						target="_blank"
					>{{ $constants.GLOBAL_STRINGS.learnMore }}</a>
					<a
						:href="$links.utmUrl('feature-manager-addon-link', feature.sku, feature.learnMoreUrl)"
						class="no-underline"
						target="_blank"
					>&nbsp;&rarr;</a>
				</div>

				<div
					v-if="(activated && !feature.requiresUpgrade) || staticCard"
					class="learn-more"
				>
					<a :href="getHref(feature.manageUrl)">{{ strings.manage }}</a>
					<a
						:href="getHref(feature.manageUrl)"
						class="no-underline"
					>
						&rarr;
					</a>
				</div>

				<core-alert
					class="install-failed"
					v-if="failed"
					type="red"
				>
					{{ strings.activateError }}
				</core-alert>
			</div>
		</div>

		<div
			v-if="canActivate"
			class="feature-card-footer"
			:class="{ 'upgrade-required': feature.requiresUpgrade || !$aioseo.license.isActive }"
		>
			<div
				v-if="!feature.requiresUpgrade && $aioseo.license.isActive"
				class="feature-card-install-activate"
			>
				<core-loader
					v-if="loading"
					dark
				/>
				<span class="status">
					{{ activated ? strings.activated : (feature.installed || feature.canInstall ? strings.deactivated : strings.notInstalled) }}
				</span>
				<base-toggle
					v-if="feature.installed || feature.canInstall"
					:value="activated"
					@input="processStatusChange"
				/>
			</div>

			<div
				v-if="feature.requiresUpgrade || !$aioseo.license.isActive"
				class="feature-card-upgrade-cta"
			>
				<base-button
					type="green"
					size="medium"
					tag="a"
					:href="!$isPro ? $links.getUpsellUrl('feature-manager-upgrade', feature.sku, 'liteUpgrade') : $links.getUpsellUrl('feature-manager-upgrade', feature.sku, 'pricing')"
					target="_blank"
				>
					<span v-if="$isPro">{{ strings.upgradeYourPlan }}</span>
					<span v-if="!$isPro">{{ strings.upgradeToPro }}</span>
				</base-button>
			</div>
		</div>
	</div>
</template>

<script>
import { getParams } from '@/vue/utils/params'
import { Url } from '@/vue/mixins'
import { mapActions } from 'vuex'
export default {
	mixins : [ Url ],
	props  : {
		feature : {
			type     : Object,
			required : true
		},
		canActivate : {
			type : Boolean,
			default () {
				return true
			}
		},
		staticCard : Boolean
	},
	data () {
		return {
			failed    : false,
			loading   : false,
			activated : false,
			strings   : {
				activated       : this.$t.__('Activated', this.$td),
				deactivated     : this.$t.__('Deactivated', this.$td),
				notInstalled    : this.$t.__('Not Installed', this.$td),
				upgradeToPro    : this.$t.__('Upgrade to Pro', this.$td),
				upgradeYourPlan : this.$t.__('Upgrade Your Plan', this.$td),
				manage          : this.$t.__('Manage', this.$td),
				activateError   : this.$t.__('An error occurred while activating the addon. Please upload it manually or contact support for more information.', this.$td)
			}
		}
	},
	methods : {
		...mapActions([ 'deactivatePlugins', 'installPlugins' ]),
		processStatusChange () {
			this.failed    = false
			this.loading   = true
			const action   = this.activated ? 'deactivatePlugins' : 'installPlugins'
			this.activated = !this.activated
			this[action]([ { plugin: this.feature.basename } ])
				.then(response => {
					this.loading = false
					if (response.body.failed.length) {
						this.activated = !this.activated
						this.failed = true
					}
				})
				.catch(() => {
					this.loading   = false
					this.activated = !this.activated
				})
		}
	},
	mounted () {
		if (this.feature.isActive) {
			this.activated = true
		}

		const params = getParams()
		if (!this.activated && params['aioseo-activate'] && params['aioseo-activate'] === this.feature.sku) {
			this.loading   = true
			this.activated = true
			this.installPlugins([ { plugin: this.feature.basename } ])
				.then(() => (this.loading = false))
				.catch(() => {
					this.loading   = false
					this.activated = !this.activated
				})
		}
	}
}
</script>

<style lang="scss">
.aioseo-feature-card {
	height: 100%;
	border: 1px solid $border;
	background: #fff;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
	color: $black;
	display: flex;
	flex-direction: column;

	.feature-card-body {
		padding: 30px 30px 20px;
		flex: 1;

		&.static {
			padding: 30px;
		}

		.feature-card-header {
			display: flex;
			align-items: center;
			font-size: 18px;
			font-weight: 600;
			margin-bottom: 16px;

			img,
			svg {
				width: 28px;
				height: 28px;
				margin-right: 10px;
			}
		}

		.feature-card-description {
			color: $black2;
			font-size: 15px;

			.learn-more {
				margin-top: 10px;
			}
		}
	}

	.feature-card-footer {
		padding: 15px;

		&:not(.upgrade-required) {
			border: 2px solid #fff;
			background-color: $box-background;
			padding: 12px;
			min-height: 43px;
		}

		.feature-card-install-activate {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			height: 30px;
			position: relative;

			.aioseo-loading-spinner {
				position: absolute;
				left: 0;
			}

			.status {
				font-weight: 600;
				font-size: 14px;
			}

			.aioseo-toggle {
				.toggle-content {
					margin-right: 0;
					margin-left: 10px;
				}
			}
		}

		.feature-card-upgrade-cta {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		&.installed {
			.feature-card-install-activate {
				.status {
					color: $placeholder-color;
				}
			}
		}
	}
}
</style>
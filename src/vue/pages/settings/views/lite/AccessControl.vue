<template>
	<div class="aioseo-access-control-lite">
		<core-card
			slug="accessControl"
		>
			<template #header>
				{{ strings.accessControl }}
				<core-pro-badge />
			</template>

			<template #tooltip>
				{{ strings.tooltip }}
			</template>

			<core-blur>
				<template
					v-for="role in roles"
				>
					<core-settings-row
						:key="role"
						:name="strings[role]"
					>
						<template #content>
							<div
								class="toggle"
							>
								<base-toggle
									:disabled="true"
									:value="true"
								>
									{{ strings.useDefaultSettings }}
								</base-toggle>
							</div>
						</template>
					</core-settings-row>
				</template>
			</core-blur>

			<cta
				:feature-list="[
					strings.granularControl,
					strings.wpRoles,
					strings.seoManagerRole,
					strings.seoEditorRole
				]"
				:cta-link="$links.getPricingUrl('access-control', 'access-control-upsell')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('access-control', null, 'home')"
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					{{ strings.tooltip }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
import { AccessControl } from '@/vue/pages/settings/mixins'
export default {
	mixins : [ AccessControl ],
	data () {
		return {
			strings : {
				wpRoles         : this.$t.__('WP Roles (Editor, Author)', this.$td),
				seoManagerRole  : this.$t.__('SEO Manager Role', this.$td),
				seoEditorRole   : this.$t.__('SEO Editor Role', this.$td),
				defaultSettings : this.$t.__('Default settings that just work', this.$td),
				granularControl : this.$t.__('Granular controls per role', this.$td),
				ctaButtonText   : this.$t.__('Upgrade to Pro and Unlock Access Control', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader       : this.$t.sprintf(this.$t.__('Access Control is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro')
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-access-control-lite {
	.aioseo-card {
		.content {
			position: relative;
			min-height: 500px;
		}
	}
}
</style>
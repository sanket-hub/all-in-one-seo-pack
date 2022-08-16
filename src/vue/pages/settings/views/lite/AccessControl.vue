<template>
	<div class="aioseo-access-control-lite">
		<core-card
			slug="accessControl"
		>
			<template #header>
				<span>{{ strings.accessControl }}</span>
				<core-pro-badge />
			</template>

			<template #tooltip>
				{{ strings.tooltip }}
			</template>

			<core-blur>
				<template
					v-for="role in getLiteRoles"
				>
					<core-settings-row
						:key="role.name"
						:name="role.label"
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
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreCard from '@/vue/components/common/core/Card'
import CoreProBadge from '@/vue/components/common/core/ProBadge'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import Cta from '@/vue/components/common/cta/Index.vue'
export default {
	components : {
		CoreBlur,
		CoreCard,
		CoreProBadge,
		CoreSettingsRow,
		Cta
	},
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
				ctaHeader       : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Access Control is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
			}
		}
	},
	computed : {
		getLiteRoles () {
			const roles = this.getRoles

			let roleNumber = 1
			while (8 > roles.length) {
				roles.push({
					label : this.$t.__('Custom Role', this.$td) + ' ' + roleNumber,
					name  : 'customRole' + roleNumber
				})
				roleNumber++
			}

			return roles
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
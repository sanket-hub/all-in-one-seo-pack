<template>
	<div class="aioseo-sa-ct-custom-fields">
		<core-blur>
			<core-settings-row
				:name="strings.customFields"
				align
			>
				<template #content>
					<base-textarea
						:min-height="200"
					/>

					<div class="aioseo-description">
						{{ strings.customFieldsDescription }}
					</div>
				</template>
			</core-settings-row>
		</core-blur>

		<cta
			:cta-link="$links.getPricingUrl('custom-fields', 'custom-fields-upsell', `${object.name}-post-type`)"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('custom-fields', object.name, 'home')"
		>
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>
			<template #description>
				{{ strings.ctaDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props : {
		type : {
			type     : String,
			required : true
		},
		object : {
			type     : Object,
			required : true
		}
	},
	data () {
		return {
			strings : {
				customFields            : this.$t.__('Custom Fields', this.$td),
				customFieldsDescription : this.$t.__('List of custom field names to include in the SEO Page Analysis. Add one per line.', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaDescription          : this.$t.sprintf(this.$t.__('%1$s %2$s gives you advanced customizations for our page analysis feature, letting you add custom fields to analyze.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				ctaButtonText           : this.$t.__('Upgrade to Pro and Unlock Custom Fields', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader               : this.$t.sprintf(this.$t.__('Custom Fields are only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro')
			}
		}
	},
	computed : {
		...mapState([ 'options' ])
	},
	methods : {
		getSchemaTypeOption (option) {
			return this.schemaTypes.find(st => st.value === option)
		}
	}
}
</script>

<style lang="scss">
.aioseo-sa-ct-custom-fields {
	min-height: 350px;
}
</style>
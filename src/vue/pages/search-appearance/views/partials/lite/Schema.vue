<template>
	<div class="aioseo-sa-ct-schema-lite">
		<core-blur>
			<core-settings-row
				:name="strings.schemaType"
				align
			>
				<template #content>
					<base-select
						size="medium"
						class="schema-type"
						:options="schemaTypes"
						:value="getSchemaTypeOption('Article')"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.articleType"
				align
			>
				<template #content>
					<base-radio-toggle
						:name="`${object.name}articleType`"
						value="BlogPosting"
						:options="[
							{ label: strings.article, value: 'Article' },
							{ label: strings.blogPost, value: 'BlogPosting' },
							{ label: strings.newsArticle, value: 'NewsArticle' },
						]"
					/>
				</template>
			</core-settings-row>
		</core-blur>

		<cta
			:feature-list="strings.graphs"
			:cta-link="$links.getPricingUrl('schema-markup', 'schema-markup-upsell', `${object.name}-post-type`)"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('schema-markup', object.name, 'home')"
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
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import Cta from '@/vue/components/common/cta/Index.vue'
export default {
	components : {
		BaseRadioToggle,
		CoreBlur,
		CoreSettingsRow,
		Cta
	},
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
			schemaTypes : [
				{ value: 'none', label: this.$t.__('None', this.$td) },
				{ value: 'Article', label: this.$t.__('Article', this.$td) }
			],
			strings : {
				schemaType  : this.$t.__('Schema Type', this.$td),
				articleType : this.$t.__('Article Type', this.$td),
				article     : this.$t.__('Article', this.$td),
				blogPost    : this.$t.__('Blog Post', this.$td),
				newsArticle : this.$t.__('News Article', this.$td),
				ctaHeader   : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Advanced Schema Markup is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				ctaDescription : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('%1$s %2$s allows you to customize the structured data markup for your Posts so that search engines can generate rich snippets for your content in search results.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				ctaButtonText : this.$t.__('Upgrade to Pro and Unlock Advanced Schema Markup', this.$td),
				graphs        : [
					this.$t.__('Product (WooCommerce and EDD support)', this.$td),
					this.$t.__('FAQ Page', this.$td),
					this.$t.__('Software Application', this.$td),
					this.$t.__('Recipe', this.$td),
					this.$t.__('Course', this.$td)
				]
			}
		}
	},
	methods : {
		getSchemaTypeOption (option) {
			return this.schemaTypes.find(st => st.value === option)
		}
	}
}
</script>

<style lang="scss">
.aioseo-sa-ct-schema-lite {
	min-height: 580px;

	@media (max-width: 598px) {
		min-height: 640px;
		.aioseo-cta.floating{
			top: 0;
		}
	}

	@media (max-width: 420px) {
		min-height: 770px;
	}

	.aioseo-cta {
		.header-text {
			width: 100%;
			max-width: 600px;
		}
	}

	.schema-type {
		max-width: 250px;
	}
}
</style>
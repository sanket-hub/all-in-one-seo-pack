<template>
	<div class="aioseo-tab-content aioseo-post-schema-lite">
		<core-settings-row
			:name="strings.schemaType"
		>
			<template #content>
				<base-select
					disabled
					size="medium"
					class="schema-type"
					:options="[
						{ value: 'default', label: 'Default (Set in Search Appearance)' },
						{ value: 'none', label: 'None' },
						{ value: 'Article', label: 'Article' }
					]"
					:value="{ value: 'Article', label: 'Article' }"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.articleType"
			align
		>
			<template #content>
				<base-radio-toggle
					disabled
					name="articleType"
					value="BlogPosting"
					:options="[
						{ label: strings.article, value: 'Article' },
						{ label: strings.blogPost, value: 'BlogPosting' },
						{ label: strings.newsArticle, value: 'NewsArticle' },
					]"
				/>
			</template>
		</core-settings-row>

		<core-alert
			class="schema-upsell inline-upsell"
			v-if="!$isPro || !$aioseo.license.isActive"
			type="blue"
		>
			<div v-html="strings.schemaUpsell" />
		</core-alert>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data () {
		return {
			strings : {
				schemaType   : this.$t.__('Schema Type', this.$td),
				articleType  : this.$t.__('Article Type', this.$td),
				article      : this.$t.__('Article', this.$td),
				blogPost     : this.$t.__('Blog Post', this.$td),
				newsArticle  : this.$t.__('News Article', this.$td),
				// Translators: 1 - The plugin short name name ("AIOSEO"), 2 - "Learn more".
				schemaUpsell : this.$t.sprintf(this.$t.__('This feature is only for licensed %1$s users. %2$s', this.$td), `<strong>${process.env.VUE_APP_SHORT_NAME} Pro</strong>`, this.$links.getUpsellLink('post-schema', this.$constants.GLOBAL_STRINGS.learnMore, null, true))
			}
		}
	},
	computed : {
		...mapState([ 'currentPost' ])
	}
}
</script>

<style lang="scss">
.aioseo-post-schema-lite {
	position: relative;
	min-height: 450px;

	.schema-type {
		max-width: 350px;
	}
	.aioseo-description {
		font-size: 14px;
		line-height: 1.8;
		margin: 8px 0 0;
		color: $black;
	}
	.field-description {
		font-size: 14px;
	}
	.block {
		display: block;
	}
	.aioseo-settings-row:last-of-type {
		margin-bottom: 30px !important;
		padding-bottom: 30px !important;
	}
	.schema-book-rating-options {
		display: flex;

		.rating,
		.rating-min {
			margin-right: 30px;
			flex: 1;
		}
		.rating-max {
			flex: 1;
		}
		@media screen and (max-width: 782px) {
			display: block;

			.rating,
			.rating-min {
				margin-right: 0;
				margin-bottom: 30px;
			}
		}
	}
	.schema-person-options {
		display: flex;
		flex: 0 1 auto;
		flex-direction: row;
		flex-wrap: wrap;
		@media screen and (max-width: 782px) {
			display: block;
		}
	}
	.aioseo-alert.schema-upsell {
		max-width: 560px;
	}
}
.edit-post-sidebar {
	.aioseo-post-schema {
		.aioseo-settings-row.aioseo-row {
			.col-md-9 .settings-content .aioseo-col {
				padding-left: 0;
				padding-right: 0;
			}
		}
	}
	.schema-book-rating-options {
		display: block;
		.rating,
		.rating-min {
			margin: 0 0 20px 0;
		}
	}
	.schema-upsell {
		margin-top: 20px;
	}
}
</style>
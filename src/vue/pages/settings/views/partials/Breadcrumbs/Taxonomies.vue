<template>
	<div class="content">
		<core-settings-row
			:name="taxonomy.label"
			:key="taxonomy.name"
			v-for="taxonomy in taxonomies"
		>
			<template #content>
				<div>
					<preview :preview-data="getPreview(taxonomy)"
							 :useDefaultTemplate="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].useDefaultTemplate"></preview>
					<grid-row>
						<grid-column>
							<base-toggle
								v-model="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].useDefaultTemplate"
								class="current-item"
							/>
							{{ strings.useDefaultTemplate }}
						</grid-column>
					</grid-row>
					<grid-row v-if="!options.breadcrumbs.dynamic.taxonomies[taxonomy.name].useDefaultTemplate">
						<grid-column
							v-if="options.breadcrumbs.breadcrumbPrefix && options.breadcrumbs.breadcrumbPrefix.length">
							<base-toggle
								v-model="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].showPrefixCrumb"
								class="current-item"
							/>
							{{ strings.showPrefixLabel }}
						</grid-column>
						<grid-column>
							<base-toggle
								v-model="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].showHomeCrumb"
								class="current-item"
							/>
							{{ strings.showHomeLabel }}
						</grid-column>
						<grid-column v-if="taxonomy.hierarchical">
							<base-toggle
								v-model="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].showParentCrumbs"
								class="current-item"
							/>
							{{ strings.showParentLabel }}
						</grid-column>
						<grid-column>
							<core-settings-row
								:name="taxonomy.hierarchical && options.breadcrumbs.dynamic.taxonomies[taxonomy.name].showParentCrumbs ? strings.singleTemplateLabel : ''"
								leftSize="12"
								rightSize="12"
							>
								<template #content>
									<core-html-tags-editor
										v-model="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].template"
										:line-numbers="true"
										checkUnfilteredHtml
										:tags-context="'breadcrumbs-taxonomy-'+taxonomy.name"
										:minimum-line-numbers="3"
										:default-tags="[
							'breadcrumb_taxonomy_title',
							'breadcrumb_link'
						]"
									>
									</core-html-tags-editor>
								</template>
							</core-settings-row>
						</grid-column>
						<grid-column
							v-if="taxonomy.hierarchical && options.breadcrumbs.dynamic.taxonomies[taxonomy.name].showParentCrumbs">
							<core-settings-row
								:name="strings.parentTemplateLabel"
								leftSize="12"
								rightSize="12"
							>
								<template #content>
									<core-html-tags-editor
										v-model="options.breadcrumbs.dynamic.taxonomies[taxonomy.name].parentTemplate"
										:line-numbers="true"
										checkUnfilteredHtml
										:tags-context="'breadcrumbs-taxonomy-'+taxonomy.name"
										:minimum-line-numbers="3"
										:default-tags="[
							'breadcrumb_taxonomy_title',
							'breadcrumb_link'
						]"
									>
									</core-html-tags-editor>
								</template>
							</core-settings-row>
						</grid-column>
					</grid-row>
				</div>
			</template>
		</core-settings-row>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import preview from './Preview'

export default {
	components : { preview },
	data () {
		return {
			strings : {
				useDefaultTemplate  : this.$t.__('Use a default template', this.$td),
				showHomeLabel       : this.$t.__('Show homepage link', this.$td),
				showPrefixLabel     : this.$t.__('Show prefix link', this.$td),
				showParentLabel     : this.$t.__('Show parent item link', this.$td),
				singleTemplateLabel : this.$t.__('Single item template', this.$td),
				parentTemplateLabel : this.$t.__('Parent item template', this.$td)
			}
		}
	},
	methods : {
		getPreview (taxonomy) {
			const breadcrumbOptions = this.options.breadcrumbs
			const taxOptions = breadcrumbOptions.dynamic.taxonomies[taxonomy.name]
			const useDefault = taxOptions.useDefaultTemplate
			return [
				(useDefault && breadcrumbOptions.breadcrumbPrefix) || (!useDefault && taxOptions.showPrefixCrumb) ? breadcrumbOptions.breadcrumbPrefix : '',
				(useDefault && breadcrumbOptions.homepageLink) || (!useDefault && taxOptions.showHomeCrumb) ? (breadcrumbOptions.homepageLabel ? breadcrumbOptions.homepageLabel : 'Home') : '',
				([ 'category', 'post_tag' ].includes(taxonomy.name) && breadcrumbOptions.showBlogHome && this.$aioseo.data.staticBlogPage) ? 'Blog Home' : '',
				this.taxonomyHasArchive(taxonomy) ? taxonomy.label : '',
				taxonomy.hierarchical && (useDefault || (!useDefault && taxOptions.showParentCrumbs)) ? this.getTaxonomyParentTemplate(taxonomy) : '',
				this.getTaxonomyTemplate(taxonomy)
			]
		},
		taxonomyHasArchive (taxonomy) {
			return 0 < this.$aioseo.postData.taxonomies.filter(taxonomyData => taxonomyData.name === taxonomy.name && taxonomyData.hasArchive).length
		},
		getTaxonomyParentTemplate (taxonomy) {
			const template = this.options.breadcrumbs.dynamic.taxonomies[taxonomy.name].useDefaultTemplate ? this.$aioseo.breadcrumbs.defaultTemplates.taxonomies[taxonomy.name] : this.options.breadcrumbs.dynamic.taxonomies[taxonomy.name].parentTemplate
			return template.replace(new RegExp('#breadcrumb_taxonomy_title', 'g'), taxonomy.singular + ' Parent')
		},
		getTaxonomyTemplate (taxonomy) {
			const template = this.options.breadcrumbs.dynamic.taxonomies[taxonomy.name].useDefaultTemplate ? this.$aioseo.breadcrumbs.defaultTemplates.taxonomies[taxonomy.name] : this.options.breadcrumbs.dynamic.taxonomies[taxonomy.name].template
			return template.replace(new RegExp('#breadcrumb_taxonomy_title', 'g'), taxonomy.singular)
		}
	},
	computed : {
		...mapState([ 'options' ]),
		taxonomies () {
			return this.$aioseo.postData.taxonomies
		}
	}
}
</script>
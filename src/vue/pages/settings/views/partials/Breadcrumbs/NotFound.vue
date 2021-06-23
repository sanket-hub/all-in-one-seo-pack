<template>
	<core-settings-row
		name="404"
		key="404"
	>
		<template #content>
			<div>
				<preview :preview-data="getPreview()"
						 :useDefaultTemplate="options.breadcrumbs.dynamic.archives.notFound.useDefaultTemplate"></preview>
				<grid-row>
					<grid-column>
						<base-toggle
							v-model="options.breadcrumbs.dynamic.archives.notFound.useDefaultTemplate"
							class="current-item"
						/>
						{{ strings.useDefaultTemplate }}
					</grid-column>
				</grid-row>
				<grid-row v-if="!options.breadcrumbs.dynamic.archives.notFound.useDefaultTemplate">
					<grid-column
						v-if="options.breadcrumbs.breadcrumbPrefix && options.breadcrumbs.breadcrumbPrefix.length">
						<base-toggle
							v-model="options.breadcrumbs.dynamic.archives.notFound.showPrefixCrumb"
							class="current-item"
						/>
						{{ strings.showPrefixLabel }}
					</grid-column>
					<grid-column>
						<base-toggle
							v-model="options.breadcrumbs.dynamic.archives.notFound.showHomeCrumb"
							class="current-item"
						/>
						{{ strings.showHomeLabel }}
					</grid-column>
					<grid-column>
						<core-html-tags-editor
							v-model="options.breadcrumbs.dynamic.archives.notFound.template"
							:line-numbers="true"
							checkUnfilteredHtml
							tags-context="breadcrumbs-notFound"
							:minimum-line-numbers="3"
							:default-tags="[
										'breadcrumb_404_error_format',
										'breadcrumb_link'
									]"
						>
						</core-html-tags-editor>
					</grid-column>
				</grid-row>
			</div>
		</template>
	</core-settings-row>
</template>

<script>
import { mapState } from 'vuex'
import preview from './Preview'

export default {
	components : { preview },
	data () {
		return {
			strings : {
				useDefaultTemplate : this.$t.__('Use a default template', this.$td),
				showHomeLabel      : this.$t.__('Show homepage link', this.$td),
				showPrefixLabel    : this.$t.__('Show prefix link', this.$td)
			}
		}
	},
	methods : {
		getPreview () {
			const breadcrumbOptions = this.options.breadcrumbs
			const archiveOptions = breadcrumbOptions.dynamic.archives.notFound
			const useDefault = archiveOptions.useDefaultTemplate
			return [
				(useDefault && breadcrumbOptions.breadcrumbPrefix) || (!useDefault && archiveOptions.showPrefixCrumb) ? breadcrumbOptions.breadcrumbPrefix : '',
				(useDefault && breadcrumbOptions.homepageLink) || (!useDefault && archiveOptions.showHomeCrumb) ? (breadcrumbOptions.homepageLabel ? breadcrumbOptions.homepageLabel : 'Home') : '',
				this.getTemplate()
			]
		},
		getTemplate () {
			const template = this.options.breadcrumbs.dynamic.archives.notFound.useDefaultTemplate ? this.$aioseo.breadcrumbs.defaultTemplates.archives.notFound : this.options.breadcrumbs.dynamic.archives.notFound.template
			return template.replace(/#breadcrumb_404_error_format/g, this.options.breadcrumbs.errorFormat404)
		}
	},
	computed : {
		...mapState([ 'options' ])
	}
}
</script>
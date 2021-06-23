<template>
	<core-settings-row
		name="Date"
		key="Date"
	>
		<template #content>
			<div>
				<div class="previews-box">
					<preview :preview-data="getPreview('day')"
							 :useDefaultTemplate="options.breadcrumbs.dynamic.archives.date.useDefaultTemplate"></preview>
					<preview :preview-data="getPreview('month')"
							 :useDefaultTemplate="options.breadcrumbs.dynamic.archives.date.useDefaultTemplate"></preview>
					<preview :preview-data="getPreview('')"
							 :useDefaultTemplate="options.breadcrumbs.dynamic.archives.date.useDefaultTemplate"></preview>
				</div>
				<grid-row>
					<grid-column>
						<base-toggle
							v-model="options.breadcrumbs.dynamic.archives.date.useDefaultTemplate"
							class="current-item"
						/>
						{{ strings.useDefaultTemplate }}
					</grid-column>
				</grid-row>
				<grid-row v-if="!options.breadcrumbs.dynamic.archives.date.useDefaultTemplate">
					<grid-column
						v-if="options.breadcrumbs.breadcrumbPrefix && options.breadcrumbs.breadcrumbPrefix.length">
						<base-toggle
							v-model="options.breadcrumbs.dynamic.archives.date.showPrefixCrumb"
							class="current-item"
						/>
						{{ strings.showPrefixLabel }}
					</grid-column>
					<grid-column>
						<base-toggle
							v-model="options.breadcrumbs.dynamic.archives.date.showHomeCrumb"
							class="current-item"
						/>
						{{ strings.showHomeLabel }}
					</grid-column>
					<grid-column>
						<strong>{{ strings.year }}</strong>
						<core-html-tags-editor
							v-model="options.breadcrumbs.dynamic.archives.date.template.year"
							:line-numbers="true"
							checkUnfilteredHtml
							tags-context="breadcrumbs-date-archive-year"
							:minimum-line-numbers="3"
							:default-tags="[
										'breadcrumb_date_archive_year',
										'breadcrumb_link'
									]"
						>
						</core-html-tags-editor>

						<strong>{{ strings.month }}</strong>
						<core-html-tags-editor
							v-model="options.breadcrumbs.dynamic.archives.date.template.month"
							:line-numbers="true"
							checkUnfilteredHtml
							tags-context="breadcrumbs-date-archive-month"
							:minimum-line-numbers="3"
							:default-tags="[
										'breadcrumb_date_archive_month',
										'breadcrumb_link'
									]"
						>
						</core-html-tags-editor>

						<strong>{{ strings.day }}</strong>
						<core-html-tags-editor
							v-model="options.breadcrumbs.dynamic.archives.date.template.day"
							:line-numbers="true"
							checkUnfilteredHtml
							tags-context="breadcrumbs-date-archive-day"
							:minimum-line-numbers="3"
							:default-tags="[
										'breadcrumb_date_archive_day',
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
				showPrefixLabel    : this.$t.__('Show prefix link', this.$td),
				year               : this.$t.__('Year', this.$td),
				month              : this.$t.__('Month', this.$td),
				day                : this.$t.__('Day', this.$td)
			}
		}
	},
	methods : {
		getPreview (type) {
			const breadcrumbOptions = this.options.breadcrumbs
			const archiveOptions = breadcrumbOptions.dynamic.archives.date
			const useDefault = archiveOptions.useDefaultTemplate
			return [
				(useDefault && breadcrumbOptions.breadcrumbPrefix) || (!useDefault && archiveOptions.showPrefixCrumb) ? breadcrumbOptions.breadcrumbPrefix : '',
				(useDefault && breadcrumbOptions.homepageLink) || (!useDefault && archiveOptions.showHomeCrumb) ? (breadcrumbOptions.homepageLabel ? breadcrumbOptions.homepageLabel : 'Home') : '',
				breadcrumbOptions.showBlogHome && this.$aioseo.data.staticBlogPage ? 'Blog Home' : '',
				this.getYearTemplate(),
				('day' === type || 'month' === type) ? this.getMonthTemplate() : '',
				('day' === type) ? this.getDayTemplate() : ''
			]
		},
		getYearTemplate () {
			const template = this.options.breadcrumbs.dynamic.archives.date.useDefaultTemplate ? this.$aioseo.breadcrumbs.defaultTemplates.archives.date.year : this.options.breadcrumbs.dynamic.archives.date.template.year
			return template.replace(/#breadcrumb_date_archive_year/g, this.strings.year)
		},
		getMonthTemplate () {
			const template = this.options.breadcrumbs.dynamic.archives.date.useDefaultTemplate ? this.$aioseo.breadcrumbs.defaultTemplates.archives.date.month : this.options.breadcrumbs.dynamic.archives.date.template.month
			return template.replace(/#breadcrumb_date_archive_month/g, this.strings.month)
		},
		getDayTemplate () {
			const template = this.options.breadcrumbs.dynamic.archives.date.useDefaultTemplate ? this.$aioseo.breadcrumbs.defaultTemplates.archives.date.day : this.options.breadcrumbs.dynamic.archives.date.template.day
			return template.replace(/#breadcrumb_date_archive_day/g, this.strings.day)
		}
	},
	computed : {
		...mapState([ 'options' ])
	}
}
</script>

<style scoped>
.aioseo-html-tags-editor{
	margin-bottom: 40px;
}
</style>
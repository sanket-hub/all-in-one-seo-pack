<template>
	<div class="aioseo-writing-assistant-competitors">
		<div class="top">
			<div class="filters">
				<div class="filter-item sort">
					<div class="label">
						{{ strings.sortBy }}:
					</div>
					<base-select
						v-model="wa.sortFilters.competitors"
						:options="sortDropdown"
						size="small"
					></base-select>
				</div>
			</div>
			<div class="export">
				<base-button
					size="small"
					type="gray"
					@click="export()"
				>
					<svg-download />
					{{ strings.csv }}
				</base-button>
			</div>
		</div>
		<div class="competitors">
			<core-simple-table
				:columns="columns"
				:rows="sortedKeyphraseCompetitors"
				:show-search="false"
			>
				<template #competitor="{ index, row }">
					<div class="competitor-title">{{ row.title }}</div>
					<div class="competitor-url">
						<a :href="row.url" target="_blank">
							{{ row.url }}
						</a>
					</div>
				</template>
			</core-simple-table>
		</div>
	</div>
</template>

<script>
import BaseSelect from '@/vue/components/common/base/Select.vue'
import BaseButton from '@/vue/components/common/base/Button.vue'
import SvgDownload from '@/vue/components/common/svg/Download.vue'
import CoreSimpleTable from '@/vue/components/common/core/SimpleTable.vue'
import { mapState, mapGetters } from 'vuex'
import { arrayToCsv } from '@/vue/utils/csv'
import { downloadFile } from '@/vue/utils/download'

export default {
	components : {
		BaseSelect,
		BaseButton,
		SvgDownload,
		CoreSimpleTable
	},
	data () {
		return {
			strings : {
				sortBy           : this.$t.__('Sort by', this.$td),
				csv              : this.$t.__('CSV', this.$td),
				article          : this.$t.__('Article', this.$td),
				readabilityGrade : this.$t.__('Readability', this.$td),
				wordCount        : this.$t.__('Word count', this.$td),
				grade            : this.$t.__('Grade', this.$td),
				url              : this.$t.__('URL', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'wa' ]),
		...mapGetters([ 'getKeyphraseCompetitors' ]),
		sortDropdown () {
			return [
				{
					label : this.strings.readabilityGrade,
					value : 'readabilityScore',
					order : 'desc'
				},
				{
					label : this.strings.wordCount,
					value : 'wordCount',
					order : 'desc'
				},
				{
					label : this.strings.grade,
					value : 'grade',
					order : 'asc'
				}
			]
		},
		columns () {
			return [
				{
					slug  : 'competitor',
					label : this.strings.article
				},
				{
					slug  : 'readabilityGrade',
					label : this.strings.readabilityGrade
				},
				{
					slug  : 'wordCount',
					label : this.strings.wordCount
				},
				{
					slug  : 'grade',
					label : this.strings.grade,
					width : '95px'
				}
			]
		},
		exportColumns () {
			return [
				{
					slug  : 'title',
					label : this.strings.article
				},
				{
					slug  : 'url',
					label : this.strings.url
				},
				{
					slug  : 'readabilityGrade',
					label : this.strings.readabilityGrade
				},
				{
					slug  : 'wordCount',
					label : this.strings.wordCount
				},
				{
					slug  : 'grade',
					label : this.strings.grade
				}
			]
		},
		sortedKeyphraseCompetitors () {
			let competitors = this.getKeyphraseCompetitors
			const sort = this.wa.sortFilters.competitors
			if (!sort) {
				return competitors
			}

			return competitors.sort((a, b) => {
				if ('asc' === sort.order) {
					return a[sort.value] - b[sort.value]
				}
				if ('desc' === sort.order) {
					return b[sort.value] - a[sort.value]
				}

				return 0
			})
		}
	},
	methods  : {
		export () {
			var header = this.exportColumns.map(col => col.label);
			var data = this.sortedKeyphraseCompetitors.map(elem => {
				elem = Object.fromEntries(
					Object.entries(elem).filter((a) => {
						// Remove elements data elements not slated for export.
						if (-1 === this.exportColumns.findIndex(col => a[0] === col.slug)) {
							return false
						}
						return true
					}).sort((c, n) => {
						// Sort elem data same as export columns
						const cIndex = this.exportColumns.findIndex(col => c[0] === col.slug)
						const nIndex = this.exportColumns.findIndex(col => n[0] === col.slug)
						if (cIndex > nIndex) {
							return 1;
						} else if (cIndex < nIndex) {
							return -1
						}

						return 0;
					})
				)

				return elem
			})

			data = [ header ].concat(data)

			var csv = arrayToCsv(data)
			downloadFile(csv, 'competitors.csv')
		}
	}
}
</script>

<style lang="scss" scoped>
.aioseo-writing-assistant-competitors {
	.top {
		display: flex;
		flex-direction: row;
	}

	.filters {
		display: flex;
		flex-direction: row;

		.filter-item {
			display: flex;
			flex-direction: row;
			align-items: center;

			.label {
				white-space: nowrap;
				padding-right: 10px;
			}
		}
	}

	.export {
		margin-left: auto;

		svg {
			width: 14px;
			height: 14px;
			margin-right: 5px;
		}
	}

	.competitor-title {
		font-weight: bold;
		font-size: 15px;
		line-height: 21px;
	}

	.competitor-url {
		font-size: 15px;
	}
}
</style>
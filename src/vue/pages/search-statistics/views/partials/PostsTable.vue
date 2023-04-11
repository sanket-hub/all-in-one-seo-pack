<template>
	<div class="aioseo-search-statistics-post-table">
		<core-wp-table
			ref="table"
			class="posts-table"
			:id="tableId"
			:columns="tableColumns"
			:rows="Object.values(posts.rows)"
			:totals="posts.totals"
			:filters="posts.filters"
			:selected-filters="selectedFilters"
			:loading="loading.seoStatistics"
			:initial-page-number="pageNumber"
			:initial-search-term="searchTerm"
			:initial-items-per-page="$aioseo.settings.tablePagination[changeItemsPerPageSlug]"
			:show-header="showHeader"
			:show-bulk-actions="false"
			:show-table-footer="showTableFooter"
			:show-items-per-page="showItemsPerPage"
			show-pagination
			:blur-rows="showUpsell"
			@filter-table="processFilter"
			@process-additional-filters="processAdditionalFilters"
			@additional-filter-option-selected="processAdditionaFilterOptionSelected"
			@paginate="processPagination"
			@process-change-items-per-page="processChangeItemsPerPage"
			@search="processSearch"
			@sort-column="processSort"
		>
			<template #row="{ index }">
				<div class="post-row">
					{{ index + 1 }}
				</div>
			</template>

			<template #post_title="{ row }">
				<div class="post-title">
					<a
						href="#"
						v-if="row.postId"
						@click="openPostDetail(row)"
					>
						{{ row.postTitle }}
					</a>

					<span
						v-else
						class="post-title"
					>
						{{ row.postTitle }}
					</span>
				</div>

				<post-actions :row="row" />

				<div
					class="row-actions"
					v-if="row.postId"
				>
					<span>
						<a
							class="view"
							:href="row.context.permalink"
							target="_blank"
						>
							<span>{{ viewPost(row.context.postType.singular) }}</span>
						</a> |
					</span>

					<span>
						<a
							class="edit"
							:href="row.context.editLink"
							target="_blank"
						>
							<span>{{ editPost(row.context.postType.singular) }}</span>
						</a>
					</span>
				</div>
			</template>

			<template #seo_score="{ row }">
				<core-score-button
					v-if="row.seoScore"
					class="table-score-button"
					:score="row.seoScore"
				/>
			</template>

			<template #clicks="{ row }">
				{{ $numbers.compactNumber(row.clicks) }}
			</template>

			<template #impressions="{ row }">
				{{ $numbers.compactNumber(row.impressions) }}
			</template>

			<template #position="{ row }">
				{{ Math.round(row.position).toFixed(0) }}
			</template>

			<template #diffPosition="{ row }">
				<statistic
					v-if="row.difference.comparison"
					type="position"
					:show-original="false"
					:difference="row.difference.position"
					tooltip-offset="-100px,0"
				/>
			</template>

			<template #diffDecay="{ row }">
				<statistic
					v-if="row.difference.comparison"
					type="decay"
					:show-original="false"
					:difference="row.difference.decay"
					tooltip-offset="-100px,0"
				/>
			</template>

			<template #cta>
				<cta
					v-if="showUpsell"
					:cta-link="$links.getPricingUrl('search-statistics', 'search-statistics-upsell')"
					:button-text="strings.ctaButtonText"
					:learn-more-link="$links.getUpsellUrl('search-statistics', 'search-statistics-upsell', 'home')"
				>
					<template #header-text>
						{{ strings.ctaHeader }}
					</template>
				</cta>
			</template>
		</core-wp-table>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { WpTable } from '@/vue/mixins'
import PostTypesMixin from '@/vue/mixins/PostTypes.js'
import Table from '../../mixins/Table.js'
import CoreScoreButton from '@/vue/components/common/core/ScoreButton'
import CoreWpTable from '@/vue/components/common/core/wp/Table'
import Cta from '@/vue/components/common/cta/Index.vue'
import PostActions from './AIOSEO_VERSION/PostActions.vue'
import Statistic from './Statistic.vue'
export default {
	components : {
		CoreScoreButton,
		CoreWpTable,
		Cta,
		PostActions,
		Statistic
	},
	mixins : [ PostTypesMixin, WpTable, Table ],
	data () {
		return {
			tableId                : 'aioseo-search-statistics-post-table',
			changeItemsPerPageSlug : 'searchStatisticsSeoStatistics',
			showUpsell             : false,
			strings                : {
				ctaButtonText : this.$t.__('Upgrade to Pro and Unlock Access Control', this.$td),
				ctaHeader     : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Access Control is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
			}
		}
	},
	props : {
		posts      : Object,
		showHeader : {
			type : Boolean,
			default () {
				return true
			}
		},
		showTableFooter  : Boolean,
		showItemsPerPage : Boolean,
		disableSorting   : Boolean,
		columns          : {
			type : Array,
			default () {
				return [ 'post_title', 'seo_score', 'clicks', 'impressions', 'position' ]
			}
		},
		appendColumns : {
			type : Object,
			default () {
				return {}
			}
		},
		initialFilter : {
			type : String,
			default () {
				return ''
			}
		}
	},
	computed : {
		...mapState('search-statistics', [ 'data', 'loading' ]),
		...mapGetters([ 'isUnlicensed' ]),
		allColumns () {
			const columns = this.columns

			// Get the active filter from this.posts.filters array.
			const activeFilter = this.posts?.filters?.find(f => f.active) || {}

			if (this.appendColumns[activeFilter.slug || 'all']) {
				columns.push(this.appendColumns[activeFilter.slug || 'all'])
			}

			return columns
		},
		tableColumns () {
			return [
				{
					slug  : 'row',
					label : '#',
					width : '40px'
				},
				{
					slug    : 'post_title',
					label   : this.$t.__('Title', this.$td),
					width   : '100%',
					sortDir : 'post_title' === this.orderBy ? this.orderDir : 'asc',
					sorted  : 'post_title' === this.orderBy
				},
				{
					slug    : 'seo_score',
					label   : this.$t.__('TruSEO Score', this.$td),
					width   : '130px',
					sortDir : 'seo_score' === this.orderBy ? this.orderDir : 'asc',
					sorted  : 'seo_score' === this.orderBy
				},
				{
					slug     : 'clicks',
					label    : this.$t.__('Clicks', this.$td),
					width    : '80px',
					sortable : this.isSortable,
					sortDir  : 'clicks' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'clicks' === this.orderBy
				},
				{
					slug     : 'impressions',
					label    : this.$t.__('Impressions', this.$td),
					width    : '110px',
					sortable : this.isSortable,
					sortDir  : 'impressions' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'impressions' === this.orderBy
				},
				{
					slug     : 'position',
					label    : this.$t.__('Position', this.$td),
					width    : '90px',
					sortable : this.isSortable,
					sortDir  : 'position' === this.orderBy ? this.orderDir : 'asc',
					sorted   : 'position' === this.orderBy
				},
				{
					slug  : 'diffDecay',
					label : this.$t.__('Diff', this.$tdPro),
					width : '95px'
				},
				{
					slug  : 'diffPosition',
					label : this.$t.__('Diff', this.$tdPro),
					width : '80px'
				}
			].filter(column => this.allColumns.includes(column.slug))
		},
		isSortable () {
			if (this.disableSorting) {
				return false
			}
			return 'all' === this.filter && (this.$isPro && !this.isUnlicensed)
		}
	},
	methods : {
		...mapActions('search-statistics', {
			fetchData : 'updateSeoStatistics'
		}),
		resetSelectedFilters () {
			this.selectedFilters['post-type'] = ''
			this.processAdditionaFilterOptionSelected({ name: 'post-type', selectedValue: '' })
		}
	},
	mounted () {
		if (this.initialFilter) {
			this.processFilter({
				slug : this.initialFilter
			})
		}
	}
}
</script>

<style lang="scss">
.aioseo-search-statistics-post-table {
	.posts-table {
		.subsubsub {
			position: absolute;
			top: 55px;
		}

		.manage-column {
			&.post_title {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.post-title {
					font-weight: 700;
					width: 100%;
					padding-bottom: 5px;
				}

				.row-actions {
					padding-top: 0;
				}
			}

			.table-score-button {
				display: flex;
				align-content: center;
				align-items: center;
				justify-content: center;
				width: 70px;
				height: 30px;
				padding: 5px;
			}

			&.diffPosition,
			&.diffDecay {
				.statistic {
					.aioseo-tooltip {
						justify-content: start;
					}

					.statistic-direction {
						margin-left: 0;
					}
				}
			}
		}

		thead {
			tr th.manage-column,
			tr td.manage-column  {
				font-size: 13px;
			}
		}
	}

	/* For CTA purpose */
	@at-root {
		.aioseo-blur {
			.wp-list-table {
				min-height: 520px;

				.no-results {
					min-height: 500px;
				}
			}
		}
	}

	.blurred {
		min-height: 360px;
	}
}
</style>
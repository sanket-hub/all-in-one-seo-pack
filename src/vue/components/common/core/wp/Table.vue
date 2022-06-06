<template>
	<div class="aioseo-wp-table">
		<div
			v-if="showHeader"
			class="header"
		>
			<ul class="subsubsub">
				<li
					v-for="(filter, index) in filters"
					:key="index"
					:class="filter.slug"
				>
					<span
						class="name"
						:class="{ active: filter.active }"
					>
						<a
							v-if="!filter.active"
							href="#"
							@click.prevent="processFilter(filter)"
						>
							{{ filter.name }}
							<span>({{ $numbers.numberFormat(filter.count) }})</span>
						</a>

						<template
							v-if="filter.active"
						>
							{{ filter.name }}
							<span>({{ $numbers.numberFormat(filter.count) }})</span>
						</template>

					</span>
					<span
						class="separator"
						v-if="index + 1 < filters.length"
					>|</span>
				</li>
			</ul>

			<p
				v-if="showSearch"
				class="search-box"
			>
				<input
					type="search"
					id="post-search-input"
					name="s"
					v-model="searchTerm"
					@keyup.enter="$emit('search', searchTerm)"
				/>
				<input
					type="submit"
					id="search-submit"
					class="button"
					:value="searchLabel"
					@click.prevent="$emit('search', searchTerm)"
				/>
			</p>

			<div class="tablenav top">
				<core-wp-bulk-actions
					v-if="showBulkActions && bulkOptions && bulkOptions.length"
					:bulk-options="bulkOptions"
					@process-bulk-action="processBulkAction"
				/>

				<core-wp-additional-filters
					v-if="additionalFilters && additionalFilters.length"
					:additional-filters="additionalFilters"
					@change="value => $emit('additional-filter-option-selected', value)"
					@process-additional-filters="processAdditionalFilters"
				/>

				<div class="tablenav-pages pagination"
					v-if="showPagination"
				>
					<span class="displaying-num">{{ $numbers.numberFormat(totals.total) }} {{ strings.items }}</span>
					<span class="pagination-links">
						<component
							:is="pageNumber === 1 ? 'span' : 'a'"
							:class="pageNumber === 1 ? 'tablenav-pages-navspan button disabled' : 'first-page button'"
							href="#"
							@click.prevent="pageNumber === 1 ? null : toPage(1)"
						>
							&laquo;
						</component>
						<component
							:is="pageNumber === 1 ? 'span' : 'a'"
							:class="pageNumber === 1 ? 'tablenav-pages-navspan button disabled' : 'prev-page button'"
							href="#"
							@click.prevent="pageNumber === 1 ? null : toPage(pageNumber - 1)"
						>&lsaquo;</component>
						<span class="paging-input">
							<input
								class="current-page"
								type="number"
								name="paged"
								v-model="pageNumber"
								size="2"
								:min="1"
								:max="totals.pages"
								:step="1"
								aria-describedby="table-paging"
								@keyup.enter="toPage(pageNumber)"
								:disabled="!totals.pages"
							/>
							<span class="tablenav-paging-text">
								{{ strings.of }} {{ totals.pages }}
							</span>
						</span>
						<component
							:is="pageNumber === totals.pages || !totals.pages ? 'span' : 'a'"
							:class="pageNumber === totals.pages || !totals.pages ? 'tablenav-pages-navspan button disabled' : 'next-page button'"
							href="#"
							@click.prevent="pageNumber === totals.pages || !totals.pages ? null : toPage(pageNumber + 1)"
						>
							&rsaquo;
						</component>
						<component
							:is="pageNumber === totals.pages || !totals.pages ? 'span' : 'a'"
							:class="pageNumber === totals.pages || !totals.pages ? 'tablenav-pages-navspan button disabled' : 'last-page button'"
							href="#"
							@click.prevent="pageNumber === totals.pages || !totals.pages ? null : toPage(totals.pages)"
						>
							&raquo;
						</component>
					</span>
				</div>
				<br class="clear" />
			</div>
		</div>

		<div class="wp-table">
			<table
				class="wp-list-table widefat fixed"
				ref="table"
				cellpadding=0
				cellspacing=0
			>
				<thead>
					<tr>
						<td
							class="manage-column column-cb check-column"
							v-if="showBulkActions"
						>
							<input
								type="checkbox"
								:disabled="loading"
							/>
						</td>
						<th
							scope="col"
							v-for="(column, index) in columns"
							:key="index"
							:style="{ width: column.width }"
							class="manage-column"
							:class="[{
								sortable : column.sortable,
								asc      : 'asc' === column.sortDir && column.sortable,
								desc     : 'desc' === column.sortDir && column.sortable,
								sorted   : column.sortable && column.sorted,
							}, column.slug]"
						>
							<template
								v-if="!column.tooltipIcon && column.sortable"
							>
								<a
									href="#"
									@click.prevent="event => $emit('sort-column', column, event)"
								>
									<span>{{ column.label }}</span>
									<span class="sorting-indicator" />
								</a>
							</template>

							<template
								v-if="!column.tooltipIcon && !column.sortable"
							>
								{{ column.label }}
							</template>

							<template
								v-if="column.tooltipIcon"
							>
								<div class="aioseo-table-header-tooltip-icon">
									<core-tooltip class="action" type="action">
										<component :is="column.tooltipIcon"></component>

										<template #tooltip>
											{{ column.label }}
										</template>
									</core-tooltip>
								</div>
							</template>
						</th>
					</tr>
				</thead>

				<tbody
					id="the-list"
					v-if="rows"
				>
					<div
						class="loader-overlay"
						v-if="loading"
					>
						<core-loader />
					</div>

					<template
						v-for="(row, index) in rows"
					>
						<tr
							:key="index + '_' + row.id"
							class="main-row"
							:class="{
								even    : 0 === index % 2,
								enabled : row.enabled ||!row.hasOwnProperty('enabled')
							}"
							:data-row-id="row.id || row.url || index"
						>
							<th
								scope="row"
								class="check-column"
								v-if="showBulkActions"
							>
								<input type="checkbox"/>
							</th>
							<td
								v-for="(column, i) in columns"
								:key="i"
							>
								<template
									v-if="$scopedSlots[column.slug]"
								>
									<slot
										:name="column.slug"
										:row="row"
										:column="row[column.slug]"
										:editRow="editRow"
										:index="index"
										:editRowActive="activeRow === index"
									/>
								</template>

								<span
									v-if="!$scopedSlots[column.slug]"
								>
									{{ row[column.slug] }}
								</span>
							</td>
						</tr>
						<tr
							:key="index + '_edit'"
							class="edit-row"
							:class="{ even: 0 === index % 2 }"
						>
							<td
								:colspan="showBulkActions ? columns.length + 1 : columns.length"
								class="edit-row-content"
							>
								<transition-slide
									tag="div"
									class="wrapper"
									:active="index === activeRow"
								>
									<div class="border">
										<slot
											name="edit-row"
											:row="row"
											:index="index"
											:editRow="editRow"
										/>
									</div>
								</transition-slide>
							</td>
						</tr>
					</template>

					<template
						v-if="!rows.length"
					>
						<td :colspan="columns.length + 1">
							<div class="no-results">
								<span v-if="!loading">{{ strings.noResults }}</span>
							</div>
						</td>
					</template>
				</tbody>

				<tfoot
					v-if="showTableFooter"
				>
					<tr>
						<td
							class="manage-column column-cb check-column"
							v-if="showBulkActions"
						>
							<input
								type="checkbox"
								:disabled="loading"
							/>
						</td>
						<th
							scope="col"
							v-for="(column, index) in columns"
							:key="index"
							:style="{ width: column.width }"
							class="manage-column"
						>
							{{ column.label }}
						</th>
					</tr>
				</tfoot>
			</table>
		</div>

		<div
			class="tablenav bottom"
			v-if="showTableFooter"
		>
			<core-wp-bulk-actions
				v-if="showBulkActions && bulkOptions && bulkOptions.length"
				:bulk-options="bulkOptions"
				@process-bulk-action="processBulkAction"
			/>
			<div class="alignleft actions"></div>
			<div class="tablenav-pages"
				v-if="showPagination"
			>
				<span class="displaying-num">{{ totals.total }} {{ strings.items }}</span>
			</div>
			<br class="clear" />
		</div>
	</div>
</template>

<script>
import CoreLoader from '@/vue/components/common/core/Loader'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import CoreWpAdditionalFilters from './AdditionalFilters'
import CoreWpBulkActions from './BulkActions'
import TransitionSlide from '@/vue/components/common/transition/Slide'
export default {
	components : {
		CoreLoader,
		CoreTooltip,
		CoreWpAdditionalFilters,
		CoreWpBulkActions,
		TransitionSlide
	},
	props : {
		columns : {
			type     : Array,
			required : true
		},
		rows : {
			type     : Array,
			required : true
		},
		filters : {
			type     : Array,
			required : false
		},
		totals : {
			type     : Object,
			required : false
		},
		loading    : Boolean,
		showSearch : {
			type : Boolean,
			default () {
				return true
			}
		},
		showBulkActions : {
			type : Boolean,
			default () {
				return true
			}
		},
		showPagination : {
			type : Boolean,
			default () {
				return true
			}
		},
		showTableFooter : {
			type : Boolean,
			default () {
				return true
			}
		},
		showHeader : {
			type : Boolean,
			default () {
				return true
			}
		},
		searchLabel : {
			type : String,
			default () {
				return this.$t.__('Search', this.$td)
			}
		},
		initialPageNumber : {
			type : Number,
			default () {
				return 1
			}
		},
		initialSearchTerm : {
			type : String,
			default () {
				return ''
			}
		},
		bulkOptions       : Array,
		additionalFilters : Array
	},
	data () {
		return {
			searchTerm : '',
			pageNumber : 1,
			activeRow  : null,
			strings    : {
				of        : this.$t.__('of', this.$td),
				items     : this.$t.__('items', this.$td),
				noResults : this.$t.__('No items found.', this.$td)
			}
		}
	},
	watch : {
		pageNumber (newVal) {
			if (Math.abs(newVal) !== newVal) {
				this.pageNumber = Math.floor(newVal)
				return
			}
			if (this.totals && newVal > this.totals.pages) {
				this.pageNumber = this.totals.pages
				return
			}

			if (1 > newVal) {
				this.pageNumber = 1
			}
		}
	},
	methods : {
		editRow (index) {
			if (null === index || this.activeRow === index) {
				this.activeRow = null
				return
			}

			this.activeRow = index
		},
		processBulkAction (bulkAction) {
			this.$emit('process-bulk-action', {
				action       : bulkAction,
				selectedRows : this.selectedItems()
			})

			this.resetSelectedItems()
		},
		processFilter (filter) {
			this.pageNumber = 1
			this.searchTerm = ''
			this.$emit('filter-table', filter)
		},
		processAdditionalFilters (filters) {
			this.pageNumber = 1
			this.searchTerm = ''
			this.$emit('process-additional-filters', {
				filters
			})
		},
		selectedItems () {
			const allRows      = this.$refs.table.querySelectorAll('tbody tr.main-row')
			const selectedRows = []
			allRows.forEach(row => {
				const checkboxValue = row.querySelector('th.check-column input').checked
				if (checkboxValue) {
					selectedRows.push(row.dataset.rowId)
				}
			})
			return selectedRows
		},
		resetSelectedItems () {
			const checked = this.$refs.table.querySelectorAll('.check-column input:checked')
			if (checked) {
				checked.forEach(c => (c.checked = false))
			}
		},
		toPage (page) {
			this.pageNumber = page
			this.$emit('paginate', page, this.searchTerm)
		},
		setPageNumber (newPageNumber) {
			this.pageNumber = newPageNumber
		}
	},
	mounted () {
		this.pageNumber = this.initialPageNumber
		this.searchTerm = this.initialSearchTerm
	}
}
</script>

<style lang="scss">
.aioseo-wp-table {
	select,
	input[type=search] {
		border-color: $input-border;
	}

	select {
		&:focus {
			border-color: $blue;
			color: $blue;
			box-shadow: 0 0 0 1px $blue;
		}

		&:hover {
			color: $blue;
		}
	}

	input.button {
		color: $blue;
		border-color: $blue;

		&:hover {
			border-color: $blue;
			color: $blue;
		}
	}

	.header {
		.subsubsub {
			color: $gray3;
			font-size: 13px;
			font-weight: 600;
			margin-left: 2px;

			> span {
				display: inline-flex;
			}

			.separator {
				margin: 0 5px;
			}

			.active {
				padding: 0.2em;
				-webkit-text-stroke-width: 0.2px;
				-webkit-text-stroke-color: $black;
				color: $black;
			}

			a {
				text-decoration: none;
				span {
					color: $gray3;
					&:hover {
						text-decoration: none;
					}
				}

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.search {
			display: flex;
			justify-content: flex-end;

			.aioseo-input {
				width: 100%;
				max-width: 215px;
				margin-right: 6px;
			}
		}

		.pagination {
			color: $gray3;

			input {
				margin-left: 6px;
			}

			.tablenav-pages-navspan.button {
				margin-left: 6px;
			}
		}
	}

	.tablenav-pages {
		.current-page {
			padding: 0 0 0 8px;
		}

		.pagination-links {
			a {
				margin-left: 6px;
			}
		}
	}

	.wp-table {
		width: 100%;
		position: relative;

		tbody {
			position: relative;
		}

		thead,
		tfoot {
			td.check-column {
				padding: 4px 0 0 3px
			}
		}

		.loader-overlay {
			position: absolute;
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, 0.3);
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.no-results {
			color: $placeholder-color;
			min-height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 24px;
		}

		tr {
			th {
				.aioseo-table-header-tooltip-icon {
					display: flex;
					justify-content: center;

					.aioseo-tooltip {
						margin: 0;
					}
				}
			}

			&.even {
				background-color: $box-background;
			}

			&.enabled {
				td {
					color: $black;

					strong {
						a {
							color: $black;
						}
					}
				}
			}

			&:not(.enabled):not(.edit-row) {
				td {
					color: $placeholder-color;

					a.edit-link {
						color: $placeholder-color;
					}
				}
			}

			&.edit-row {
				th {
					padding: 0 0 0 3px;
				}

				td {
					padding: 0 15px 0 15px;
				}
			}

			td {
				strong {
					a {
						font-weight: 400;

						&:hover {
							color: $blue;
						}
					}
				}

				&.check-column {
					padding: 11px 0 11px 3px
				}

				.row-actions {
					.edit {
						a {
							color: $blue;
						}

						.trash {
							a {
								color: $red;
							}
						}
					}
				}

				&.edit-row-content {
					.wrapper {
						.border {
							margin-top: 7px;
							padding: 19px 0 20px;
							border-top: 1px solid $border;
						}
					}
				}
			}
		}
	}
}

#aioseo-settings {
	.aioseo-wp-table {
		.tablenav-pages-navspan.button {
			vertical-align: middle;
		}
	}
}
</style>
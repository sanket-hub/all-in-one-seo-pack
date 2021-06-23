<template>
	<div class="aioseo-wp-table">
		<div class="header">
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
							@click.prevent="$emit('filter-table', filter)"
						>{{ filter.name }}</a>

						<template
							v-if="filter.active"
						>
							{{ filter.name }}
						</template>

						({{ filter.count }})
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
					v-model="search"
					@keyup.enter="searchForUrl"
				/>
				<input
					type="submit"
					id="search-submit"
					class="button"
					:value="searchLabel"
					@click.prevent="searchForUrl"
				/>
			</p>

			<div class="tablenav top">
				<base-wp-bulk-actions
					v-if="bulkOptions && bulkOptions.length"
					:bulk-options="bulkOptions"
					@process-bulk-action="processBulkAction"
				/>

				<base-wp-additional-filters
					v-if="additionalFilters && additionalFilters.length"
					:additional-filters="additionalFilters"
					@process-additional-filters="processAdditionalFilters"
				/>

				<div class="tablenav-pages pagination">
					<span class="displaying-num">{{ totals.total }} {{ strings.items }}</span>
					<span class="pagination-links">
						<component
							:is="totals.page === 1 ? 'span' : 'a'"
							:class="totals.page === 1 ? 'tablenav-pages-navspan button disabled' : 'first-page button'"
							href="#"
							@click.prevent="totals.page === 1 ? null : toPage(1)"
						>
							&laquo;
						</component>
						<component
							:is="totals.page === 1 ? 'span' : 'a'"
							:class="totals.page === 1 ? 'tablenav-pages-navspan button disabled' : 'prev-page button'"
							href="#"
							@click.prevent="totals.page === 1 ? null : toPage(totals.page - 1)"
						>&lsaquo;</component>
						<span class="paging-input">
							<input
								class="current-page"
								type="number"
								name="paged"
								v-model="pageNumber"
								size="2"
								min="1"
								step="1"
								:max="totals.pages"
								aria-describedby="table-paging"
								@keyup.enter="toPage(pageNumber)"
							/>
							<span class="tablenav-paging-text">
								{{ strings.of }} {{ totals.pages }}
							</span>
						</span>
						<component
							:is="totals.page === totals.pages ? 'span' : 'a'"
							:class="totals.page === totals.pages ? 'tablenav-pages-navspan button disabled' : 'next-page button'"
							href="#"
							@click.prevent="totals.page === totals.pages ? null : toPage(totals.page + 1)"
						>
							&rsaquo;
						</component>
						<component
							:is="totals.page === totals.pages ? 'span' : 'a'"
							:class="totals.page === totals.pages ? 'tablenav-pages-navspan button disabled' : 'last-page button'"
							href="#"
							@click.prevent="totals.page === totals.pages ? null : toPage(totals.pages)"
						>
							&raquo;
						</component>
					</span>
				</div>
				<br class="clear" />
			</div>
		</div>

		<div class="wp-table">
			<div
				class="loader-overlay"
				v-if="loading"
			>
				<core-loader />
			</div>
			<table
				class="wp-list-table widefat fixed"
				ref="table"
			>
				<thead>
					<tr>
						<td class="manage-column column-cb check-column">
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
							:class="{
								sortable : column.sortable,
								asc      : 'asc' === column.sortDir && column.sortable,
								desc     : 'desc' === column.sortDir && column.sortable,
								sorted   : column.sortable && column.sorted
							}"
						>
							<template
								v-if="column.sortable"
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
								v-if="!column.sortable"
							>
								{{ column.label }}
							</template>
						</th>
					</tr>
				</thead>

				<tbody
					id="the-list"
					v-if="rows"
				>
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
							:data-row-id="row.id"
						>
							<th scope="row" class="check-column">
								<input type="checkbox" />
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
							<th scope="row" class="check-column"></th>
							<td
								:colspan="columns.length"
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
								{{ strings.noResults }}
							</div>
						</td>
					</template>
				</tbody>

				<tfoot>
					<tr>
						<td class="manage-column column-cb check-column">
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

		<div class="tablenav bottom">
			<base-wp-bulk-actions
				v-if="bulkOptions.length"
				:bulk-options="bulkOptions"
				@process-bulk-action="processBulkAction"
			/>
			<div class="alignleft actions"></div>
			<div class="tablenav-pages">
				<span class="displaying-num">{{ totals.total }} {{ strings.items }}</span>
			</div>
			<br class="clear" />
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
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
			required : true
		},
		totals : {
			type     : Object,
			required : true
		},
		loading    : Boolean,
		showSearch : {
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
		bulkOptions       : Array,
		additionalFilters : Array
	},
	data () {
		return {
			search     : null,
			pageNumber : 1,
			activeRow  : null,
			strings    : {
				of        : this.$t.__('of', this.$td),
				items     : this.$t.__('items', this.$td),
				noResults : this.$t.__('No items found', this.$td)
			}
		}
	},
	watch : {
		search (newVal) {
			this.setSearchTerm(newVal)
		},
		pageNumber (newVal) {
			if (Math.abs(newVal) !== newVal) {
				this.pageNumber = Math.floor(newVal)
				return
			}
			if (newVal > this.totals.pages) {
				this.pageNumber = this.totals.pages
				return
			}

			if (1 > newVal) {
				this.pageNumber = 1
				return
			}

			this.setPaginatedPageNumber(newVal)
		}
	},
	computed : {
		...mapState('redirects', [ 'searchTerm', 'paginatedPage' ])
	},
	methods : {
		...mapMutations('redirects', [ 'setSearchTerm', 'setPaginatedPageNumber' ]),
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
		processAdditionalFilters (filters) {
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
			if (this.pageNumber !== page) {
				this.pageNumber = page
			}

			this.$emit('paginate', page, this.searchTerm)
		},
		searchForUrl () {
			if (!this.searchTerm) {
				return
			}

			this.$emit('search', this.searchTerm)
		}
	},
	mounted () {
		this.search     = this.searchTerm
		this.pageNumber = this.paginatedPage
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

			> span {
				display: inline-flex;
			}

			.separator {
				margin: 0 5px;
			}

			.active {
				font-weight: 700;
				color: $black;
			}

			a {
				text-decoration: none;

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

			.button {
				margin-left: 6px;
			}
		}
	}

	.tablenav-pages {
		.current-page {
			padding: 0 0 0 8px;
		}
	}

	.wp-table {
		width: 100%;
		position: relative;

		.loader-overlay {
			position: absolute;
			top: 46px;
			right: 0;
			bottom: 36px;
			left: 0;
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
					padding: 0 30px 0 10px;
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
							padding: 8px 0 8px;
							border-top: 1px solid $border;
						}
					}
				}
			}
		}
	}
}
</style>
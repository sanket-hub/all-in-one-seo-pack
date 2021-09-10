<template>
	<div class="aioseo-additional-pages">
		<div class="additional-pages-table">
			<div class="pages-header">
				<div class="page-url">{{ strings.pageUrl }}</div>
				<div class="page-priority">{{ strings.priority }}</div>
				<div class="page-frequency">{{ strings.frequency }}</div>
				<div class="page-last-modified">{{ strings.lastModified }}</div>
				<div class="page-actions" />
			</div>
			<div class="pages-rows">
				<div
					class="page-row"
					:class="{ even: 0 === index % 2 }"
					v-for="(page, index) in parsedPages"
					:key="index"
				>
					<div class="page-url">
						<base-input
							:value="page.url"
							@input="updatePage('url', $event, index)"
							size="medium"
							:placeholder="strings.placeholder"
						/>
					</div>
					<div class="page-priority">
						<base-select
							size="medium"
							:value="page.priority"
							@input="updatePage('priority', $event, index)"
							:options="$constants.PRIORITY_OPTIONS"
						/>
					</div>
					<div class="page-frequency">
						<base-select
							size="medium"
							:value="page.frequency"
							@input="updatePage('frequency', $event, index)"
							:options="$constants.FREQUENCY_OPTIONS"
						/>
					</div>
					<div class="page-last-modified">
						<base-datepicker
							size="medium"
							:value="page.lastModified"
							@input="updatePage('lastModified', $event, index)"
						/>
					</div>
					<div class="page-actions">
						<core-tooltip
							type="action"
						>
							<svg-trash
								@click.native="removeRow(index)"
							/>

							<template #tooltip>
								{{ strings.delete }}
							</template>
						</core-tooltip>
					</div>
				</div>
			</div>
		</div>

		<base-button
			type="blue"
			size="medium"
			@click="addRow"
		>
			<svg-circle-plus />
			{{ strings.addNew }}
		</base-button>
	</div>
</template>

<script>
import { __ } from '@wordpress/i18n'
const defaults = {
	url          : null,
	priority     : { label: '0.0', value: '0.0' },
	frequency    : { label: __('always', process.env.VUE_APP_TEXTDOMAIN), value: 'always' },
	lastModified : null
}
export default {
	props : {
		pages : {
			type     : Array,
			required : true
		}
	},
	data () {
		return {
			strings : {
				// Translators: 1 - An example URL (e.g. https://aioseo.com/example).
				placeholder  : this.$t.sprintf(this.$t.__('Enter a page URL, e.g. %1$s', this.$td), `${this.$aioseo.urls.home}/new-page`),
				pageUrl      : this.$t.__('Page URL', this.$td),
				priority     : this.$t.__('Priority', this.$td),
				frequency    : this.$t.__('Frequency', this.$td),
				lastModified : this.$t.__('Last Modified', this.$td),
				delete       : this.$t.__('Delete', this.$td),
				addNew       : this.$t.__('Add New', this.$td),
				always       : this.$t.__('always', this.$td)
			}
		}
	},
	computed : {
		parsedPages () {
			return this.pages.map(page => JSON.parse(page))
		}
	},
	methods : {
		removeRow (index) {
			this.$delete(this.pages, index)

			if (!this.pages.length) {
				this.addRow()
			}
		},
		addRow () {
			this.pages.push(JSON.stringify({ ...defaults }))
		},
		updatePage (type, value, pageIndex) {
			const page = JSON.parse(this.pages[pageIndex])
			page[type] = value
			this.$set(this.pages, pageIndex, JSON.stringify(page))
		}
	},
	mounted () {
		if (!this.pages.length) {
			this.addRow()
		}
	}
}
</script>

<style lang="scss">
.aioseo-additional-pages {
	.additional-pages-table {
		border: 1px solid $input-border;
		border-radius: 3px;
		margin-bottom: 20px;

		.page-priority {
			max-width: 110px;
		}

		.page-frequency {
			max-width: 166px;
		}

		.page-last-modified {
			max-width: 155px;
		}

		.page-actions {
			max-width: 20px;

			.aioseo-tooltip {
				display: inline-block;
				margin: 0;
			}
		}

		.pages-header {
			height: 50px;
			display: flex;
			font-size: 14px;
			padding: 0 30px;
			align-items: center;
			border-bottom: 1px solid $input-border;

			> div {
				flex: 1 0 auto;
			}
		}

		.pages-rows {
			font-size: 14px;

			.page-row {
				background-color: #fff;
				height: 70px;
				display: flex;
				align-items: center;
				padding: 0 30px;

				&:last-of-type {
					border-radius: 0 0 3px 3px;
				}

				&.even {
					background-color: $box-background;
				}

				> div {
					flex: 1 0 auto;
					padding-right: 30px;

					&:last-child {
						padding-right: 0;
					}
				}

				.page-actions {
					svg.aioseo-trash {
						width: 20px;
						height: 20px;
						color: $placeholder-color;
						cursor: pointer;
						transition: color 0.1s ease;

						&:hover {
							color: $red;
						}
					}
				}
			}
		}
	}

	svg.aioseo-circle-plus {
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
}
</style>
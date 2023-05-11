<template>
	<core-card
		class="aioseo-link-assistant-linking-opportunities"
		slug="linkAssistantLinkOpportunities"
		no-slide
		:header-text="strings.linkingOpportunities"
	>
		<div>
			<div class="linking-opportunities-table">
				<table-row
					class="header-row"
					v-if="linkingOpportunities.length"
				>
					<table-column
						v-for="(column, index) in columns"
						:key="index"
						:class="column.slug"
					>
						<div class="row">
							<div v-if="!column.tooltipIcon">
								{{ column.label }}
							</div>

							<div class="aioseo-tooltip-wrapper" v-if="column.tooltipIcon">
								<core-tooltip class="action">
									<component :is="column.tooltipIcon"></component>

									<template #tooltip>
										<span v-html="column.label" />
									</template>
								</core-tooltip>
							</div>
						</div>
					</table-column>
				</table-row>

				<table-row
					v-for="(row, index) in linkingOpportunities"
					:key="index"
					class="row"
					:class="{
						even : 0 === index % 2
					}"
				>
					<table-column class="post-title">
						<div class="row">
							<core-tooltip
								type="action"
							>
								<a
									:href="`#/links-report?postTitle=${row.postTitle}`"
								>
									{{ row.postTitle }}
								</a>

								<template #tooltip>
									<a
										class="tooltip-url"
										:href="row.permalink"
										target="_blank"
									>
										{{ row.postTitle }}
									</a>
								</template>
							</core-tooltip>
						</div>
					</table-column>

					<table-column class="internal-inbound">
						<span class="count">{{ row.suggestionsInbound }}</span>
					</table-column>

					<table-column class="internal-outbound">
						<span class="count">{{ row.suggestionsOutbound }}</span>
					</table-column>
				</table-row>

				<table-row
					v-if="!linkingOpportunities.length"
					class="row even"
				>

					<table-column class="post-title">
						{{ strings.noResults }}
					</table-column>
				</table-row>
			</div>

			<div class="links-report-link"
				v-if="linkingOpportunities.length"
			>
				<span v-html="link" />
			</div>
		</div>
	</core-card>
</template>

<script>
import CoreCard from '@/vue/components/common/core/Card'
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import SvgLinkInternalInbound from '@/vue/components/common/svg/link/InternalInbound'
import SvgLinkInternalOutbound from '@/vue/components/common/svg/link/InternalOutbound'
import TableColumn from '@/vue/components/common/table/Column'
import TableRow from '@/vue/components/common/table/Row'
export default {
	components : {
		CoreCard,
		CoreTooltip,
		SvgLinkInternalInbound,
		SvgLinkInternalOutbound,
		TableColumn,
		TableRow
	},
	props : {
		linkingOpportunities : {
			type     : Array,
			required : true
		}
	},
	data () {
		return {
			strings : {
				linkingOpportunities : this.$t.__('Linking Opportunities', this.$tdPro),
				noResults            : this.$t.__('No items found.', this.$td)
			},
			link : this.$t.sprintf(
				'<a class="links-report-link" href="%1$s">%2$s</a><a href="%1$s"> <span>&rarr;</span></a>',
				'#/links-report?linkingOpportunities=1',
				this.$t.__('See All Linking Opportunities', this.$tdPro)
			)
		}
	},
	computed : {
		columns () {
			return [
				{
					slug  : 'post-title',
					label : this.$t.__('Post Title', this.$td)
				},
				{
					slug  : 'internal-inbound',
					label : this.$t.sprintf(
						// Translators: 1 - Opening strong tag, 2 - Closing strong tag, BR tag.
						this.$t.__('%1$sInbound Internal Links%2$sLinks from other posts to this post', this.$tdPro),
						'<strong>',
						'</strong><br />'
					),
					tooltipIcon : 'svg-link-internal-inbound'
				},
				{
					slug  : 'internal-outbound',
					label : this.$t.sprintf(
						// Translators: 1 - Opening strong tag, 2 - Closing strong tag, BR tag.
						this.$t.__('%1$sOutbound Internal Links%2$sLinks from this post to other posts', this.$tdPro),
						'<strong>',
						'</strong><br />'
					),
					tooltipIcon : 'svg-link-internal-outbound'
				}
			]
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-link-assistant-overview .aioseo-link-assistant-linking-opportunities {
	.linking-opportunities-table {
		.row {
			display: flex;
			align-items: center;
		}

		.aioseo-table-row {
			&.even {
				background-color: $box-background;
			}

			.aioseo-table-column {
				padding: 12px;

				&.post-title {
					min-width: 0;

					div {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;

						span {
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						a {
							color: $black;
							text-decoration: none;

							&:hover {
								color: $blue;
							}
						}

						.aioseo-tooltip {
							margin-left: 0;
							.popper a {
								color: white;
								text-decoration: underline;
								&:hover {
									text-decoration: none;
								}
							}
						}
					}
				}

				&.internal-inbound,
				&.internal-outbound {
					min-width: 60px;
					flex: 0;
					text-align: center;

					.row {
						align-self: center;
					}
				}

				.aioseo-tooltip-wrapper {
					display: flex;
					.aioseo-tooltip {
						margin: 0;
					}
				}

				svg {
					&.aioseo-link-internal-outbound,
					&.aioseo-link-internal-inbound {
						height: 17px;
						width: 17px;
						color: $green;
					}
				}
			}

			&.header-row > .aioseo-table-column {
				padding-block: 0 14px;
			}
		}
	}

	.links-report-link {
		margin-top: var(--aioseo-gutter);
		color: $blue;
		cursor: pointer;
		font-weight: bold;
		font-size: 14px;
		a {
			text-decoration: underline;
			&:not(:first-of-type),
			&:hover {
				text-decoration: none;
			}
		}
	}
}
</style>
<template>
	<div>
		<core-wp-table
			:class="{'link-assistant-inner-table' : !postReport}"
			:columns="columns"
			:rows="rows"
			:totals="post.links.inboundInternal.totals"
			:bulk-options="bulkOptions"
			:showSearch="false"
			:showPagination="!linksReport"
			:showTableFooter="postReport"
			:loading="wpTableLoading"
			@process-bulk-action="maybeDoBulkAction"
			@paginate="processPagination"
		>
			<template #post_title="{ row }">
				<span>
					{{ row.context.postTitle }}
					<span v-if="row.context.permalink.replace(/\/$/, '') === $aioseo.urls.home">({{ strings.frontPage }})</span>
				</span>

				<div
					class="row-actions"
					v-if="row.context"
				>
					<span class="view">
						<a
							:href="row.context.permalink"
							target="_blank"
						>{{ maybeViewPost(row) }}</a> |
					</span>

					<span class="edit">
						<a
							:href="row.context.editLink"
							target="_blank"
						>{{ maybeEditPost(row) }}</a>
					</span>
				</div>
			</template>

			<template #phrase="{ row }">
				<link-assistant-phrase
					:phrase="row.phrase"
					:phraseHtml="row.phrase_html || ''"
					:anchor="row.anchor"
					:url="row.url"
					:clickableAnchor="true"
				/>
			</template>

			<template #delete="{ index }">
				<core-tooltip
					type="action"
				>
					<svg-trash
						@click.native="maybeDoBulkAction({
							action: 'delete',
							selectedRows: index
						})"
					/>
					<template #tooltip>
						{{ strings.deleteLink }}
					</template>
				</core-tooltip>
			</template>
		</core-wp-table>

		<div
			class="links-bottom"
			v-if="!postReport"
		>
			<div class="links-bottom-left">
				<base-button
					v-if="post.links.inboundInternal.rows.length"
					type="blue"
					tag="button"
					@click.native="$emit('openSuggestions')"
				>
					<svg-link-suggestion />
					{{ strings.outboundSuggestions }}
				</base-button>
				<div
					v-if="post.links.inboundInternal.totals.total > 5 && linksReport"
				>
					<svg-link-external />
					<a
						class="link-view"
						href="#"
						@click.prevent="openPostReport('inbound-internal')"
					>
						{{ seeAllLinks }}
					</a>
				</div>
			</div>

			<div class="links-bottom-right">
				<a
					v-if="post.links.inboundInternal.rows.length"
					class="link-delete"
					@click.prevent="maybeDoBulkAction({
						action: 'delete',
						selectedRows : 'all'
					})"
				>
					{{ strings.deleteAllLinks }}
				</a>
			</div>
		</div>

		<link-assistant-confirmation-modal
			:showModal="showModal"
			:selectedRows="selectedRows"
			:strings="modalStrings"
			@doBulkAction="doBulkAction"
			@closeModal="showModal = false"
		/>
	</div>
</template>

<script>
import CoreTooltip from '@/vue/components/common/core/Tooltip'
import CoreWpTable from '@/vue/components/common/core/wp/Table'
import LinksMixin from '@/vue/mixins/link-assistant/Links.js'
import PostTypesMixin from '@/vue/mixins/link-assistant/PostTypes.js'
import LinkAssistantConfirmationModal from '@/vue/components/common/link-assistant/ConfirmationModal'
import LinkAssistantPhrase from '@/vue/components/common/link-assistant/Phrase'
import SvgLinkExternal from '@/vue/components/common/svg/link/External'
import SvgLinkSuggestion from '@/vue/components/common/svg/link/Suggestion'
import SvgTrash from '@/vue/components/common/svg/Trash'
export default {
	components : {
		CoreTooltip,
		CoreWpTable,
		LinkAssistantConfirmationModal,
		LinkAssistantPhrase,
		SvgLinkExternal,
		SvgLinkSuggestion,
		SvgTrash
	},
	mixins : [ LinksMixin, PostTypesMixin ],
	data () {
		return {
			linkType : 'inboundInternal',
			strings  : {
				deleteAllLinks : this.$t.sprintf(
					// Translators: 1 - The type of link.
					this.$t.__('Delete All %1$s Links', this.$td), this.$t.__('Inbound Internal', this.$td)
				),
				outboundSuggestions : this.$t.sprintf(
					// Translators: 1 - The type of link.
					this.$t.__('%1$s Link Suggestions', this.$td), this.$t.__('Inbound', this.$td)
				)
			}
		}
	},
	computed : {
		columns () {
			return [
				{
					slug  : 'post_title',
					label : this.$t.__('Post Title', this.$td)
				},
				{
					slug  : 'phrase',
					label : this.$t.__('Phrase', this.$td)
				},
				{
					slug  : 'delete',
					width : '50px'
				}
			]
		},
		seeAllLinks () {
			return this.$t.sprintf(
				// Translators: 1 - The amount of links, 2 - The type of link.
				this.$t.__('See All %1$s %2$s Links', this.$td),
				this.post.links.inboundInternal.totals.total,
				this.$t.__('Inbound Internal', this.$td)
			)
		}
	},
	methods : {
		maybeViewPost (row) {
			this.viewPost(row.context?.postType?.singular || 'Post')
		},
		maybeEditPost (row) {
			this.editPost(row.context?.postType?.singular || 'Post')
		}
	}
}
</script>